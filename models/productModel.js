const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const utils = require('./../utils');
const products = require('../data/products.json');

// GET ALL PRODUCTS
exports.findAll = () => new Promise((resolve, reject) => resolve(products));

// GET ONE PRODUCT
exports.findById = (id) =>
  new Promise((resolve, reject) =>
    resolve(products.find((products) => products.id === id))
  );

// CREATE PRODUCT
exports.create = (product) =>
  new Promise(async (resolve, reject) => {
    try {
      const newProduct = { ...product, id: uuidv4() };
      products.push(newProduct);

      await utils.writeFile('./data/products.json', products);

      resolve(newProduct);
    } catch (err) {
      reject(err.message);
    }
  });

// DELTE ALL PRODUCTS
exports.deleteAll = () =>
  new Promise(async (resolve, reject) => {
    try {
      const newArray = [];
      await utils.writeFile('./data/products.json', newArray);

      resolve(newArray);
    } catch (err) {
      reject(err.message);
    }
  });

// DELETE ONE PRODUCT
exports.deleteById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      let oldProduct = null;
      products.forEach((product, index) => {
        if (product.id === id) {
          oldProduct = product;
          products.splice(index, 1);
        }
      });

      if (oldProduct) {
        await utils.writeFile('./data/products.json', products);
        resolve(oldProduct);
      } else {
        resolve(null);
      }
    } catch (err) {
      reject(err.message);
    }
  });

// UPDATE ONE PRODUCT
exports.updateById = (id, newData) =>
  new Promise(async (resolve, reject) => {
    try {
      let updatedProduct = null;
      products.forEach((product, index) => {
        if (product.id === id) {
          updatedProduct = { ...product, ...newData };
          products[index] = updatedProduct;
        }
      });

      if (updatedProduct) {
        await utils.writeFile('./data/products.json', products);
        resolve(updatedProduct);
      } else {
        resolve(null);
      }
    } catch (err) {
      reject(err.message);
    }
  });
