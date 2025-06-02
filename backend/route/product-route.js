const express = require("express");
const router = express.Router();

const product_controller = require("../app/controller/product-controller");

router.post("/create_p", product_controller.create);
router.get("/getall_p", product_controller.getAll);
router.get("/getsingle_p/:productId", product_controller.getsingle);

router.put("/update_p/:productId", product_controller.update);

router.delete("/del_p/:proId", product_controller.delete);


module.exports = router;


