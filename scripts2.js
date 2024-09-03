document.addEventListener('DOMContentLoaded', updateValues);

document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', updateValues);
});

function updateValues() {
    let totalQuantity = 0;
    let totalValue = 0;

    ['product1', 'product2', 'product3'].forEach((productId, productIndex) => {
        let productQuantity = 0;
        let productValue = 0;

        document.querySelectorAll(`#${productId} .quantity`).forEach((input, index) => {
            const rate = parseFloat(input.getAttribute('data-rate'));
            const qty = parseInt(input.value);
            const projectedAmountCell = document.querySelectorAll(`#${productId} .amount`)[index];

            if (!isNaN(qty) && qty >= 0) {
                const projectedAmount = qty * rate;
                projectedAmountCell.textContent = `$${projectedAmount.toFixed(2)}`;

                productQuantity += qty;
                productValue += projectedAmount;
            }
        });

        document.getElementById(`${productId}-qty`).textContent = `${productQuantity} PCS`;
        document.getElementById(`${productId}-value`).textContent = `$${productValue.toFixed(2)}`;

        totalQuantity += productQuantity;
        totalValue += productValue;
    });

    document.getElementById('total-quantity').textContent = `${totalQuantity} PCS`;
    document.getElementById('total-value').textContent = `$${totalValue.toFixed(2)}`;
}
