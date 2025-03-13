import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface UserRolesAttributes {
    roleId: string;
    roleName: string;
    notes: string
}

interface UserRolesCreationAttributes extends Optional<UserRolesAttributes, 'roleId'> {}

class UserRoles extends Model<UserRolesAttributes, UserRolesCreationAttributes> implements UserRolesAttributes {
    public roleId!: string;
    public roleName!: string;
    public notes!: string;
}

UserRoles.init(
    {
        roleId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        roleName: {
            type: DataTypes.STRING
        },
        notes: {
          type: DataTypes.STRING
        }
    },
    {
        sequelize,
        tableName: 'user_roles',
        timestamps: false,
        underscored: true
    }
);

export default UserRoles;