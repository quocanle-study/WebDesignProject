import express from 'express';
import { getHomepage } from './controllers/homepage-controller.js';
import { getAboutPage } from './controllers/about-controller.js';
import { getProducts, getProductById } from './controllers/product-controller.js';
import { getContactForm, createContact, contactSuccess } from './controllers/contact-controller.js';
import { contactValidator } from './validators/index.js';
import { getShop } from './controllers/shop-controller.js';

const router = express.Router();

/** Homepage **/
router.get('/', getHomepage);

/** About **/
router.get('/about', getAboutPage);

/** Products **/
router.get('/shop', getShop);
router.get('/product', getProductById);

/** Contact **/
router.get('/contact', getContactForm);
router.post('/contact', contactValidator, createContact);
router.get('/contact-success', contactSuccess);

export default router;
