document.addEventListener('DOMContentLoaded', () => {
    const paymentIcons = document.querySelectorAll('.payment-icons img');
    const payBtn = document.getElementById('pay-btn');

    paymentIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            paymentIcons.forEach(icon => icon.classList.remove('selected'));
            icon.classList.add('selected');
            payBtn.removeAttribute('disabled');
            payBtn.classList.add('enabled');
        });
    });

    document.getElementById('cancel-btn').addEventListener('click', () => {
        // Lógica para cancelar o pedido
        alert('Pedido cancelado');
    });

    payBtn.addEventListener('click', () => {
        if (payBtn.hasAttribute('disabled')) {
            return;
        }
        // Lógica para processar o pagamento
        alert('Pagamento processado');
    });
});
