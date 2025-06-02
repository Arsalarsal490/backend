const mongoose = require("mongoose");

mongoose.pluralize(null);

const deliverySchema = new mongoose.Schema({
  email: { type: String },
  country: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  address: { type: String },
  apartment: { type: String },
  city: { type: String },
  postalcode: { type: String },
  phonenumber: { type: String },
  shippingCity: { type: String },
  shippingMethod: { type: String },
  paymentMethod: { type: String },
  billingAddress: { type: String }
});

const deliveryModel = mongoose.model("Delivery", deliverySchema);
module.exports = deliveryModel;
