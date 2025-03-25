// userCompanyService.ts
import * as companyService from './companyServices';
import * as userService from './userService';
import sequelize from '../config/db';
import { userRoles } from '../constants';

export const registerUserWithCompany = async (data: any) => {
  const { companyId, ...userData } = data;
  const transaction = await sequelize.transaction();
  
  try {
    // First create the company
    const company = await companyService.registerCompanyService({ transaction });

    const userData = {
        ...data,
        roleId: data.roleId ? data.roleId : userRoles.ADMIN.ID
    };
    
    // Then create the user with the company ID
    const user = await userService.registerUserService({
      ...userData,
      companyId: company.companyId
    }, { transaction });
    
    await transaction.commit();
    
    return {
      user,
      company
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// registerController.js
// export const registerController = async (req, res, next) => {
//   try {
//     const result = await userCompanyService.registerUserWithCompany(req.body);
    
//     return response.sendSuccess(res, {
//       message: 'Registration successful',
//       data: result
//     });
//   } catch (error) {
//     next(error);
//   }
// };
