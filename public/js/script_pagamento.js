document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');
    const payBtn = document.getElementById('pay-btn');

    const cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    let total = 0;

    if (Object.keys(cart).length === 0) {
        productList.innerHTML = "<p>Nenhum item no carrinho.</p>";
        payBtn.setAttribute('disabled', 'true');
        return;
    }

    for (const [productName, details] of Object.entries(cart)) {
        const item = document.createElement('div');
        item.className = 'product-item';

        const price = parseFloat(details.price);
        const quantity = details.quantity;
        const subtotal = price * quantity;
        total += subtotal;

        item.innerHTML = `
            <span class="product-name">${productName}</span>
            <span class="product-quantity">${quantity}</span>
            <span class="product-price">R$ ${price.toFixed(2)}</span>
            <span class="product-subtotal">R$ ${subtotal.toFixed(2)}</span>
        `;
        productList.appendChild(item);
    }

    const totalDiv = document.createElement('div');
    totalDiv.className = 'total';
    totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    productList.appendChild(totalDiv);

    if (total === 0) {
        payBtn.setAttribute('disabled', 'true');
    } else {
        payBtn.removeAttribute('disabled');
        payBtn.classList.add('enabled');
    }

    // Clique no botão de pagamento
    payBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/pagamento/criar-preferencia', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart })
            });

            const data = await response.json();

            if (data.init_point) {
                // Redireciona para o checkout do Mercado Pago
                window.location.href = data.init_point;
            } else {
                alert('Erro ao iniciar pagamento.');
            }
        } catch (error) {
            console.error('Erro ao criar preferência:', error);
            alert('Erro no processamento do pagamento.');
        }
    });
});

// Popup de avaliação (mantido)
function mostrarPopupAvaliacao() {
    const popup = document.getElementById("avaliacao-popup");
    popup.classList.remove("hidden");

    const starsContainer = document.getElementById("stars-container");
    starsContainer.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.innerHTML = "&#9733;";
        star.classList.add("star");
        star.dataset.value = i;

        star.addEventListener("click", () => {
            selecionarEstrelas(i);
        });

        starsContainer.appendChild(star);
    }

    document.getElementById("enviar-avaliacao").addEventListener("click", () => {
        const estrelasSelecionadas = document.querySelectorAll(".star.selected").length;
        alert(`Obrigado pela sua avaliação de ${estrelasSelecionadas} estrela(s)!`);
        popup.classList.add("hidden");

        // Aqui você pode enviar a nota ao backend, se quiser
    });
}

function selecionarEstrelas(n) {
    const estrelas = document.querySelectorAll(".star");
    estrelas.forEach((star, i) => {
        if (i < n) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    });
}
