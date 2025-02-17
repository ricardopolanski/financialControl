import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

// Define an interface for the User model's attributes
interface CurrenciesAttributes {
  id: number;
  currency: string;
  currencyCode: string;
  // created_ts: Date
}

// Define an interface for the User creation attributes (which may not require 'id')
interface CurrencyCreationAttributes extends Optional<CurrenciesAttributes, 'id'> {}

class Currencies extends Model<CurrenciesAttributes, CurrencyCreationAttributes> implements CurrenciesAttributes {
  public id!: number;
  public currency!: string;
  public currencyCode!: string;
  // public created_ts!: Date;
}

Currencies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currencyCode: {
      type: DataTypes.STRING(3)
    },
    // created_ts: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW
    // },
  },
  {
    sequelize,
    tableName: 'currencies',
    timestamps: false, // Enable timestamps
    createdAt: 'created_ts', // Rename default Sequelize timestamps
    underscored: true, // Ensures created_at and updated_at instead of createdAt
  }
);

export default Currencies;
