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
        const productsWithImages = products.map(product => {
            const images = product.images.map(image => image.url); // Map each image to its URL
            return {
                ...product,
                images: images // Replace the images relation with just the URLs
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

export { getHomepage };
