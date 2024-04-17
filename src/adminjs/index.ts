import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database";
import { adminJsResources } from "./resources";

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    //Admin connect to database
    databases: [sequelize],
    //The path
    rootPath: "/admin" ,

    resources: adminJsResources, 
    
    //Interface modifier
    branding: {
        companyName: 'OneBitFlix',
        logo: '/logoOnebitflix.svg',
        theme: {
          colors: {
            primary100: '#ff0043',
              primary80: '#ff1a57',
              primary60: '#ff3369',
              primary40: '#ff4d7c',
                primary20: '#ff668f',
              grey100: '#151515',
              grey80: '#333333',
              grey60: '#4d4d4d',
              grey40: '#666666',
              grey20: '#dddddd',
              filterBg: '#333333',
              accent: '#151515',
              hoverBg: '#151515',
          }
        }
      }
    }
)
//The routers of AdminsJs we need in the express
export const adminJsRouter = AdminJSExpress.buildRouter(adminJs)