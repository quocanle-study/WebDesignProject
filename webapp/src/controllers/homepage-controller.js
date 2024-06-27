import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getHomepage = async (req, res) => {
    // TODO: Add logic to fetch data required to display one homepage from the database
    try {
        // Fetch products from the database along with their categories and images
        const products = await prisma.product.findMany({
            include: {
                productCategory: true,
                images: true, // Assuming 'images' is the correct relation name
            },
        });

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

        return res.render('pages/homepage', { products: productsWithImages });
    } catch (error) {
        console.error(error);
        return res.status(500).render('error', { error: 'Internal Server Error' });
    }
};

const getHomepageShuffle10 = async (req, res) => {
    try {
        // Step 1: Fetch all product IDs
        const allProductIds = await prisma.product.findMany({
            select: { id: true },
        });

        // Step 2: Shuffle the array of IDs
        const shuffledIds = allProductIds.sort(() => 0.5 - Math.random());

        // Step 3: Select the first 10 IDs
        const selectedIds = shuffledIds.slice(0, 8).map((product) => product.id);

        // Step 4: Fetch the details of these 10 products
        const products = await prisma.product.findMany({
            where: {
                id: { in: selectedIds },
            },
            include: {
                productCategory: true,
                images: true,
            },
        });

        if (!products || products.length === 0) {
            throw new Error('No products found');
        }

        // Transform each product to include image URLs
        const productsWithImages = products.map((product) => {
            const images = product.images.map((image) => image.url);
            return {
                ...product,
                images: images,
            };
        });

        // Send the products with images as response
        if (req.isAjax()) {
            return res.json(productsWithImages);
        }

        return res.render('pages/homepage', { products: productsWithImages });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { getHomepage, getHomepageShuffle10 };
