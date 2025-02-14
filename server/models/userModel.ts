import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

// Define an interface for the User model's attributes
interface UserAttributes {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  active: boolean;
  created_ts: Date;
  updated_ts: Date | null;
  last_login: Date;
  last_frustated_login: Date
  frustated_login_count: number;
  security_question: string;
  security_answare: string
}

// Define an interface for the User creation attributes (which may not require 'id')
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public first_name!: string;
  public last_name!: string;
  public password!: string;
  public active!: boolean;
  public created_ts!: Date;
  public updated_ts!: Date | null;
  public last_login!: Date;
  public last_frustated_login!: Date
  public frustated_login_count!: number
  public security_question!: string;
  public security_answare!: string;

}

User.init(
  {
    id: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
     },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
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
      defaultValue: DataTypes.NOW
    },
    last_frustated_login: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    frustated_login_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    security_question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    security_answare: {
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
