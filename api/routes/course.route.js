import express from "express";
import { addCourse, getCourse } from "../controller/course.controller.js";


const route = express.Router();

route.post("/addCourse",addCourse);
route.get("/:dep/:sem",getCourse);


export default route;