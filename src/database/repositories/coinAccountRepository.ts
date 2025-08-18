import MongooseRepository from './mongooseRepository';
import AuditLogRepository from './auditLogRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import FileRepository from './fileRepository';
import Error404 from '../../errors/Error404';
import SettingsRepository from './settingsRepository';
import { isUserInTenant } from '../utils/userTenantUtils';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import CoinAccount from '../models/coinAccount';
 
export default class CoinAccountRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

   
    const [coinAccount] = await CoinAccount(options.database).create(
      [
        {
          ...data,
          user: data.user,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'coinAccount',
        entityId: coinAccount.id,
        action: AuditLogRepository.CREATE,
        values: coinAccount,
      },
      options,
    );

    return this.findById(coinAccount.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

 

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

   
    await CoinAccount(options.database).updateOne(
      { _id: id },
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        fullName: data.fullName || null,
        phoneNumber: data.phoneNumber || null,
        updatedBy: currentUser.id,
        avatars: data.avatars || [],
      },
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }
 

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenants: { $elemMatch: { tenant: currentTenant.id } },
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.fullName) {
        criteriaAnd.push({
          ['fullName']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.fullName,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.email) {
        criteriaAnd.push({
          ['email']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.email,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.role) {
        criteriaAnd.push({
          tenants: { $elemMatch: { roles: filter.role } },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          tenants: {
            $elemMatch: { status: filter.status },
          },
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
         CoinAccount(options.database)
          .find(criteria)
          .skip(skip)
          .limit(limitEscaped)
          .sort(sort)
          .populate('tenants.tenant'),
        options,
      );

    const count =
      await MongooseRepository.wrapWithSessionIfExists(
         CoinAccount(options.database).countDocuments(criteria),
        options,
      );

    rows = this._mapUserForTenantForRows(
      rows,
      currentTenant,
    );
    rows = await Promise.all(
      rows.map((row) =>
        this._fillRelationsAndFileDownloadUrls(
          row,
          options,
        ),
      ),
    );

    return { rows, count };
  }

  static async findInvitesAndCountAll(
  { filter, limit = 0, offset = 0, orderBy = '' },
  options: IRepositoryOptions,
) {
  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = options?.currentUser?._id;

  // Initial criteria for the CoinAccount owner
  

  // Step 1: Get the main CoinAccount
  const coinAccount = await MongooseRepository.wrapWithSessionIfExists(
    CoinAccount(options.database)
      .findOne({  user: currentUser})
      .select('refferals refralRewardCount isLimitExced')
      .populate({
        path: 'refferals.user',
        select: 'email fullName',
      }),
    options,
  );

  if (!coinAccount) {
    return { rows: [], count: 0 };
  }

  // Step 2: Apply filters on populated refferals array
  const { status, email } = filter || {};
  let filteredRefferals = coinAccount.refferals || [];

  filteredRefferals = filteredRefferals.filter((ref: any) => {
    if (status && ref.status !== status) return false;
    if (email && (!ref.user || !ref.user.email?.includes(email))) return false;
    return true;
  });

  const total = filteredRefferals.length;

  

  // Step 3: Paginate
const paginated =
  limit > 0
    ? filteredRefferals.slice(offset, offset + limit)
    : filteredRefferals.slice(offset);

  // Step 4: Format response
  const rows = paginated.map((ref: any) => ({
    id: ref._id,
    status: ref.status,
    user: ref.user
      ? {
          id: ref.user._id,
          email: ref.user.email,
          fullName: ref.user.fullName,
        }
      : null,
  }));
  return {
    rows,
    count: total,
    refralRewardCount: coinAccount.refralRewardCount,
    isLimitExced: coinAccount.isLimitExced,
  };
}


  static async findAllAutocomplete(
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenants: {
          $elemMatch: { tenant: currentTenant.id },
        },
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            fullName: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
          {
            email: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('fullName_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    let  coinAccounts = await  CoinAccount(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    coinAccounts = this._mapUserForTenantForRows(
      coinAccounts,
      currentTenant,
    );

    const buildText = (user) => {
      if (!user.fullName) {
        return user.email;
      }

      return `${user.fullName} <${user.email}>`;
    };

    return coinAccounts.map((user) => ({
      id: user.id,
      label: buildText(user),
    }));
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return ids;
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let coinAccounts = await CoinAccount(options.database)
      .find({
        _id: {
          $in: ids,
        },
        tenants: {
          $elemMatch: { tenant: currentTenant.id },
        },
      })
      .select(['_id']);

    return coinAccounts.map((user) => user._id);
  }

 

  static async findById(id, options: IRepositoryOptions) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
         CoinAccount(options.database)
          .findById(id)
          .populate('tenants.tenant'),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    if (!options || !options.bypassPermissionValidation) {
      if (!isUserInTenant(record, currentTenant.id)) {
        throw new Error404();
      }

      record = this._mapUserForTenant(
        record,
        currentTenant,
      );
    }

    record = await this._fillRelationsAndFileDownloadUrls(
      record,
      options,
    );

    return record;
  }
 
  static async count(filter, options: IRepositoryOptions) {

    return MongooseRepository.wrapWithSessionIfExists(
     CoinAccount(options.database).countDocuments(filter),
      options,
    );
  }

 

  /**
   * Maps the users data to show only the current tenant related info
   */
  static _mapUserForTenantForRows(rows, tenant) {
    if (!rows) {
      return rows;
    }

    return rows.map((record) =>
      this._mapUserForTenant(record, tenant),
    );
  }

  /**
   * Maps the user data to show only the current tenant related info
   */
  static _mapUserForTenant(user, tenant) {
    if (!user || !user.tenants) {
      return user;
    }

    const tenantUser = user.tenants.find(
      (tenantUser) =>
        tenantUser &&
        tenantUser.tenant &&
        String(tenantUser.tenant.id) === String(tenant.id),
    );

    delete user.tenants;

    const status = tenantUser ? tenantUser.status : null;
    const roles = tenantUser ? tenantUser.roles : [];

    // If the user is only invited,
    // tenant members can only see its email
    const otherData =
      status === 'active' ? user.toObject() : {};

    return {
      ...otherData,
      id: user.id,
      email: user.email,
      roles,
      status,
    };
  }

  static async _fillRelationsAndFileDownloadUrls(
    record,
    options: IRepositoryOptions,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    if (output.tenants && output.tenants.length) {
      await Promise.all(
        output.tenants.map(async (userTenant) => {
          userTenant.tenant.settings =
            await SettingsRepository.find({
              currentTenant: userTenant.tenant,
              ...options,
            });
        }),
      );
    }

    output.avatars = await FileRepository.fillDownloadUrl(
      output.avatars,
    );

    return output;
  }
 
  static cleanupForRelationships(userOrUsers) {
    if (!userOrUsers) {
      return userOrUsers;
    }

    if (Array.isArray(userOrUsers)) {
      return userOrUsers.map((user) =>
        lodash.pick(user, [
          '_id',
          'id',
          'firstName',
          'lastName',
          'email',
        ]),
      );
    }

    return lodash.pick(userOrUsers, [
      '_id',
      'id',
      'firstName',
      'lastName',
      'email',
    ]);
  }

  static async destroy(
    id,
    options: IRepositoryOptions,
  ) {
    const  coinAccount = await this.findById(id, options);
    if (!coinAccount) {
      throw new Error404(options.language, 'errors.notFound.message');
    }
     await MongooseRepository.destroyRelationToOne(id,CoinAccount(options.database),'coinaccount',options)
    await  CoinAccount(options.database).deleteOne({ _id: id }, options);
    return coinAccount;
    }

static async destroyInvite(id, options: IRepositoryOptions) {
  const result = await CoinAccount(options.database).updateOne(
    { user: options.currentUser?.id },
    {
      $pull: {
        refferals: { user: id }   
      }
    },
    options,
  );

  console.log('inner result', result);
  return result;
}


  
}

 