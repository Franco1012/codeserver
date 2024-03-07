class ProductManager {
    static #products = [];
    create(data) {
        const product = {
            id: ProductManager.#products.lenght === 0 ? 1 : ProductManager.#products.length + 1,
            title: data.title,
            photo: data.photo,
            category: data.category,
            price: data.price,
            stock: data.stock
        }
        ProductManager.#products.push(product);
        console.log(`producto creado`)

    }
    read() {
        return ProductManager.#products
    }
}

const gestorDeProductos = new ProductManager()

gestorDeProductos.create({
    title: `zapatilla`,
    photo: `img.jpg`,
    category: `calzado`,
    price: 75000,
    stock: 700
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

console.log(gestorDeProductos.read())