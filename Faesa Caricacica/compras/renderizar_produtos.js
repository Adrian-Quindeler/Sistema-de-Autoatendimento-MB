async function loadProducts(type) {
    const response = await fetch(`produtos/${type}.html`);
    const text = await response.text();
    document.getElementById(`${type}-container`).innerHTML = text;
}

window.onload = function() {
    loadProducts('comidas');
    loadProducts('bebidas');
    loadProducts('doces');
    loadProducts('combos');
};