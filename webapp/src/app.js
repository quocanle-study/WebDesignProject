import 'express-async-errors';
import config from './configs/app.js';
import express from 'express';
import path from 'path';
import routes from './routes.js';
import logger from './configs/logger.js';
import morgan from 'morgan';
import expressLayouts from 'express-ejs-layouts';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import rateLimit from 'express-rate-limit';
import assets from './configs/assets.js';

const csrfProtection = csrf({ cookie: true });

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

const isAjax = (req, res, next) => {
    req.isAjax = () => {
        return (
            req.xhr ||
            req.headers['x-requested-with'] === 'XMLHttpRequest' ||
            req.headers['accept'].includes('application/json')
        );
    };
    next();
};

const app = express();

app.locals.siteName = config.siteName; // Set site name
app.locals.styles = assets.styles; // Set styles
app.locals.scripts = assets.scripts; // Set scripts
app.set('view engine', 'ejs'); // Set view engine
app.set('views', path.join('src/views')); // Set views directory
app.use(expressLayouts); // Use express-ejs-layouts
app.set('layout', 'layouts/default'); // Set default layout
app.use(limiter); // Apply rate limiter
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                'https://www.googletagmanager.com',
                'https://www.google-analytics.com',
                "'unsafe-inline'",
            ],
            connectSrc: ["'self'", 'https://www.google-analytics.com'],
            imgSrc: ["'self'", 'data:', '*'], // TODO: Allow images from any domain (less secure)
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'], // TODO: This is the least secure method because it allows all inline scripts to run, which can expose your site to XSS attacks. Use this only if absolutely necessary
            frameSrc: ["'self'", 'https://www.googletagmanager.com'],
        },
    }),
); // Secure Express apps by setting various HTTP headers
app.use(cors()); // Enable CORS with various options
app.use(cookieParser()); // Parse Cookie header and populate req.cookies
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(isAjax); // Middleware set function to check if request is AJAX
app.use(compression()); // Compress responses
app.use(express.static(config.env === 'production' ? 'dist' : 'public')); // Serve static files
app.use(morgan('combined')); // Log HTTP requests
app.use(csrfProtection); // CSRF protection

// Middleware to set CSRF token
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Register all application routes
app.use('/', routes);

// Handle 404
app.use((req, res, next) => {
    if (config.env === 'development') {
        const viteDevServeAssetPaths = [/^\/src\/resources\//, /^\/@vite\/client/, /^\/node_modules\//];

        // In development mode, some asset paths must allow to next ViteExpress middleware.
        if (viteDevServeAssetPaths.some((pathRegex) => pathRegex.test(req.path))) {
            return next();
        }
    }
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });

    if (res.headersSent) {
        return next(err);
    }

    if (req.isAjax()) {
        return res.status(500).json({
            error: 'Something failed!',
            message: err.message,
        });
    } else {
        return res.status(500).render('500', { error: err });
    }
});

export default app;