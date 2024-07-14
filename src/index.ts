import express from "express";
import r from "./routes.js";
import { Liquid } from "liquidjs";
import { config } from "dotenv";

config();
const engine = new Liquid({
  cache: process.env.NODE_ENV === "production",
});
const app = express();
app.engine("liquid", engine.express());
app.set("views", "./views");
app.set("view engine", "liquid");
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") {
  const livereload = await import("livereload");
  const connectLiveReload = await import("connect-livereload");

  const liveReloadServer = livereload.createServer({ extraExts: ["liquid"] });
  liveReloadServer.watch("./src");
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload.default());
}

app.use(r);
app.listen(3000, () => {
  console.log("App running");
});
