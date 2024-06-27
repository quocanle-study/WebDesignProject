import { PrismaClient } from '@prisma/client';
import { createPagination } from '../utils/pagination.js';

const prisma = new PrismaClient();

const getShop = async (req, res) => {
    const pageTitle = 'Shop';

    const { page = 1, category, search } = req.query;
    const currentPage = parseInt(page);
    const itemsPerPage = 9;

    let where = {};

    if (category) {
        where.productCategoryId = parseInt(category);
    }

    if (search) {
        where.name = { contains: search };
    }

    // const orderBy = createOrderByClause(sort);

    const totalItems = await prisma.product.count({ where });

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const products = await prisma.product.findMany({
        where,
        // orderBy,
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
            productCategory: true,
            images: true, // Assuming 'images' is the correct relation name
        },
    });

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

    const categories = await prisma.productCategory.findMany({});

    const pagination = createPagination(req, totalPages, currentPage);

    return res.render('pages/shop', {
        categories,
        products: productsWithImages,
        currentPage,
        totalPages,
        category,
        search,
        // sort,
        pagination,
        pageTitle,
    });
};

// const createOrderByClause = (sort) => {
//     switch (sort) {
//         case 'new':
//             return { createdAt: 'desc' };
//         case 'popular':
//             return { OrderDetail: { _count: 'desc' } }; // Order by purchase count
//         case 'priceDesc':
//             return { salePrice: 'desc' };
//         case 'priceAsc':
//             return { salePrice: 'asc' };
//         default:
//             return {};
//     }
// };

export { getShop };
