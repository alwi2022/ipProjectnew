'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Chart,{foreignKey:'productId'})
    }
  }
  Product.init({
    title:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Title is required`
        },
        notEmpty:{
          msg:`Title is required`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Description is required`
        },
        notEmpty:{
          msg:`Description is required`
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Category is required`
        },
        notEmpty:{
          msg:`Category is required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`price is required`
        },
        notEmpty:{
          msg:`price is required`
        }
      }
    },
    discountPercentage:  {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`discountPercentage is required`
        },
        notEmpty:{
          msg:`discountPercentage is required`
        }
      }
    },
    rating:  {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`rating is required`
        },
        notEmpty:{
          msg:`rating is required`
        }
      }
    },
    stock:  {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`stock is required`
        },
        notEmpty:{
          msg:`stock is required`
        }
      }
    },
    images:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Image is required`
        },
        notEmpty:{
          msg:`Image is required`
        }
      }
    },
    tags: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`tags is required`
        },
        notEmpty:{
          msg:`tags is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};