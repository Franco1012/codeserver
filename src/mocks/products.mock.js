import '../utils/env.util.js';
import { faker } from '@faker-js/faker';
import dbConnect from "../utils/dbConnect.js"
import productsRepository from "../repositories/products.rep.js"



async function createData() {
   
    try {
        const category = ["calzado", "ropa", "accesorio"]
        dbConnect()
        for (let i = 1; i <= 20; i++) {
           const product = {
                title: faker.commerce.product(),
                photo: faker.image.avatar(),
                category: category[faker.number.int({ min:0, max:2 })],
                price: faker.commerce.price({ min: 100, max: 200, dec: 0 }),
                stock: faker.number.int({ min: 10, max: 100 })
            }
            await productsRepository.createRepository(product)
        }


        console.log('Product created')
    } catch (error) {
        console.log(error)

    }
}
createData()