const express = require("express");
const router = express.Router();
const UserController = require("../controllers/ControlerUser");
const CartControler = require("../controllers/ControlerCart");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const ProductController = require("../controllers/ControlerProduct");
const gemini = require("../Helpers/Gemini");
const PaymentControler = require("../controllers/PaymentControler");

router.post("/login", UserController.login);
router.post("/google-login", UserController.LoginGoogle);
router.post("/register", UserController.Register);

router.post("/chat", async (req, res, next) => {
  try {
    const { message } = req.body;
    const aiResponse = await gemini(message);

    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    next(error);
  }
});

router.use(authentication);
router.get("/carts", CartControler.getChart);
router.post("/carts/:productId", CartControler.addChart);
router.put("/carts/:id", authorization, CartControler.ChartEdited);
router.delete("/carts/:id", authorization, CartControler.deletedChart);

router.get("/payment/midtrans/initiate/:productId", PaymentControler.getPayment);
router.patch("/users/me/upgrade", UserController.upgradeAccount);

router.get("/products", ProductController.GetAllProducts);
router.get("/products/:id", ProductController.GetProductById);
router.post("/products", ProductController.AddProduct);
router.delete("/products/:id", authorization, ProductController.DeleteProduct);
// router.put("products/:id", ProductController.UpdateProduct)

module.exports = router;
