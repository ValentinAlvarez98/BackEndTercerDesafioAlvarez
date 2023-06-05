// Se importa el módulo express para poder crear el servidor.
const express = require('express');

// Se crea el servidor.
const app = express();

// Se designa el puerto.
const port = 8080;

// Se importa la clase ProductManager.
const ProductManager = require('./productManager/product_manager');

// Se crea una instancia de la clase ProductManager.
const productManager = new ProductManager();


// Se crea el endpoint para obtener todos los productos o una catidad limitada de productos.
app.get('/products', async (req, res) => {

      // Se obtiene el query string limit.
      const limit = req.query.limit;

      // Se intenta obtener los productos.
      try {

            // Se obtienen los productos.
            const products = await productManager.getProducts();

            // Si no se especificó limit, se envían todos los productos.
            if (!limit) return res.send(products);

            // Si se especificó limit, se envían solo el número de productos especificado.
            res.send(products.slice(0, limit));

      } catch (error) {

            // Si hubo un error, se devuelve un mensaje de error.
            res.send({
                  error: "Error al obtener los productos."
            });

      }

});


// Se inicializa el servidor.
app.listen(port, () => console.log('Servidor express escuchando en puerto 8080'));