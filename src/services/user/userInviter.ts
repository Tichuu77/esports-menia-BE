import assert from 'assert';
import EmailSender from '../../services/emailSender';
import UserRepository from '../../database/repositories/userRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TenantUserRepository from '../../database/repositories/tenantUserRepository';
import { tenantSubdomain } from '../tenantSubdomain';
import { IServiceOptions } from '../IServiceOptions';
import Error400 from '../../errors/Error400';
import path from 'path';
import fs from 'fs';
import { i18n } from '../../i18n';
import CoinAccount from '../../database/models/coinAccount';

export default class UserInviter {
  options: IServiceOptions;
  session;
  data;
  emailsToInvite: Array<any> = [];
  emails: any = [];
  sendInvitationEmails = true;

  constructor(options) {
    this.options = options;
  }

  /**
   * Creates new user(s) via the User page.
   * Sends Invitation Emails if flagged.
   */
  async execute(data, sendInvitationEmails = true) {
    this.data = data;
    this.sendInvitationEmails = sendInvitationEmails;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await this._addAll();

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );
      throw error;
    }

    if (this._hasEmailsToInvite) {
      await this._sendAllInvitationEmails();
    }
  }

  get _roles() {
     return ['user']
  }

  get _emails() {
    if (
      this.data.emails &&
      !Array.isArray(this.data.emails)
    ) {
      this.emails = [this.data.emails];
    } else {
      const uniqueEmails = [...new Set(this.data.emails)];
      this.emails = uniqueEmails;
    }

    return this.emails.map((email) => email.trim());
  }

  /**
   * Creates or updates many users at once.
   */
  async _addAll() {
    return Promise.all(
      this.emails.map((email) => this._add(email)),
    );
  }

  /**
   * Creates or updates the user passed.
   * If the user already exists, it only adds the role to the user.
   */
  async _add(email,language = this.options.language) {
    let user =
      await UserRepository.findByEmailWithoutAvatar(email, {
        ...this.options,
        session: this.session,
      });

     if(user){
        throw new Error400(language,'user.errors.userAlreadyExists')
     } 

    if (!user) {
      user = await UserRepository.create(
        { email },
        {
          ...this.options,
          session: this.session,
        },
      );
    }

   const updatedUser= await CoinAccount(this.options.database).updateOne(
      {user:this.options?.currentUser ,
        refralRewardCount: { $lt: 10 }
      },
      {
        $push:{refferals:{user:user._id,status:'invite'}},
        $inc:{refralRewardCount:1}
      }
    )
  
    const isUserAlreadyInTenant = user.tenants.some(
      (userTenant) =>
        userTenant.tenant.id ===
        this.options.currentTenant.id,
    );

    const tenantUser =
      await TenantUserRepository.updateRoles(
        this.options.currentTenant.id,
        user.id,
        this._roles,
        {
          ...this.options,
          addRoles: true,
          session: this.session,
        },
      );

    if (!isUserAlreadyInTenant) {
      this.emailsToInvite.push({
        email,
        token: tenantUser.invitationToken,
      });
    }
  }

  get _hasEmailsToInvite() {
    return (
      this.emailsToInvite && this.emailsToInvite.length
    );
  }

  async _sendAllInvitationEmails( language = this.options.language) {
    if (!EmailSender.isConfigured) {
          throw new Error400(language, 'email.error');
        }

    return Promise.all(
      this.emailsToInvite.map((emailToInvite) => {
        let currentUser = this.options.currentUser.id
        const link = `${tenantSubdomain.frontendUrl(
          this.options.currentTenant,
        )}/auth/invitation?token=${emailToInvite.token}&reffreBy=${currentUser}`;

     

          const subject = 'Invitation to join Esports Menia';
       
           const templatePath = path.join(
             __dirname,
             '../../../email-templates/invitation.html',
           );
       
           let html = fs.readFileSync(templatePath, 'utf8');
       
           // replace a placeholder in your template with the link
           html = html.replace('{{RESET_LINK}}', link);
       
           return new EmailSender(subject, html).sendTo(emailToInvite.email);
      }),
    );
  }

  async _validate() {
    assert(
      this.options.currentUser,
      'currentUser is required',
    );

    assert(
      this.options.currentTenant.id,
      'tenantId is required',
    );

    assert(
      this.options.currentUser.id,
      'currentUser.id is required',
    );

    assert(
      this.options.currentUser.email,
      'currentUser.email is required',
    );

    assert(
      this._emails && this._emails.length,
      'emails is required',
    );

    assert(
      this._roles && this._roles.length,
      'roles is required',
    );
  }
}
