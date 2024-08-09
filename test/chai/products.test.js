import { expect } from "chai";
import dao from "../../src/app/dao.factory.js"
const { productsManager } = dao;
describe(
    "Testeando el recurso PRODUCT",
    () => {
        const data = { title: "camisa", photo: "imagen.png" };
        let id;
        it(
            "Testeando que la creación de un producto recibe un objeto con la propiedad 'title'",
            async () => {
                expect(data).to.have.property("title")
            }
        )
        it(
            "Testeando que la creación de un producto recibe un objeto con la propiedad 'title' de tipo string",
            async () => {
                expect(data.title).to.be.a("string")
            }
        )
        /*it("Testeando que la creación de un producto recibe un objeto con la propiedad opcional 'photo'", () => {
            expect(data).to.have.property.that.exists;
        });*/
        it("Testeando que la creación de un producto devuelve un objeto con un _id", async () => {
            const response = await productsManager.create(data);
            id = response._id;
            expect(response).to.have.property("_id")
        });
        it("Testeando la actualización de un producto", async () => {
            const one = await productsManager.read({ _id: id });
            const response = await productsManager.update(id, { title: "pantalon" });
            expect(one.title).is.not.equal(response.title)
        });
        it("Testeando la eliminacion de un producto", async () => {
            await productsManager.destroy(id);
            const one = await productsManager.readOne(id);
            expect(one).not.exist
        });
    }
)