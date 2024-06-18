const getProducts = async (req, res) => {
    // TODO: Fetch products from database
    return res.render('pages/shop');
};

const getProductById = async (req, res) => {
    // TODO: Fetch product by id from database
    return res.render('pages/product');
};

export { getProducts, getProductById };
