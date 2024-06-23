const createPagination = (req, totalPages, currentPage) => {
    const params = { ...req.query };
    delete params.page;

    const baseUrl = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    const paginationUrls = [];

    for (let i = 1; i <= totalPages; i++) {
        const url = new URL(baseUrl); // Clone base URL
        url.searchParams.set('page', i);

        // Add additional query parameters
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });

        paginationUrls.push({
            page: i,
            url: url.href,
            isCurrent: currentPage === i,
        });
    }

    let prevPageUrl = null;
    let nextPageUrl = null;

    if (currentPage > 1) {
        const url = new URL(baseUrl); // Clone base URL
        url.searchParams.set('page', currentPage - 1);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        prevPageUrl = url.href;
    }

    if (currentPage < totalPages) {
        const url = new URL(baseUrl); // Clone base URL
        url.searchParams.set('page', currentPage + 1);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        nextPageUrl = url.href;
    }

    return {
        paginationUrls,
        prevPageUrl,
        nextPageUrl,
    };
};

export { createPagination };