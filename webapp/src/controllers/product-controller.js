import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    // TODO: Fetch products from database
    const products = await prisma.product.findMany();

    if (!products) {
        throw new Error('No products found');
    }

    if (req.isAjax()) {
        return res.json(products);
    }

    return res.render('pages/products', { products });
};

const getProductById = async (req, res) => {
    // TODO: Fetch product by id from database
    const { id } = req.params;

    // Check if id is defined and can be parsed into an integer
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'Invalid product id' });
    }

    const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
    });

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    if (req.isAjax()) {
        return res.json(product);
    }

    return res.render('pages/product-detail', { product });
};

export { getProducts, getProductById };
