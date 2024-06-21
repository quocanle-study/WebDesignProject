import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // TODO: Add seed data here
    // const productA = await prisma.product.create({
    //     data: {
    //         name: 'Product A',
    //         description: 'Description for Product A',
    //         price: 99.99,
    //         categories: {
    //             create: [
    //                 { name: 'Electronics' },
    //                 { name: 'Home & Garden' },
    //             ],
    //         },
    //         images: {
    //             create: { imageUrl: 'https://example.com/product-a-image.jpg' },
    //         },
    //     },
    // });

    // const productB = await prisma.product.create({
    //     data: {
    //         name: 'Product B',
    //         description: 'Description for Product B',
    //         price: 49.95,
    //         categories: {
    //             create: { name: 'Clothing' },
    //         },
    //         images: {
    //             create: { imageUrl: 'https://example.com/product-b-image.jpg' },
    //         },
    //     },
    // });

    // const productC = await prisma.product.create({
    //     data: {
    //         name: 'Product C',
    //         description: 'Description for Product C',
    //         price: 149.00,
    //         categories: {
    //             connect: { id: productA.categories[0].id },
    //         },
    //         images: {
    //             create: { imageUrl: 'https://example.com/product-c-image.jpg' },
    //         },
    //     },
    // });

    // await prisma.sortOption.createMany({
    //     data: [
    //         { name: 'Price (Low to High)' },
    //         { name: 'Price (High to Low)' },
    //         { name: 'Newest First' },
    //     ],
    // });

    const productA = await prisma.product.create({
        data: {
            name: 'Product A',
            description: 'Description for Product A',
            price: 29.99,
            category: 'Charms',
            image1_url: 'https://example.com/Product-a.jpg',
        },
    });

    const productB = await prisma.product.create({
        data: {
            name: 'Product B',
            description: 'Description for Product B',
            price: 34.99,
            category: 'Charms',
            image1_url: 'https://example.com/Product-b.jpg',
        },
    });

    const productC = await prisma.product.create({
        data: {
            name: 'Product C',
            description: 'Description for Product C',
            price: 19.99,
            category: 'Charms',
            image1_url: 'https://example.com/Product-c.jpg',
        },
    });
}

main()
    .then(() => console.log('Data seeded'))
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
