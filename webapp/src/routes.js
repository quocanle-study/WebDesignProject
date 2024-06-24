import express from 'express';
// eslint-disable-next-line
import { getHomepage, getHomepageShuffle10 } from './controllers/homepage-controller.js';
import { getAboutPage } from './controllers/about-controller.js';
// eslint-disable-next-line
import { getProducts, getProductById, getShuffleRanProductsAndProductById } from './controllers/product-controller.js';
import { getContactForm, createContact, contactSuccess } from './controllers/contact-controller.js';
import { contactValidator } from './validators/index.js';
import { getShop } from './controllers/shop-controller.js';

const router = express.Router();

/** Homepage **/
router.get('/', getHomepageShuffle10);

/** About **/
router.get('/about', getAboutPage);

/** Products **/
router.get('/shop', getShop);
router.get('/product', getShuffleRanProductsAndProductById);

/** Contact **/
router.get('/contact', getContactForm);
router.post('/contact', contactValidator, createContact);
router.get('/contact-success', contactSuccess);

export default router;
