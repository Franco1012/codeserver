import productsRepository from "../repositories/products.rep.js";

const checkProductManagementPermission = async (req, res, next) => {
    try {
        const userId = req.user._id; // ID del usuario que hace la solicitud
        const productId = req.params.pid; // ID del producto desde los parámetros de la solicitud



        // Busca el producto en la base de datos
        const product = await productsRepository.readOneRepository(productId);
       

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const { supplier_id } = product;
        const { role } = req.user; // Rol del usuario

        // Verifica si el usuario tiene permiso para gestionar el producto
        if (role === 1) {
            // Usuario es administrador, puede gestionar cualquier producto
            return next();
        }
        if (role === 2 && supplier_id.equals(userId)) {

            return next();
        } else {
            return res.status(403).json({ message: "Access denied" }); // No puede gestionar productos de otros
        }

    } catch (error) {
        return res.status(500).json({ message: error.message }); // Error en la validación
    }
};

export default checkProductManagementPermission;