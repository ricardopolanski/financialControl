import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

// Define an interface for the User model's attributes
interface UserAttributes {
  id: string;
  username: string;
  password: string;
  active: boolean;
  // created_at: Date;
  // updated_at: Date
}

// Define an interface for the User creation attributes (which may not require 'id')
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public password!: string;
  public active!: boolean;
  // public created_at!: Date;
  // public updated_at!: Date;
}

User.init(
  {
    id: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // Enable timestamps
    underscored: true // Ensures created_at and updated_at instead of createdAt
  }
);

export default User;
