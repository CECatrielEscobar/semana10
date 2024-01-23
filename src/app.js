import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import myModule from "./routes/product.routes.js";
import { Server } from "socket.io";

const app = express();
const serverHTTP = app.listen(8081, () => {
  console.log("en el puerto 8081");
});

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", myModule.routes);

const io = new Server(serverHTTP);

io.on("connection", async (socket) => {
  socket.on("dataEmit", async (data) => {
    try {
      const respAdd = await myModule.product.addProduct(data);
      console.log(respAdd);
      if (respAdd == "Producto agregado exitosamente") {
        const respGet = await myModule.product.getProducts();
        socket.emit("allProducts", respGet);
        return;
      }
      socket.emit("allProducts", respAdd);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("paginaCargada", async () => {
    const getProducts = await myModule.product.getProducts();
    console.log(getProducts);
    socket.emit("firstCarga", getProducts);
  });
});
