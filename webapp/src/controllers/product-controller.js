import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    // TODO: Fetch products from database
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                productCategories: {
                    include: {
                        category: true,
                    },
                },
                images: true,
            },
        });
        return res.render('pages/shop', { products });
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while fetching products');
    }
};

const getProductById = async (req, res) => {
    // TODO: Fetch product by id from database
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                productCategories: {
                    include: {
                        category: true,
                    },
                },
                images: true,
            },
        });

        if (!product) {
            return res.status(404).send('Product not found');
        }

        return res.render('pages/product', { product });
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while fetching the product');
    }
};

export { getProducts, getProductById };
