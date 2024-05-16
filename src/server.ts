import express from "express";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";
import { router } from "./routes";
import cors from "cors";

const app = express();

app.use(cors());

//express app.use(caminho, rotas)
//localhost:3000/admin
app.use(express.static("public"));
app.use(express.json());

app.use(adminJs.options.rootPath, adminJsRouter);

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connection succefull");
  });
  console.log("Server started on port " + PORT);
});
