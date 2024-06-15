import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getPosts = async (req, res) => {
    const posts = await prisma.post.findMany({ include: { category: true } });

    if (req.isAjax()) {
        return res.json(posts);
    }

    return res.render('pages/posts', { posts });
};

const getPostById = async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
    });

    if (!post) {
        throw new Error('Post not found');
    }

    if (req.isAjax()) {
        return res.json(post);
    }

    return res.render('pages/post-detail', { post });
};

export { getPosts, getPostById };
