const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      validate: {
        validator: (value) => value.length > 3,
        message: (value) =>
          `${value} is not a valid title ,it  must be longer then 3 words`,
      },
    },
    price: { type: Number, required: true, min: [1, "min price is 1 dt"] },
    description: { type: String, required: [true, "description is required"] },
    image: { type: String, required: true, default: "/images.jpg" },
    rate: {
      ratingCount: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
    },
    totalQuantity: { type: Number, default: 0 },
    category: {
      type: String,
      enum: {
        values: ["keybord", "headphone", "mouse", "monitor", "webcam"],
        message:
          'category must be in "keybord","headphone","mouse","monitor","webcam" ',
      },
    },
    saleCount: { type: Number },
  },
  { versionKey: false }
);

const ProductModel = new model("product", productSchema);

module.exports = ProductModel;
