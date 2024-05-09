// src/models/Episode.ts

import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";

export interface Favorite {
  userId: number;
  courseId: number;
}

export interface FavoriteInstance extends Model<Favorite>, Favorite {
  Course?: CourseInstance;
  user?: UserInstance;
}

export const Favorite = sequelize.define<FavoriteInstance, Favorite>(
  "Favorite",
  {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    courseId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  }
);

//Criação de modelos com tipagem forte'
