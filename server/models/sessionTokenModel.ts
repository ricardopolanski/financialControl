import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

// Define an interface for the User model's attributes
interface SessionTokenAttributes {
  id: string;
  user_id: string;
  master_token: string;
  session_token: string;
  active: boolean;
  created_ts: Date;
  updated_ts: Date | null
}

// Define an interface for the User creation attributes (which may not require 'id')
interface SessionTokenCreationAttributes extends Optional<SessionTokenAttributes, 'id'> {}

class SessionToken extends Model<SessionTokenAttributes, SessionTokenCreationAttributes> implements SessionTokenAttributes {
  public id!: string;
  public user_id!: string;
  public master_token!: string;
  public session_token!: string;
  public active!: boolean;
  public created_ts!: Date;
  public updated_ts!: Date | null
}

SessionToken.init(
  {
    id: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      user_id: { 
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',  // This should reference the 'users' table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      master_token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      session_token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,  // Default to 'true' if not provided
      },
      created_ts: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Automatically set on create
      },
      updated_ts: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
  },
  {
    sequelize,
    tableName: 'session_tokens',
    timestamps: false, // Enable timestamps
    createdAt: 'created_ts',
    underscored: true, // Ensures created_at and updated_at instead of createdAt
    hooks: {
      beforeUpdate: (session_token) => {
        session_token.updated_ts = new Date();
      }
    }
  }
);

export default SessionToken;
