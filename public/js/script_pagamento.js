document.getElementById('payment-form').addEventListener('submit', EnviarAoBanco);

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');

    // Recupera o carrinho do SessionStorage
    const cart = JSON.parse(sessionStorage.getItem('cart')) || {};

    // Inicializa o total
    let total = 0;

    // Verifica se o carrinho está vazio
    if (Object.keys(cart).length === 0) {
        productList.innerHTML = "<p style='color: gray'>Nenhum item no carrinho.</p>";
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
            <span class="product-price">R$ ${price.toFixed(2).replace('.', ',')}</span>
            <span class="product-subtotal">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
        `;
        productList.appendChild(item);
    }

    // Cria e exibe o total
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total';
    totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong>`;
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

async function EnviarAoBanco(event) {
    event.preventDefault(); // Impede o submit tradicional

    const cart = JSON.parse(sessionStorage.getItem('cart'));

    try {
        const response = await fetch('http://localhost:3000/pagamento/criar-preferencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart }),
        });

        const data = await response.json();

        if (data.id) {
            // Redireciona para o checkout do Mercado Pago
            const mp = new MercadoPago('TEST-a8f02ffe-cfad-4293-ae54-18adfc1c0159'); 
            mp.checkout({
                preference: {
                    id: data.id
                },
                autoOpen: true,
            });
        } else {
            alert('Erro ao criar preferência de pagamento');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao processar pagamento');
    }
}

function mostrarPopupAvaliacao() {
    const popup = document.getElementById("avaliacao-popup");
    popup.classList.remove("hidden");

    const starsContainer = document.getElementById("stars-container");
    starsContainer.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.innerHTML = "&#9733;"; // Estrela unicode
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
        document.getElementById("avaliacao-popup").classList.add("hidden");

        // Aqui você pode enviar as estrelas para o backend se quiser.
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

// Adiciona o evento de clique ao botão de pagamento
document.getElementById('pay-btn').addEventListener('click', async function(event) {
    event.preventDefault();
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    if (!cart || Object.keys(cart).length === 0) {
        alert("Carrinho vazio ou inválido.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/pagamento/criar-preferencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart }),
        });

        const data = await response.json();

        if (data.id) {
            // Redireciona para o checkout do Mercado Pago
            const mp = new MercadoPago('TEST-a8f02ffe-cfad-4293-ae54-18adfc1c0159'); 
            mp.checkout({
                preference: {
                    id: data.id
                },
                autoOpen: true,
            });
        } else {
            alert('Erro ao criar preferência de pagamento');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao processar pagamento');
    }
});