const getHomepage = async (req, res) => {
    // TODO: Add logic to fetch data required to display one homepage from the database
    return res.render('pages/homepage');
};

export { getHomepage };
