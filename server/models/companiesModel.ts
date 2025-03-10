import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

// Define an interface for the User model's attributes
interface CompanyAttributes {
  companyId: string;
  companyName: string;
  active: boolean;
  created_ts: Date;
  updated_ts: Date | null;
}

// Define an interface for the User creation attributes (which may not require 'id')
interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'companyId'> {}

class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
  public companyId!: string;
  public companyName!: string;
  public active!: boolean;
  public created_ts!: Date;
  public updated_ts!: Date | null;
}

Company.init(
  {
    companyId: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
     },
    companyName: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true
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
    }
  },
  {
    sequelize,
    tableName: 'companies',
    timestamps: false, // Enable timestamps
    createdAt: 'created_ts', // Rename default Sequelize timestamps
    underscored: true, // Ensures created_at and updated_at instead of createdAt
    hooks: {
      beforeUpdate: (company) => {
        company.updated_ts = new Date();
      }
    }
  }
);

export default Company;
