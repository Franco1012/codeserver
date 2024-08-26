
import productsRepository from "../repositories/products.rep.js";

const checkRoleAndAuthorizePurchase = async (req, res, next) => {
    try {
        const userId = req.user._id; // ID del usuario que hace la solicitud
        const productId = req.body.product_id; // ID del producto desde los parámetros de la solicitud



        // Busca el producto en la base de datos
        const product = await productsRepository.readOneRepository(productId);


        if (!product) {
            return res.error404()
        }

        const { supplier_id } = product;
        const { role } = req.user; // Rol del usuario

        // Verifica si el usuario tiene permiso para comprar productos
        if (role === 1) {
            //Si es administrador no puede agregar productos al carrito
            return res.error400("You can't buy  products")
        }
        if (role === 2 && supplier_id.equals(userId)) {
            return res.error400("You can't buy your own product"); // No puede comprar sus propios productos

        } else {
            return next();
        }

    } catch (error) {
        return res.status(500).json({ message: error.message }); // Error en la validación
    }
};

export default checkRoleAndAuthorizePurchase;