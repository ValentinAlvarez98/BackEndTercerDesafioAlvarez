const ProductManager = require('./product_manager');

describe('ProductManager', () => {
      const productManager = new ProductManager();

      test('getProducts debería retornar los productos del archivo JSON si existe', async () => {

            productManager.path = './data/products.json' ? true : false;

            const products = await productManager.getProducts();

            expect(products).toEqual(productManager.products);

      });

      test('getProducts debería retornar un array vacío si el archivo JSON no existe', async () => {

            productManager.path = 'ruta_incorrecta/products.json';

            const products = await productManager.getProducts();

            expect(products).toEqual([]);

            productManager.path = './data/products.json';

      });

      test('addProduct no debería permitir campos vacíos', async () => {

            const product = {
                  title: null,
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10,
            };

            await productManager.addProduct(
                  product.title,
                  product.description,
                  product.price,
                  product.thumbnail,
                  product.code,
                  product.stock
            );

            const products = await productManager.getProducts();

            expect(products[0]).not.toEqual({
                  ...product,
                  id: 1,
            });

      });

      test('addProduct deberia agregar un producto', async () => {

            const product = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10,
            };

            await productManager.addProduct(
                  product.title,
                  product.description,
                  product.price,
                  product.thumbnail,
                  product.code,
                  product.stock
            );

            const products = await productManager.getProducts();

            expect(products[0]).toEqual({
                  ...product,
                  id: 1,
            });

      });

      test('addProduct no deberia permitir un code repetido', async () => {

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10,
            };

            const product2 = {
                  title: 'Titulo 2',
                  description: 'Descripcion 2',
                  price: 200,
                  thumbnail: 'Imagen 2',
                  code: 'Codigo 1',
                  stock: 20,
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            await productManager.addProduct(
                  product2.title,
                  product2.description,
                  product2.price,
                  product2.thumbnail,
                  product2.code,
                  product2.stock
            );

            const products = await productManager.getProducts();

            expect(products[0]).toEqual({
                  ...product1,
                  id: 1,
            });

      });

      test('addProduct deberia asignar un id incremental a cada producto', async () => {

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10,
            };

            const product2 = {
                  title: 'Titulo 2',
                  description: 'Descripcion 2',
                  price: 200,
                  thumbnail: 'Imagen 2',
                  code: 'Codigo 2',
                  stock: 20,
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            await productManager.addProduct(
                  product2.title,
                  product2.description,
                  product2.price,
                  product2.thumbnail,
                  product2.code,
                  product2.stock
            );

            const products = await productManager.getProducts();

            expect(products[0]).toEqual({
                  ...product1,
                  id: 1,
            });
            expect(products[1]).toEqual({
                  ...product2,
                  id: 2,
            });

      });

      test('getProductById deberia retornar un producto por su id', async () => {

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10
            };

            const product2 = {
                  title: 'Titulo 2',
                  description: 'Descripcion 2',
                  price: 200,
                  thumbnail: 'Imagen 2',
                  code: 'Codigo 2',
                  stock: 20
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            await productManager.addProduct(
                  product2.title,
                  product2.description,
                  product2.price,
                  product2.thumbnail,
                  product2.code,
                  product2.stock
            );

            const productById1 = await productManager.getProductById(1);
            const productById2 = await productManager.getProductById(3);

            expect(productById1).toEqual({
                  ...product1,
                  id: 1
            });

            expect(productById2).toBeUndefined();

      });

      test('updateProduct no deberia permitir campos vacios', async () => {

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            const products = await productManager.getProducts();

            const productToUpdate = products[0];

            const updatedPrice = null;

            await productManager.updateProduct(
                  productToUpdate.id,
                  productToUpdate.title,
                  productToUpdate.description,
                  updatedPrice,
                  productToUpdate.thumbnail,
                  productToUpdate.code,
                  productToUpdate.stock
            );

            const updatedProduct = await productManager.getProductById(productToUpdate.id);

            expect(updatedProduct).not.toEqual({
                  ...productToUpdate,
                  price: updatedPrice
            });

      });

      test('updateProduct no deberia permitir un code repetido', async () => {

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10
            };

            const product2 = {
                  title: 'Titulo 2',
                  description: 'Descripcion 1',
                  price: 200,
                  thumbnail: 'Imagen 2',
                  code: 'Codigo 2',
                  stock: 20
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            await productManager.addProduct(
                  product2.title,
                  product2.description,
                  product2.price,
                  product2.thumbnail,
                  product2.code,
                  product2.stock
            );

            const products = await productManager.getProducts();
            const productToUpdate = products[1];

            const updatedCode = 'Codigo 1';

            await productManager.updateProduct(
                  productToUpdate.id,
                  productToUpdate.title,
                  productToUpdate.description,
                  productToUpdate.price,
                  productToUpdate.thumbnail,
                  updatedCode,
                  productToUpdate.stock
            );

            const updatedProduct = await productManager.getProductById(productToUpdate.id);

            expect(updatedProduct).not.toEqual({
                  ...productToUpdate,
                  code: updatedCode
            });

      });

      test('updateProduct deberia permitir modificar el code si no esta repetido', async () => {

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10
            };

            const product2 = {
                  title: 'Titulo 2',
                  description: 'Descripcion 1',
                  price: 200,
                  thumbnail: 'Imagen 2',
                  code: 'Codigo 3',
                  stock: 20
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            await productManager.addProduct(
                  product2.title,
                  product2.description,
                  product2.price,
                  product2.thumbnail,
                  product2.code,
                  product2.stock
            );

            const products = await productManager.getProducts();
            const productToUpdate = products[1];

            const updatedCode = 'Codigo 2';

            await productManager.updateProduct(
                  productToUpdate.id,
                  productToUpdate.title,
                  productToUpdate.description,
                  productToUpdate.price,
                  productToUpdate.thumbnail,
                  updatedCode,
                  productToUpdate.stock
            );


            const updatedProduct = await productManager.getProductById(productToUpdate.id);

            expect(updatedProduct).toEqual({
                  ...productToUpdate,
                  code: updatedCode
            });

      });


      test('updateProduct deberia buscar un producto por su id y actualizarlo sin modificar su id', async () => {

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10
            };

            const product2 = {
                  title: 'Titulo 2',
                  description: 'Descripcion 1',
                  price: 200,
                  thumbnail: 'Imagen 2',
                  code: 'Codigo 2',
                  stock: 20
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            await productManager.addProduct(
                  product2.title,
                  product2.description,
                  product2.price,
                  product2.thumbnail,
                  product2.code,
                  product2.stock
            );


            const products = await productManager.getProducts();
            const productToUpdate = products[1];

            const updatedDescription = 'Descripcion 2';

            await productManager.updateProduct(
                  productToUpdate.id,
                  productToUpdate.title,
                  updatedDescription,
                  productToUpdate.price,
                  productToUpdate.thumbnail,
                  productToUpdate.code,
                  productToUpdate.stock
            );

            const updatedProduct = await productManager.getProductById(productToUpdate.id);

            expect(updatedProduct).toEqual({
                  ...productToUpdate,
                  description: updatedDescription
            });

      });

      test('deleteAllProducts deberia eliminar todos los productos', async () => {

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10
            };

            const product2 = {
                  title: 'Titulo 2',
                  description: 'Descripcion 1',
                  price: 200,
                  thumbnail: 'Imagen 2',
                  code: 'Codigo 2',
                  stock: 20
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            await productManager.addProduct(
                  product2.title,
                  product2.description,
                  product2.price,
                  product2.thumbnail,
                  product2.code,
                  product2.stock
            );

            await productManager.deleteAllProducts();

            const products = await productManager.getProducts();

            expect(products).toEqual([]);

      });

      test("deleteProduct deberia eliminar un producto por su id", async () => {

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10
            };

            const product2 = {
                  title: 'Titulo 2',
                  description: 'Descripcion 2',
                  price: 200,
                  thumbnail: 'Imagen 2',
                  code: 'Codigo 2',
                  stock: 20
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            await productManager.addProduct(
                  product2.title,
                  product2.description,
                  product2.price,
                  product2.thumbnail,
                  product2.code,
                  product2.stock
            );

            const products = await productManager.getProducts();

            const productToDelete1 = products[0];

            await productManager.deleteProduct(productToDelete1.id);

            expect(products).not.toEqual([...products, productToDelete1])

      });

      test('deleteProduct no deberia eliminar un producto si el id no existe', async () => {

            await productManager.deleteAllProducts();

            const product1 = {
                  title: 'Titulo 1',
                  description: 'Descripcion 1',
                  price: 100,
                  thumbnail: 'Imagen 1',
                  code: 'Codigo 1',
                  stock: 10
            };

            const product2 = {
                  title: 'Titulo 2',
                  description: 'Descripcion 2',
                  price: 200,
                  thumbnail: 'Imagen 2',
                  code: 'Codigo 2',
                  stock: 20
            };

            await productManager.addProduct(
                  product1.title,
                  product1.description,
                  product1.price,
                  product1.thumbnail,
                  product1.code,
                  product1.stock
            );

            await productManager.addProduct(
                  product2.title,
                  product2.description,
                  product2.price,
                  product2.thumbnail,
                  product2.code,
                  product2.stock
            );

            const products = await productManager.getProducts();

            const productToDelete = products[0];

            await productManager.deleteProduct(productToDelete.id + 1);

            expect(products).toEqual(products);

      });

});