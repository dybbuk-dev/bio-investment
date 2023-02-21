import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import Kyc from '../../services/user/kyc';

export default async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.customerEdit,
    );

    await new Kyc(req).reject(req.body.id);

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
