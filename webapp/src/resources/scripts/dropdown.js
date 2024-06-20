// Desc: Script to toggle the dropdown menu
function toggleDropdownShop(){
    let dropdownShop = document.querySelector("#dropdownButton #dropdownShop");
    dropdownShop.classList.toggle("hidden");
}
function toggleDropdownSort(){
    let dropdownSort = document.querySelector("#dropdownButton #dropdownSort");
    dropdownSort.classList.toggle("hidden");
}
document.getElementById('shopBy').addEventListener('click', toggleDropdownShop);
document.getElementById('sortBy').addEventListener('click', toggleDropdownSort);
