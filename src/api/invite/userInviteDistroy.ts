import UserDestroyer from '../../services/user/userDestroyer';
import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import CoinAccountService from '../../services/coinAccount/user/coinAccountService';

export default async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.userInvitesDistroy,
    );

    console.log('req.param',req.body.params.ids)
    let ids =req.body?.params?.ids||[]
    let result =await CoinAccountService.destroyInvite(ids,req) 

    const payload =  result;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
