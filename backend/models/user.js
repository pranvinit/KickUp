"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Review, {
        foreignKey: {
          name: "user",
          type: DataTypes.UUID,
        },
        sourceKey: "user_id",
        as: "reviews",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 50],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 255],
        },
      },
      cart_items: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
      role: {
        type: DataTypes.ENUM("user", "seller", "admin"),
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  });

  User.prototype.comparePassword = async (reqPassword, password) => {
    const isMatch = await bcrypt.compare(reqPassword, password);
    return isMatch;
  };

  return User;
};
