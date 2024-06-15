import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

const getContactForm = (req, res) => {
    return res.render('pages/contact', { errors: null, oldData: null });
};

const createContact = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);

        if (req.isAjax()) {
            return res.status(400).json({ errors: errorMessages });
        }

        // Render the form with error messages and old data
        return res.status(400).render('pages/contact', {
            errors: errorMessages,
            oldData: req.body,
        });
    }

    const { name, email, message } = req.body;

    const contact = await prisma.contact.create({
        data: {
            name,
            email,
            message,
        },
    });

    if (req.isAjax()) {
        return res.json(contact);
    }

    return res.render('pages/contact-success', { contact });
};

const contactSuccess = (req, res) => {
    return res.render('pages/contact-success');
};

export { getContactForm, createContact, contactSuccess };
