const ProductModel = require('../models/productModel');
const utils = require('./../utils');

// @desc gets all products
//  @route GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'success',
        result: products.length,
        data: { products },
      })
    );
  } catch (err) {
    console.log(err.message);
  }
};

// @desc gets one product
//  @route GET /api/products/id
exports.getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'fail',
          data: { message: 'Product not Found.' },
        })
      );
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'success', data: { product } }));
    }
  } catch (err) {
    console.log(err.message);
  }
};

// @desc create one product
//  @route POST /api/products
exports.createProduct = async (req, res) => {
  try {
    req.body = await utils.bodyParser(req);

    const product = await ProductModel.create(JSON.parse(req.body));

    if (!product) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'fail',
          data: { message: 'Product not Found.' },
        })
      );
    } else {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'success', data: { product } }));
    }
  } catch (err) {
    console.log(err.message);
  }
};

// @desc delete all products
//  @route DELETE /api/products
exports.deleteAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.deleteAll();

    if (products.length === 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'success',
          result: products.length,
          data: { products },
        })
      );
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end({ status: 'fail', data: { message: 'Bad request' } });
    }
  } catch (err) {
    console.log(err.message);
  }
};

// @desc delete one product
//  @route DELETE /api/products/id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.deleteById(req.params.id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'fail',
          data: { message: 'Product not Found.' },
        })
      );
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'success', data: { product } }));
    }
  } catch (err) {
    console.log(err.message);
  }
};

// @desc update one product
//  @route UPDATE /api/products/id
exports.updateProduct = async (req, res) => {
  try {
    req.body = await utils.bodyParser(req);

    const product = await ProductModel.updateById(
      req.params.id,
      JSON.parse(req.body)
    );

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'fail',
          data: { message: 'Product not Found.' },
        })
      );
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'success', data: { product } }));
    }
  } catch (err) {
    console.log(err.message);
  }
};
