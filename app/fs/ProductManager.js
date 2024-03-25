import fs from "fs"

//modulo crypto para generar códigos aleatorios
import crypto from "crypto";

//ruta donde se va a guardar el archivo
const path = `./app/fs/files/products.json`

class ProductManager {
    constructor() {
        this.path = path;
        this.init();
    }

    init() {
        try {
            // Verificar si el archivo existe
            if (!fs.existsSync(this.path)) {
                const stringData = JSON.stringify([], null, 2);
                fs.writeFileSync(this.path, stringData);
                console.log("Se creó el archivo");
            } else {
                console.log("El archivo ya existe");
            }
        } catch (err) {
            console.error("Error al inicializar:", err);
        }
    }

    async create(data) {

        //se desestructura el objeto
        const { title, photo, category, price, stock } = data

        // Si no se proporciona una imagen, establecer una imagen por defecto
        const defaultPhoto = 'default.jpg';
        try {
            if (title && category && price && stock) {
                const product = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title: title,
                    photo: photo || defaultPhoto,
                    category: category,
                    price: price,
                    stock: stock
                }
                //se lee el contenido del archivo ubicado en la ruta path y lo guarda en la variable products
                let products = await fs.promises.readFile(this.path, "utf8")
                //se convierte el contenido del archivo ,que es una cadena json , en un objeto
                products = JSON.parse(products)
                //se agrega el producto creado al array de objetos
                products.push(product)
                //se convierte el array de objetos en una cadena json
                products = JSON.stringify(products, null, 2)
                //se sobrescribe el contenido del archivo
                await fs.promises.writeFile(this.path, products)
                console.log(`producto creado`)

                return product


            } else {
                return null
            }

        }
        //se captura la excepción y se maneja el error
        catch (error) {
            console.log(error)
        }

    }
    async read(category = "") {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8")
            products = JSON.parse(products)
            if (category !== '') {
                products = products.filter(product => product.category === category);
            }
            //se verifica si el array tiene elementos
            if (products.length !== 0) {

                return products
            } else {
                /*throw new Error(`No hay productos`)*/
                return null
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async readOne(id) {
        try {

            let products = await fs.promises.readFile(this.path, "utf-8")
            products = JSON.parse(products)
            if (products.length !== 0) {
                //se utiliza el método find para encontrar el producto cuyo id coincide con el id que se pasa por parámetro en el método readOne
                let one = products.find((product) => product.id === id)
                if (one) {
                    console.log(one)
                    return one
                } else {
                    /*throw new Error(`No se encontró el producto`)*/
                    return null
                }
            } else {
                /*throw new Error(`No hay productos`)*/
                return null
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async destroy(id) {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8")
            products = JSON.parse(products)
            if (products.length !== 0) {
                let one = products.find((product) => product.id === id)
                //verificamos que exista el producto a eliminar
                if (one) {
                    //filtramos los productos cuyo id No coincidan con el id que se pasa como parámetro del método destroy
                    let filtered = products.filter((product) => product.id !== id)
                    filtered = JSON.stringify(filtered, null, 2)
                    await fs.promises.writeFile(this.path, filtered)
                    console.log(`producto eliminado`)
                    //retornamos como objeto el array 
                    return JSON.parse(filtered)
                } else {
                    /*throw new Error(`No se encontró el producto`)*/
                    return null
                }
            } else {
                /*throw new Error(`No hay productos`)*/
                return null
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}

/*async function test() {
    try {
        const gestorDeProductos = new ProductManager();
        await gestorDeProductos.create({
            title: `zapatilla`,
            photo: `img.jpg`,
            category: `calzado`,
            price: 75000,
            stock: 500
        })

        await gestorDeProductos.create({
            title: `remera`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 15000,
            stock: 200
        })
        await gestorDeProductos.create({
            title: `pantalón`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 30000,
            stock: 500
        })
        await gestorDeProductos.create({
            title: `bufanda`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 12000,
            stock: 150
        })
        await gestorDeProductos.create({
            title: `camisa`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 45000,
            stock: 300
        })
        await gestorDeProductos.create({
            title: `botas`,
            photo: `img.jpg`,
            category: `calzado`,
            price: 95000,
            stock: 300
        })
        await gestorDeProductos.create({
            title: `pollera`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 25000,
            stock: 200
        })
        await gestorDeProductos.create({
            title: `short`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 45000,
            stock: 100
        })
        await gestorDeProductos.create({
            title: `gorra`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 15000,
            stock: 900
        })
        await gestorDeProductos.create({
            title: `cinto`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 25000,
            stock: 150
        })
        await gestorDeProductos.read()
        await gestorDeProductos.readOne("f75bd2bb1e94cb5bc1236ea7")
        await gestorDeProductos.destroy("69d1c0656c923a545631ad2d")

    }
    catch (error) {
        console.log(error)
    }
}
test()*/
const gestorDeProductos = new ProductManager()
export default gestorDeProductos



