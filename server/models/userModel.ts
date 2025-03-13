import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

// Define an interface for the User model's attributes
interface UserAttributes {
  id: string;
  roleId: string;
  companyId: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  active: boolean;
  created_ts: Date;
  updated_ts: Date | null;
  last_login: Date;
  last_frustated_login: Date
  frustated_login_count: number;
  securityQuestion: string;
  securityAnsware: string
}

// Define an interface for the User creation attributes (which may not require 'id')
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public roleId!: string;
  public companyId!: string;
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public active!: boolean;
  public created_ts!: Date;
  public updated_ts!: Date | null;
  public last_login!: Date;
  public last_frustated_login!: Date
  public frustated_login_count!: number
  public securityQuestion!: string;
  public securityAnsware!: string;

}

User.init(
  {
    id: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    roleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'user_roles',
        key: 'role_id'
      }
    },
    companyId: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
     },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
    username: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default to 'true' if not provided
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,  // Automatically set on create
    },
    updated_ts: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,  // Automatically set on update
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    last_frustated_login: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    frustated_login_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    securityQuestion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    securityAnsware: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false, // Enable timestamps
    createdAt: 'created_ts', // Rename default Sequelize timestamps
    underscored: true, // Ensures created_at and updated_at instead of createdAt
    hooks: {
      beforeUpdate: (user) => {
        user.updated_ts = new Date();
      }
    }
  }
);

export default User;
