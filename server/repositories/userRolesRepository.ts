import UserRoles from '../models/userRolesModel';

export const findRoleById = async (roleId: string) => {
    return await UserRoles.findOne({ where: { roleId } });
};