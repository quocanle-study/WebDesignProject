import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    // TODO: Fetch products from database
    try {
        // Fetch products from the database along with their categories and images
        const products = await prisma.product.findMany({
            include: {
                productCategory: true,
                images: true, // Assuming 'images' is the correct relation name
            },
        });

        // console.log(req.query.q);

        if (!products || products.length === 0) {
            throw new Error('No products found');
        }

        // Transform each product to include image URLs
        const productsWithImages = products.map((product) => {
            const images = product.images.map((image) => image.url); // Map each image to its URL
            return {
                ...product,
                images: images, // Replace the images relation with just the URLs
            };
        });

        if (req.isAjax()) {
            return res.json(productsWithImages);
        }

        return res.render('pages/shop', { products: productsWithImages });
    } catch (error) {
        console.error(error);
        return res.status(500).render('error', { error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    // TODO: Fetch product by id from database
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

    // Fetch associated images from 'productimage' table
    const imageObjects = await prisma.productImage.findMany({
        where: { productId: parseInt(id, 10) }, // Use the converted id here
    });

    // Extract image URLs from image objects
    const images = imageObjects.map((image) => image.url); // Assuming 'url' is the property containing the image URL

    // Combine product and image data
    const productWithImages = {
        ...product,
        images: images,
    };

    if (req.xhr) {
        return res.json(productWithImages);
    }

    return res.render('pages/product', { product: productWithImages });
};

const getShuffleRanProductsAndProductById = async (req, res) => {
    try {
        // Fetch products from the database along with their categories and images
        const allProductIds = await prisma.product.findMany({
            select: { id: true }
        });

        // Step 2: Shuffle the array of IDs
        const shuffledIds = allProductIds.sort(() => 0.5 - Math.random());

        // Step 3: Select the first 10 IDs
        const selectedIds = shuffledIds.slice(0, 10).map(product => product.id);

        // Step 4: Fetch the details of these 10 products
        const products = await prisma.product.findMany({
            where: {
                id: { in: selectedIds }
            },
            include: {
                productCategory: true,
                images: true,
            },
        });

        // console.log(req.query.q);

        if (!products || products.length === 0) {
            throw new Error('No products found');
        }

        // Transform each product to include image URLs
        const productsWithImages = products.map((product) => {
            const images = product.images.map((image) => image.url); // Map each image to its URL
            return {
                ...product,
                images: images, // Replace the images relation with just the URLs
            };
        });

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

        // Fetch associated images from 'productimage' table
        const imageObjects = await prisma.productImage.findMany({
            where: { productId: parseInt(id, 10) }, // Use the converted id here
        });

        // Extract image URLs from image objects
        const images = imageObjects.map((image) => image.url); // Assuming 'url' is the property containing the image URL

        // Combine product and image data
        const productWithImages = {
            ...product,
            images: images,
        };

        if (req.isAjax()) {
            return res.json(productsWithImages, productWithImages);
        }

        return res.render('pages/product', { products: productsWithImages, product: productWithImages});
    } catch (error) {
        console.error(error);
        return res.status(500).render('error', { error: 'Internal Server Error' });
    }
};

export { getProducts, getProductById, getShuffleRanProductsAndProductById };
