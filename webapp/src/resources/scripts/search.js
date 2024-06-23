document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('default-search');
    const searchForm = document.getElementById('search-form');
    const productItems = document.querySelectorAll('.product-item');

    const filterProducts = () => {
        const filter = searchInput.value.toLowerCase();
        productItems.forEach(item => {
            const productName = item.querySelector('.product-name').innerText.toLowerCase();
            if (productName.includes(filter)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    };

    searchInput.addEventListener('input', filterProducts);

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting
        filterProducts();
    });
});
    