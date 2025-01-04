'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chart.belongsTo(models.Product,{foreignKey:'productId'})
      Chart.belongsTo(models.User,{foreignKey:'userId'})
    }
  }
  Chart.init({
    userId: {
     type: DataTypes.INTEGER,
     references:{
      model:'Users',
      key:'id'
     },
     allowNull:false,
     validate:{
      notNull:{
        msg:`userId is required`
      },
      notEmpty:{
        msg:`userId is required`
      }
     }
    },
    productId: {
      type: DataTypes.INTEGER,
      references:{
       model:'Products',
       key:'id'
      },
      allowNull:false,
      validate:{
        notNull:{
          msg:`productId is required`
        },
        notEmpty:{
          msg:`productId is required`
        }
      }
     },
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chart',
  });
  return Chart;
};