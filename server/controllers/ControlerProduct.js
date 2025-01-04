const { Product } = require('../models'); 

class ProductController {
  static async GetAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async GetProductById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id); 
  
      
      if (!product) {
       return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      
      next(error);
    }
  }

  static async AddProduct(req, res, next) {
    const { title, description, category, price, discountPercentage, rating,stock, images,tags } = req.body;
    try {
      const newProduct = await Product.create({
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        images,
        tags
      });
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

 

  static async DeleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.destroy();
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
