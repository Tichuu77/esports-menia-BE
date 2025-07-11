import ApiResponseHandler from '../apiResponseHandler';
import AuthService from '../../services/auth/authService';

export default async (req, res, next) => {
  try {
    const payload = await AuthService.signup(
      req.body.email,
      req.body.password,
      req.body.invitationToken,
      req.body.tenantId,
      req.body.userType,
      req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
