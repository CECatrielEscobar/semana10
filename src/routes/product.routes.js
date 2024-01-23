import ProductManager from "../controllers/productManager.js";
const product = new ProductManager("/models/");

import express from "express";

const routes = express.Router();

routes.get("/home", async (req, res) => {
  try {
    const productos = await product.getProducts();
    res.render("home", {
      bodyInfo: productos,
      validar: Array.isArray(productos),
    });
  } catch (error) {
    console.log(error);
  }
});

routes.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default { routes, product };
