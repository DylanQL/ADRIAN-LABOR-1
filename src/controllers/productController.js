const { Product } = require('../models');

// Obtener todos los productos
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    
    return res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    await product.update(req.body);
    
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    await product.destroy();
    
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
