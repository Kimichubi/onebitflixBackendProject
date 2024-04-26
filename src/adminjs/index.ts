import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  //Admin connect to database
  databases: [sequelize],
  //The path
  rootPath: "/admin",

  resources: adminJsResources,

  //Interface modifier
  branding: brandingOptions,
  locale: locale,
  dashboard: dashboardOptions,
});
//The routers of AdminsJs we need in the express
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  {
    resave: false,
    saveUninitialized: false,
  }
);
