import joi from "joi-oid"
const usersSchema = joi.object({
    photo: joi.string()
        .uri()  // Validar como una URL
        .optional()  // Hacerlo opcional si no es necesario en todos los casos
        .messages({
            "string.uri": "la foto debe ser una URL válida",
        }),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(3).max(50).required().messages({
        "any.required": "el email es requerido",
        "string.email": "el email debe ser válido",
        "string.empty": "el email, no puede ser una cadena de texto vacía",
        "string.min": "el email tiene que tener minimo 3 letras",
        "string.max": "el email tiene que tener maximo 50 letras",

    }),
    password: joi.string().min(3).max(50).required().messages({
        "any.required": "la contraseña es requerido",
        "string.empty": "la contraseña, no puede ser una cadena de texto vacía",
        "string.base": "la contraseña debe ser de tipo cadena de texto",
        "string.min": "la contraseña tiene que tener minimo 3 letras",
        "string.max": "la contraseña tiene que tener maximo 50 letras",

    }),
    role: joi.number(),
    verify: joi.boolean(),
    verifyCode: joi.string()
})
export default usersSchema