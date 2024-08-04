import __dirname from "../../utils.js";

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "MATILDA",
            description: "Documentation of Matilda",
        },
    },
    apis: [__dirname + "/src/docs/*.yaml"],
};

export default options;