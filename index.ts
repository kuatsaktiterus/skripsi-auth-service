import express from "express";
import { env } from "process";
import helmet from "helmet";
import routes from "./src/routes/apiroute";

const PORT = env.PORT || 3000;
const APP = express();

APP.use(helmet());
APP.use(express.json());
APP.use("/api", routes);

APP.get("/", (req, res) => {
  res.send("Hello World");
});

APP.listen(PORT, () => {
  console.log(`Server Running And Listening ${PORT}`);
});
