class ProductManager {
    static #products = [];
    //método para crear el producto
    create(data) {
        //se desestructura el objeto
        const { title, photo, category, price, stock } = data
        try {
            if (title) {
                const product = {
                    id: ProductManager.#products.lenght === 0 ? 1 : ProductManager.#products.length + 1,
                    title: title,
                    photo: photo || "default.jpg",
                    category: category || "uncategorized",
                    price: price || 1,
                    stock: stock || 1
                }
                //se agrega el producto al array
                ProductManager.#products.push(product);
                console.log(`producto creado`)
            } else {
                const error = new Error("NOT CREATE")
                error.statusCode = 404
                throw error
            }

        } catch (error) {
            console.log(error.message)
        }

    }
    //metodo para leer el array de productos
    read() {
        try {
            if (ProductManager.#products.length !== 0) {
                return ProductManager.#products
            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error

            }
        }
        catch (error) {
            console.log(error.message)

        }

    }
    //método para encontrar un producto 
    readOne(id) {

        try {
            const one = ProductManager.#products.find(producto => producto.id === id)
            if (one) {
                return one
            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error

            }
        }
        catch (error) {
            console.log(error.message)

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
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error

            }
        }
        catch (error) {
            console.log(error.message)

        }

    }

    update(id, data) {
        try {

            let products = this.read()
            let product = products.find(p => p.id === id)
            console.log("product", product)

            if (product) {
                for (let prop in data) {
                    product[prop] = data[prop]
                }

                console.log("producto actualizado")
                return product

            } else {
                console.log("pasa por else")
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error
            }

        } catch (error) {
            console.log(error.message)

        }
    }
}



const gestorDeProductos = new ProductManager()



gestorDeProductos.create({
    title: "remera",
    photo: "img.jpg",
    category: "ropa",
    price: 15000,
    stock: 200
})
gestorDeProductos.update(2, {
    title: "zapatiaaaaaa"

});

/*gestorDeProductos.create({
    title: "pantalón",
    photo: "img.jpg",
    category: "ropa",
    price: 30000,
    stock: 500
});

gestorDeProductos.create({
    title: "bufanda",
    photo: "img.jpg",
    category: "ropa",
    price: 12000,
    stock: 150
});

gestorDeProductos.create({
    title: "camisa",
    photo: "img.jpg",
    category: "ropa",
    price: 45000,
    stock: 300
});

gestorDeProductos.create({
    title: "botas",
    photo: "img.jpg",
    category: "calzado",
    price: 95000,
    stock: 300
});

gestorDeProductos.create({
    title: "pollera",
    photo: "img.jpg",
    category: "ropa",
    price: 25000,
    stock: 200
});

gestorDeProductos.create({
    title: "short",
    photo: "img.jpg",
    category: "ropa",
    price: 45000,
    stock: 100
});

gestorDeProductos.create({
    title: "gorra",
    photo: "img.jpg",
    category: "ropa",
    price: 15000,
    stock: 900
});

gestorDeProductos.create({
    title: "cinto",
    photo: "img.jpg",
    category: "ropa",
    price: 25000,
    stock: 150
});

gestorDeProductos.create({
    title: "sandalia",
    photo: "img.jpg",
    category: "calzado",
    price: 60000,
    stock: 250
});

gestorDeProductos.create({
    title: "pantalón corto",
    photo: "img.jpg",
    category: "ropa",
    price: 18000,
    stock: 120
});

gestorDeProductos.create({
    title: "mochila",
    photo: "img.jpg",
    category: "accesorio",
    price: 40000,
    stock: 90
});

gestorDeProductos.create({
    title: "falda",
    photo: "img.jpg",
    category: "ropa",
    price: 28000,
    stock: 110
});

gestorDeProductos.create({
    title: "gafas de sol",
    photo: "img.jpg",
    category: "accesorio",
    price: 30000,
    stock: 80
});

gestorDeProductos.create({
    title: "abrigo",
    photo: "img.jpg",
    category: "ropa",
    price: 70000,
    stock: 70
});

gestorDeProductos.create({
    title: "botines",
    photo: "img.jpg",
    category: "calzado",
    price: 90000,
    stock: 180
});

gestorDeProductos.create({
    title: "suéter",
    photo: "img.jpg",
    category: "ropa",
    price: 35000,
    stock: 100
});*/

/*console.log(gestorDeProductos.read())*/
/*console.log(gestorDeProductos.readOne(2))*/
