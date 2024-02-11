import express from "express";
const routes = express.Router();
import CartDAO from "../dao/cartManagerMDB.js";
import ProductDAO from "../dao/productManagerMDB.js";

const cart = new CartDAO();
const prod = new ProductDAO();

//RENDERIZA UNA PAGINA CON UN BOTON PARA CREAR UN CARRITO
routes.get("/home", async (req, res) => {
  res.render("cartHome");
});

// CON EL ENDPOINT DE ARRIBA PODES CREAR EL CARRITO PRESIONANDO EL BOTON!
routes.post("/", async (req, res) => {
  try {
    const respuesta = await cart.addCart();
    console.log(typeof respuesta);
    res.send(respuesta);
  } catch (error) {
    console.log("cart add error api", error);
  }
});

// MUESTRA UN CARRITO POR ID Y SI NO ES INGRESADO MUESTRA TODOS
routes.get("/getcart/:cid?", async (req, res) => {
  const id = req.params.cid;
  try {
    if (!id || id.length < 24) {
      //devuelve TODOS LOS CARRITOS
      const response = await cart.getCarts();
      if (response.length === 0) {
        return res.send({
          message: "No hay carritos registrados",
        });
      }
      return res.send({
        message: "Lista de carritos",
        payload: response,
      });
    }
    //devuelve el carrito con id
    const response = await cart.getCartById(id);
    if (response === null) {
      return res.send({
        message: "Carrito no encontrado!",
      });
    }

    res.send({
      message: "Carrito encontrado",
      payload: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error al procesar la solicitud",
      error: error.message,
    });
  }
});

//ENDPOINT PARA AGREGAR PRODUCTOS A LOS CARRITOS
routes.post("/:cid?/products/:pid?", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  //   console.log(cid, pid);
  try {
    if (!cid || !pid || cid.length < 24 || pid.length < 24) {
      console.log("Falto agregar cID y pID");
      res.status(404).send({
        message:
          "Porfavor Ingresar ambos id para guardar los productos en el carrito",
      });
      return;
    }
    // Buscar carrito  y Producto (hacer sus chequeos correspondientes)
    const carrito = await cart.getCartById(cid);
    if (!carrito) {
      return res.status(404).send({
        message: "Carrito no encontrado, ingrese un Id valido",
      });
    }
    const producto = await prod.getProductsById(pid);
    if (!producto) {
      return res.status(404).send({
        message: "Producto no encontrado, ingrese un Id valido",
      });
    }
    console.log(carrito);
    if (carrito.products.length === 0) {
      carrito.products.push({ product: pid, quantity: 1 });

      const result = await cart.updateCart(cid, carrito);

      console.log({
        seccion: "Cuando no hay productos registrados",
        message: "Carrito actualizado correctamente",
        payload: result,
      });
      res.send({
        seccion: "Cuando no hay productos registrados",
        message: "Carrito actualizado correctamente",
        payload: result,
      });
    } else {
      const indice = carrito.products.findIndex((prod) => {
        const id = prod.product.toString();
        return id === pid;
      });

      if (indice === -1) {
        console.log("estoy chequeando el if del newobj");

        carrito.products.push({ product: pid, quantity: 1 });

        console.log("estoy agregando un objeto mas");

        const result = await cart.updateCart(cid, carrito);
        console.log({
          seccion: "Cuando ya hay productos agregados",
          message: "Carrito actualizado correctamente",
          payload: result,
        });
        res.send({
          seccion: "Cuando ya hay productos agregados",
          message: "Carrito actualizado correctamente",
          payload: result,
        });
      } else {
        console.log("estoy en el ultimo else");

        carrito.products[indice].quantity += 1;
        // console.log("mostrando carrito con quantity actualizada", carrito);
        const result = await cart.updateCart(cid, carrito);
        console.log({
          seccion: "Aumentando la cantidad del carrito",
          message: "Carrito actualizado correctamente",
          payload: result,
        });
        res.send({
          seccion: "Aumentando la cantidad del carrito",
          message: "Carrito actualizado correctamente",
          payload: result,
        });
      }
    }
  } catch (error) {
    console.log("Hubgo un error al agregar producto al carrito");
  }
});

export default routes;
