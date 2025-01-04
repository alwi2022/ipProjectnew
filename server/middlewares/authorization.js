const { Chart } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;

    // Validasi cart berdasarkan id dan userId
    const cart = await Chart.findOne({ where: { id, userId: req.user.id } });
    console.log(cart, 'Fetched Cart');

    // Ambil data product berdasarkan id
    const product = await Chart.findByPk(id);
    console.log(product, 'Fetched Product');

    if (!product) {
      throw { name: "NotFound", message: "Product not found" };
    }

    if (!cart) {
      throw { name: "Forbidden", message: "Unauthorized access to this cart" };
    }

    req.cart = cart; // Tambahkan cart ke request
    next(); // Lanjutkan ke middleware berikutnya
  } catch (error) {
    console.error("Authorization Error:", error);
    next(error); // Operasikan error ke error handler
  }
}

module.exports = authorization;
