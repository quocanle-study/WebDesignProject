import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    // TODO: Fetch products from database
    // const products = await prisma.products.findMany();

    // if (!products) {
    //     throw new Error('No products found');
    // }

    // if (req.isAjax()) {
    //     return res.json(products);
    // }

    // return res.render('pages/shop', { products });

    const product = await prisma.product.findMany();

    if (!product) {
        throw new Error('No products found');
    }

    if (req.isAjax()) {
        return res.json(product);
    }

    return res.render('pages/shop', { product });
};

const getProductById = async (req, res) => {
    // TODO: Fetch product by id from database
    // const { id } = req.params;

    // // Check if id is defined and can be parsed into an integer
    // if (!id || isNaN(parseInt(id))) {
    //     return res.status(400).json({ error: 'Invalid product id' });
    // }

    // const products = await prisma.products.findUnique({
    //     where: { id: parseInt(id) },
    // });

    // if (!products) {
    //     return res.status(404).json({ error: 'Product not found' });
    // }

    // if (req.xhr) {
    //     return res.json(products);
    // }

    // return res.render('pages/product', { products });

    const id = req.query.id;

    // Check if id is defined and can be parsed into an integer
if (!id || isNaN(parseInt(id))) {
    // Render 400 error page
    return res.status(400).render('error', { error: 'Invalid product id' });
}

let product;
try {
    product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
    });
} catch (error) {
    // Render 500 error page
    return res.status(500).render('error', { error: 'Internal Server Error' });
}

if (!product) {
    // Render 404 error page
    return res.status(404).render('error', { error: 'Product not found' });
}

if (req.xhr) {
    return res.json(product);
}

return res.render('pages/product', { product });
};

export { getProducts, getProductById };
