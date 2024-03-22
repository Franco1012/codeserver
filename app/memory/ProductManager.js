class ProductManager {
    static #products = [];
    //método para crear el producto
    create(data) {
        //se desestructura el objeto
        const { title, photo, category, price, stock } = data
        try {
            if (title && photo && category && price && stock) {
                const product = {
                    id: ProductManager.#products.length === 0 ? 1 : ProductManager.#products.length + 1,
                    title: title,
                    photo: photo,
                    category: category,
                    price: price,
                    stock: stock
                }
                //se agrega el producto al array
                ProductManager.#products.push(product);
                console.log(`producto creado`)
            } else {
                //se recorre las propiedades del objeto con un bucle for in
                function buscarPropiedadVacia() {
                    for (let prop in data) {
                        if (data[prop] === '') {
                            const propiedadVacia = prop;
                            //se lanza una excepción
                            return propiedadVacia
                        }
                    }
                }
                const propiedadVacia = buscarPropiedadVacia()
                if (propiedadVacia) {
                    throw new Error(`No se han introducido  los datos en la propiedad ${propiedadVacia}`)
                } else {
                    throw new Error(`la propiedad no existe`)
                }


            }

        }
        //se captura la excepción y se maneja el error
        catch (error) {
            console.log(`ocurrió un error:${error.message}`)
        }

    }
    //metodo para leer el array de productos
    read() {
        try {
            if (ProductManager.#products.length !== 0) {
                return ProductManager.#products
            } else {
                throw new Error(`no hay productos para leer`)
            }


        }
        catch (error) {
            console.log(`ocurrió un error:${error.message}`)
        }

    }
    //método para encontrar un producto 
    readOne(id) {

        try {
            const one = ProductManager.#products.find(producto => producto.id === id)
            if (one) {
                return one
            } else {
                throw new Error(`No se encontró el producto`)
            }
        }


        catch (error) {
            console.log(`hubo un error: ${error}`)
        }

    }
    //método para eliminar un producto 
    destroy(id) {

        try {
            //verificamos si el producto existe
            const one = this.readOne(id)

            if (one) {

                const within = ProductManager.#products.filter(producto => producto.id !== id)
                //cambiamos la referencia de ProductManager.#products para que apunte al mismo array que within
                ProductManager.#products = within
                console.log("se eliminó el producto")
            } else {
                throw new Error("one no esta definido")
            }


        }
        catch (error) {
            console.log(`se generó un error: ${error.message}`)
        }

    }
}

const gestorDeProductos = new ProductManager()

gestorDeProductos.create({
    title: `zapatilla`,
    photo: `img.jpg`,
    category: `calzado`,
    price: 75000,
    stock: 500
})

gestorDeProductos.create({
    title: `remera`,
    photo: `img.jpg`,
    category: `ropa`,
    price: 15000,
    stock: 200
})
gestorDeProductos.create({
    title: `pantalón`,
    photo: `img.jpg`,
    category: `ropa`,
    price: 30000,
    stock: 500
})
gestorDeProductos.create({
    title: `bufanda`,
    photo: `img.jpg`,
    category: `ropa`,
    price: 12000,
    stock: 150
})
gestorDeProductos.create({
    title: `camisa`,
    photo: `img.jpg`,
    category: `ropa`,
    price: 45000,
    stock: 300
})
gestorDeProductos.create({
    title: `botas`,
    photo: `img.jpg`,
    category: `calzado`,
    price: 95000,
    stock: 300
})
gestorDeProductos.create({
    title: `pollera`,
    photo: `img.jpg`,
    category: `ropa`,
    price: 25000,
    stock: 200
})
gestorDeProductos.create({
    title: `short`,
    photo: `img.jpg`,
    category: `ropa`,
    price: 45000,
    stock: 100
})
gestorDeProductos.create({
    title: `gorra`,
    photo: `img.jpg`,
    category: `ropa`,
    price: 15000,
    stock: 900
})
gestorDeProductos.create({
    title: `cinto`,
    photo: `img.jpg`,
    category: `ropa`,
    price: 25000,
    stock: 150
})

console.log(gestorDeProductos.read())
console.log(gestorDeProductos.readOne(2))
