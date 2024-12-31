window.onload = function() {
    loadProducts('comidas');
    loadProducts('bebidas');
    loadProducts('doces');
    loadProducts('combos');
};

async function loadProducts(type) {
    const response = await fetch(`produtos/${type}.html`);
    const text = await response.text();
    document.getElementById(`${type}-container`).innerHTML = text;
}

function incrementClick(product) {
    const counter = product.querySelector('.click-counter');
    const count = parseInt(counter.textContent) + 1;
    counter.textContent = count;
    counter.style.display = 'flex';

    const price = product.getAttribute('data-price');
    const name = product.getAttribute('data-name');

    let cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    if (cart[name]){
        cart[name].quantity += 1; 
    } 
    else {
        cart[name] = {'price': price, 'quantity': 1};
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
}
 