 
import CoinAccount from '../../../database/models/coinAccount';
import CoinAccountRepository from '../../../database/repositories/coinAccountRepository';
import MongooseRepository from '../../../database/repositories/mongooseRepository';
import Error400 from '../../../errors/Error400';
import Error404 from '../../../errors/Error404';

class CoinAccountService {
  static async destroyInvite(
    ids,
    options: any = {},
  ) {
    const session = await MongooseRepository.createSession(
      options.database,
    );
    
    try {
      // Handle both single ID and array of IDs
      const idsArray = Array.isArray(ids) ? ids : [ids];
      
      // Process all invites for destruction
      const results = await Promise.all(
        await this.doDestroyInvites(idsArray, { ...options, session })
      );

      console.log('results',results)
      
      await MongooseRepository.commitTransaction(session);
      
      return  results
      
    } catch (error) {
    console.log(error)
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async doDestroyInvites(
    ids,
    options
  ) {
    // Validate that current user exists
    try{
    if (!options.currentUser?.id) {
        console.log('error',options.currentUser?.id)
      throw new Error400(options.language, 'entities.coinAccount.errors.userRequired');
    }

    // Get the coin account for the current user
    const coinAccount = await CoinAccount(options.database).findOne(
      {
        user:options.currentUser?.id
      }
    );
    
    if (!coinAccount) {
      console.log('run coinAccount')
      throw new Error404(options.language, 'entities.coinAccount.errors.notFound');
    }

    // Create array of promises for processing each invite
    const destroyPromises = ids.map(async (id) => {
      try {
        // Find the user in referrals
        if(!id){
           throw new Error400(
            options.language, 
            'entities.coinAccount.errors.userForRemoveNotFound'
          );
        }
        const user = coinAccount.refferals?.find(
          (referral) => referral.user?.toString() === id.toString()
        );
        
        if (!user) {
          throw new Error404(
            options.language, 
            'entities.coinAccount.errors.userForRemoveNotFound'
          );
        }

        // Check if invite is already accepted
        if (user.status === 'accept') {
            console.log('user.status',user.status)
          throw new Error400(
            options.language, 
            'entities.coinAccount.errors.userInviteAccepted'
          );
        }

        // Destroy the invite
        const result = await CoinAccountRepository.destroyInvite(id, options);
        console.log('result',result)
        return  result
      } catch (error:any) {
       throw error;
      }
    });
    return destroyPromises;
  }
  catch(error){
    throw error
  }
  }

  static async findInvitesAndCountAll(query, options) {
    try {
      return await CoinAccountRepository.findInvitesAndCountAll(query, options);
    } catch (error) {
      throw error;
    }
  }

  // Additional helper method for single invite destruction
  static async destroySingleInvite(id, options: any = {}) {
    const session = await MongooseRepository.createSession(
      options.database,
    );
    
    try {
      // Validate that current user exists
      if (!options.currentUser?.id) {
        throw new Error400(options.language, 'entities.coinAccount.errors.userRequired');
      }

      const coinAccount = await CoinAccountRepository.findById(
        options.currentUser.id, 
        { ...options, session }
      );
      
      if (!coinAccount) {
        throw new Error404(options.language, 'entities.coinAccount.errors.notFound');
      }

      // Find the user in referrals (fixed typo: referrals not refferals)
      const user = coinAccount.referrals?.find(
        (referral) => referral.user?.toString() === id.toString()
      );
      
      if (!user) {
        throw new Error404(
          options.language, 
          'entities.coinAccount.errors.userForRemoveNotFound'
        );
      }
      
      if (user.status === 'accept') {
        throw new Error400(
          options.language, 
          'entities.coinAccount.errors.userInviteAccepted'
        );
      }
      
      const result = await CoinAccountRepository.destroyInvite(
        id, 
        { ...options, session }
      );
      
      await MongooseRepository.commitTransaction(session);
      
      return result;
      
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  // Method to get invite details before destroying
  static async getInviteDetails(id, options: any = {}) {
    try {
      if (!options.currentUser?.id) {
        throw new Error400(options.language, 'entities.coinAccount.errors.userRequired');
      }

      const coinAccount = await CoinAccountRepository.findById(
        options.currentUser.id, 
        options
      );
      
      if (!coinAccount) {
        throw new Error404(options.language, 'entities.coinAccount.errors.notFound');
      }

      const user = coinAccount.referrals?.find(
        (referral) => referral.user?.toString() === id.toString()
      );
      
      if (!user) {
        throw new Error404(
          options.language, 
          'entities.coinAccount.errors.userForRemoveNotFound'
        );
      }

      return {
        id: id,
        status: user.status,
        user: user.user,
        canDestroy: user.status !== 'accept'
      };
      
    } catch (error) {
      throw error;
    }
  }
}

export default CoinAccountService;