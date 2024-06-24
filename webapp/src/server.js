import app from './app.js';
import config from './configs/app.js';
import ViteExpress from 'vite-express';

ViteExpress.config({ mode: config.env });

ViteExpress.listen(app, config.port, async () => {
    const { root, base } = await ViteExpress.getViteConfig();
    console.log(`Serving app from root ${root}`);
    console.log(`Server is listening at http://${config.host}:${config.port}${base}`);
});
