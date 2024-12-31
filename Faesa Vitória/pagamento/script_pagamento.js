document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');

    // Recupera o carrinho do SessionStorage
    const cart = JSON.parse(sessionStorage.getItem('cart')) || {};

    // Inicializa o total
    let total = 0;

    // Verifica se o carrinho está vazio
    if (Object.keys(cart).length === 0) {
        productList.innerHTML = "<p>Nenhum item no carrinho.</p>";
        return; // Sai se não houver itens no carrinho
    }

    // Itera sobre os itens do carrinho
    for (const [productName, details] of Object.entries(cart)) {
        const item = document.createElement('div');
        item.className = 'product-item';

        // Converte o preço para número para cálculos
        const price = parseFloat(details.price);
        const quantity = details.quantity;
        const subtotal = price * quantity;
        total += subtotal;

        // Adiciona o HTML do item
        item.innerHTML = `
            <span class="product-name">${productName}</span>
            <span class="product-quantity">${quantity}</span>
            <span class="product-price">R$ ${price.toFixed(2)}</span>
            <span class="product-subtotal">R$ ${subtotal.toFixed(2)}</span>
        `;
        productList.appendChild(item);
    }

    // Cria e exibe o total
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total';
    totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    productList.appendChild(totalDiv);

    // Gerencia o botão de pagamento
    const payBtn = document.getElementById('pay-btn');
    if (total === 0) {
        payBtn.setAttribute('disabled', 'true');
    } else {
        payBtn.removeAttribute('disabled');
        payBtn.classList.add('enabled');
    }
});
