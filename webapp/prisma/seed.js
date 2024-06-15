import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.category.createMany({
        data: [
            { name: 'Technology' },
            { name: 'Lifestyle' },
            { name: 'Travel' },
            { name: 'Food' },
            { name: 'Fashion' },
        ],
    });

    await prisma.post.createMany({
        data: [
            { title: 'Post 1', content: 'Content for post 1', categoryId: 1 },
            { title: 'Post 2', content: 'Content for post 2', categoryId: 2 },
            { title: 'Post 3', content: 'Content for post 3', categoryId: 3 },
            { title: 'Post 4', content: 'Content for post 4', categoryId: 4 },
            { title: 'Post 5', content: 'Content for post 5', categoryId: 5 },
            { title: 'Post 6', content: 'Content for post 6', categoryId: 1 },
            { title: 'Post 7', content: 'Content for post 7', categoryId: 2 },
            { title: 'Post 8', content: 'Content for post 8', categoryId: 3 },
            { title: 'Post 9', content: 'Content for post 9', categoryId: 4 },
            { title: 'Post 10', content: 'Content for post 10', categoryId: 5 },
        ],
    });
}

main()
    .then(() => console.log('Data seeded'))
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
