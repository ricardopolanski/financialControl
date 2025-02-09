'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: { 
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true
     },
    username: { 
      type: sequelize.STRING, 
      allowNull: false, 
      unique: true 
    },
    password: {
      type: sequelize.STRING, 
      allowNull: false
    },
    active: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default to 'true' if not provided
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true, // Enable timestamps
    underscored: true // Ensures created_at and updated_at instead of createdAt
  });
  return User;
};
