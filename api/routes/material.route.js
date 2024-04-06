import express from "express";
import { addMaterial, deleteMaterial, getAllMaterials, getAllMaterialsbyUser, getMaterials } from "../controller/material.controller.js";

const route = express.Router()

// ADD MATERIAL TO THE DATABASE:
route.post("/addMaterial",addMaterial)

// RETRIVE MATERIAL FROM THE DATABASE
route.get("/getMaterials",getMaterials)

// GET ALL MATERIALS
route.get("/getAllMaterials",getAllMaterials)

// DELETE Material
route.delete("/deleteMaterial",deleteMaterial);

// GET BY USER
route.get("/getAllMaterialsbyUser",getAllMaterialsbyUser)

export default route;