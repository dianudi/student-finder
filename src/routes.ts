import { Router } from "express";
import { index, show } from "./controllers/controller.js";

const r = Router();

r.route("/").get(index);
r.route("/student/:id").get(show);

export default r;
