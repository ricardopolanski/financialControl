import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

// Define an interface for the CreditCardTransaction model's attributes
interface CreditCardTransactionsAttributes {
  id: string,
  date: Date,
  description: string,
  amount: number,
  credit_card: string,
  status: string, 
  dueDay: Date,
  installment_number: number,
  notes: string,
  created_ts: Date,
  updated_ts: Date
  
}

// Define an interface for the User creation attributes (which may not require 'id')
interface CreditCardTransactionsCreationAttributes extends Optional<CreditCardTransactionsAttributes, 'id'> {}

class CreditCardTransactions extends Model<CreditCardTransactionsAttributes, CreditCardTransactionsCreationAttributes> implements CreditCardTransactionsAttributes {
  public id!: string;
  public date!: Date;
  public description!: string;
  public amount!: number;
  public credit_card!: string;
  public status!: string; 
  public dueDay!: Date;
  public installment_number!: number;
  public notes!: string;
  public created_ts!: Date;
  public updated_ts!: Date
}

CreditCardTransactions.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING        
    },
    amount: {
      type: DataTypes.FLOAT,  // Adjusted type for float
      allowNull: false
    },
    credit_card: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'overdue'),
      defaultValue: 'pending'
    },
    dueDay: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    installment_number: {
      type: DataTypes.INTEGER
    },
    notes: {
      type: DataTypes.STRING
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_ts: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    }
  },
  {
    sequelize,
    tableName: 'credit_card_transactions',
    timestamps: false, // Enable timestamps
    createdAt: 'created_ts', // Rename default Sequelize timestamps
    underscored: true, // Ensures created_at and updated_at instead of createdAt
  }
);

export default CreditCardTransactions;
