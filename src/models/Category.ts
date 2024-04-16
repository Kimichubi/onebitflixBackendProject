import { Model, Optional, DataTypes } from "sequelize"
import { sequelize } from "../database"

//Criação do MODEL com tipagem forte usando Typescript

export interface Category{
    id: number
    name:string
    position:number
}

export interface CategoryCreationAttributes extends Optional<Category , 'id'>{

}

export interface CategoryInstace extends Model<Category, CategoryCreationAttributes> , Category{}

export const Category = sequelize.define<CategoryInstace, Category>('Category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      position: {
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER
      }
})