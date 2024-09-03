document.addEventListener('DOMContentLoaded', () => {
    updateValues();
    setupRemoveButtons();
});

document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', updateValues);
});

function updateValues() {
    let totalQuantity = 0;
    let totalValue = 0;

    document.querySelectorAll('.product').forEach(product => {
        let productQuantity = 0;
        let productValue = 0;
        const productId = product.id;
        const minQuantity = parseInt(product.getAttribute('data-min-quantity'));
        const minQuantityElementText = product.querySelector('small');
        const minQuantityElement = product.querySelector('small span');

        product.querySelectorAll('.quantity').forEach((input, index) => {
            const rate = parseFloat(input.getAttribute('data-rate'));
            const qty = parseInt(input.value);
            const projectedAmountCell = product.querySelectorAll('.amount')[index];

            if (!isNaN(qty) && qty >= 0) {
                const projectedAmount = qty * rate;
                projectedAmountCell.textContent = `$${projectedAmount.toFixed(2)}`;

                productQuantity += qty;
                productValue += projectedAmount;
            }
        });

        document.getElementById(`${productId}-qty`).textContent = `${productQuantity} PCS`;
        document.getElementById(`${productId}-value`).textContent = `$${productValue.toFixed(2)}`;

        // Update the color of the minimum quantity text
        if (productQuantity >= minQuantity) {
            minQuantityElementText.style.color = 'green';
            minQuantityElement.style.color = 'green';
        } else {
            minQuantityElementText.style.color = 'red';
            minQuantityElement.style.color = 'red';
        }

        totalQuantity += productQuantity;
        totalValue += productValue;
    });

    document.getElementById('total-quantity').textContent = `${totalQuantity} PCS`;
    document.getElementById('total-value').textContent = `$${totalValue.toFixed(2)}`;
}

function setupRemoveButtons() {
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            product.remove();
            updateValues();
        });
    });
}

function validateQuantitiesBeforeSubmission() {
    let allValid = true;

    document.querySelectorAll('.product').forEach(product => {
        const productQuantity = parseInt(product.querySelector(`#${product.id}-qty`).textContent);
        const minQuantity = parseInt(product.getAttribute('data-min-quantity'));

        if (productQuantity < minQuantity) {
            allValid = false;
            alert(`The total quantity for "${product.querySelector('h3').textContent}" must be at least ${minQuantity} PCS.`);
        }
    });

    return allValid;
}

// Example of how you might hook up the validation to a submit button
document.querySelector('.submit-form').addEventListener('click', (event) => {
    if (!validateQuantitiesBeforeSubmission()) {
        event.preventDefault(); // Prevent the submission if validation fails
        // alert('All Product Quantity Should Be Greater or Equal to MOQ.');
    } else {
        // Proceed with form submission (or redirection, etc.)
        alert('Form is valid. Proceeding to submission.');
    }
});
