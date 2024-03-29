import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // "required" debe ser un booleano
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("products", ProductsSchema); // "products" en lugar de "prodcuts"

export default ProductModel;
