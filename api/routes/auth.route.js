import express from "express";
import { signin, signup } from "../controller/auth.controller.js";


const route = express.Router();

route.post("/sign-up",signup);
route.post("/signin",signin)

export default route;