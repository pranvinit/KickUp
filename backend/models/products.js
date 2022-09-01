"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Review, {
        foreignKey: {
          name: "product",
          type: DataTypes.UUID,
        },
        sourceKey: "product_id",
        as: "reviews",
        onDelete: "CASCADE",
      });
    }
  }
  Product.init(
    {
      product_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 50],
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      offer: {
        type: DataTypes.STRING,
        validate: {
          len: [5, 50],
        },
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      design: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      color: {
        type: DataTypes.ENUM("blue", "green", "purple", "red", "yellow"),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("loafers", "sneakers"),
        allowNull: false,
      },
      seller_name: {
        type: DataTypes.STRING,
        defaultValue: "KICKSUP",
        validate: {
          len: [2, 50],
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );
  return Product;
};
