import express from 'express';
import { getHomepage } from './controllers/homepage-controller.js';
import { getAboutPage } from './controllers/about-controller.js';
import { getPosts, getPostById } from './controllers/post-controller.js';
import { getContactForm, createContact, contactSuccess } from './controllers/contact-controller.js';
import { contactValidator } from './validators/index.js';

const router = express.Router();

/** Homepage **/
router.get('/', getHomepage);

/** About **/
router.get('/about', getAboutPage);

/** Posts **/
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);

/** Contact **/
router.get('/contact', getContactForm);
router.post('/contact', contactValidator, createContact);
router.get('/contact-success', contactSuccess);

export default router;
