const { Chart, User, Product } = require('../models');

class ChartControler {
  static async addChart(req, res,next ) {
    try {
      const { quantity } = req.body
      const { productId } = req.params

      const product = await Product.findByPk(productId)
      
      if (!product) throw { name: "NotFound"}
  
      const newChartitem = await Chart.create({
       userId: req.user.id,
        productId: productId,
        quantity,
      })

      res.status(201).json(newChartitem)
    } catch (error) {
      next(error)
    }
  }
  

  static async getChart(req, res,next ) {
    try {
      const keranjangItem = await Chart.findAll({
        include: [Product],
        where: { userId: req.user.id },
      })
      res.status(200).json(keranjangItem)
      
    } catch (error) {      
        next(error)
    }
  }

  static async ChartEdited(req, res,next ) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      

      if (quantity < 1) {
          return res.status(400).json({ message: "Quantity must be at least 1" });
      }

      const cart = await Chart.findByPk(id, { include: [Product] });
      if (!cart) {
          return res.status(404).json({ message: "Product item not found" });
      }

      // Hitung total price berdasarkan quantity baru
      const newTotalPrice = cart.Product.price * quantity;

      // Update quantity dan total price
      await cart.update({
          quantity,
          totalPrice: newTotalPrice,
      });

      res.json({ message: "Cart updated", cart });
  } catch (error) {
    next(error)
  }
  }
 

  static async deletedChart(req, res,next) {
    try {
      await req.cart.destroy()
      res.status(200).json({ message: "Cartt has been deleted" })
    } catch (error) {
      next(error)
    }
  }
  
}



module.exports = ChartControler;
