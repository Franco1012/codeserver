import '../utils/env.util.js';
import { faker } from '@faker-js/faker';
import dbConnect from "../utils/dbConnect.js"
import usersRepository from "../repositories/users.rep.js"


async function createData() {
    try {
        dbConnect()
        for (let i = 1; i <= 4; i++) {
            const user = {
                photo: faker.image.avatar(),
                email: faker.internet.email(),
                password:"1234",
                role: faker.number.int({ min: 0, max: 1 }),
                verify: true
            }
            await usersRepository.createRepository(user)
        }

        console.log("users create")
    } catch (error) {
        console.log(error)
    }
}

createData()