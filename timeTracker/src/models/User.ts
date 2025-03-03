import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js"; // Ensure you have a configured Sequelize instance

// Define User Model with TypeScript
export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

// Initialize Model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);
