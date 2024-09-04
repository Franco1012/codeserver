class ProductManager {
    static #products = [];
    //método para crear el producto
    create(data) {

        try {
            if (data.title) {

                //se agrega el producto al array
                ProductManager.#products.push(data);
                console.log(`producto creado`)
                return data
            } else {
                const error = new Error("NOT CREATE")
                error.statusCode = 404
                throw error
            }

        } catch (error) {
            throw error
        }

    }
    //metodo para leer el array de productos
    // Método para leer los productos
    read(filter) {
        const { category } = filter;
        try {
            let products = [...ProductManager.#products];

            // Filtrar por categoría si se proporciona
            if (category !== undefined && category !== null && category !== "") {
                products = products.filter(product => product.category === category);
            }

            return products;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    // Método para paginar los productos
    paginate({ filter, opts }) {
        try {
            // Filtrar los productos según el filtro proporcionado
            let filtered = [...ProductManager.#products];
            if (filter) {
                if (filter.title) {
                    filtered = filtered.filter((product) => product.title.includes(filter.title));
                }
                if (filter.category) {
                    filtered = filtered.filter((product) => product.category === filter.category);
                }
            }

            // Valores predeterminados para las opciones de paginación
            const page = opts.page || 1;
            const limit = opts.limit || 10;

            // Calcular índices de inicio y fin para la página actual
            const start = (page - 1) * limit;
            const end = start + limit;

            // Obtener los elementos paginados
            const paginatedItems = filtered.slice(start, end);

            // Retornar el resultado paginado
            return {
                docs: paginatedItems,
                totalDocs: filtered.length,
                limit: limit,
                page: page,
                totalPages: Math.ceil(filtered.length / limit),
                hasPrevPage: page > 1,
                hasNextPage: end < filtered.length,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: end < filtered.length ? page + 1 : null,
            };
        } catch (error) {
            console.log(error.message);
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
            throw error

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
            throw error

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
                return one
            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error

            }
        }
        catch (error) {
            throw error

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
