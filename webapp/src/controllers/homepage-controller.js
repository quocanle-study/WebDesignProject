import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getHomepage = async (req, res) => {
    const posts = await prisma.post.findMany({ include: { category: true } });
    return res.render('pages/homepage', { posts });
};

export { getHomepage };
