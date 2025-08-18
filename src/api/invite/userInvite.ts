import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import UserInviter from '../../services/user/userInviter';

export default async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.userInvite,
    );

    let inviter = new UserInviter(req);

    await inviter.execute(req.body.data);

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
