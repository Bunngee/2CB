let cart = [];
let cartTotal = 0;

document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.querySelector('.cart');
    const products = document.querySelectorAll('.product');

    // Funkce pro přidání do košíku po kliknutí na produkt
    products.forEach(product => {
        product.addEventListener('click', () => {
            // Získání názvu a ceny z HTML
            const name = product.querySelector('h3').innerText;
            const priceText = product.querySelector('p').innerText;
            const price = parseInt(priceText.replace(' CZK', ''));

            cart.push({ name, price });
            cartTotal += price;
            
            // Aktualizace textu košíku nahoře v navigaci
            cartBtn.innerText = `CART (${cart.length})`;
            alert(`${name} přidáno do košíku!`);
        });
    });

    // Funkce pro dokončení objednávky po kliknutí na "CART"
    cartBtn.addEventListener('click', async () => {
        if (cart.length === 0) {
            alert('Tvůj košík je zatím prázdný.');
            return;
        }

        // Jednoduchý formulář přes vyskakovací okna (prompt)
        const customerName = prompt("Zadej své jméno a příjmení:");
        if (!customerName) return;

        const customerEmail = prompt("Zadej svůj e-mail pro potvrzení:");
        if (!customerEmail) return;

        const customerAddress = prompt("Zadej celou doručovací adresu (Ulice, Město, PSČ):");
        if (!customerAddress) return;

        const confirmOrder = confirm(`Celková cena je ${cartTotal} CZK. Chceš závazně objednat?`);
        
        if (confirmOrder) {
            // Odeslání dat na tvůj nový backend
            try {
                // POZNÁMKA: 'http://localhost:3000' musíš změnit na reálnou URL tvého backendu, jakmile ho nahraješ na internet.
                const response = await fetch('http://localhost:3000/api/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: customerName,
                        email: customerEmail,
                        address: customerAddress,
                        cartItems: cart,
                        totalPrice: cartTotal
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    alert(`Úspěch! ${result.message} Číslo tvé objednávky je: ${result.orderId}`);
                    // Vyprázdnění košíku
                    cart = [];
                    cartTotal = 0;
                    cartBtn.innerText = `CART (0)`;
                } else {
                    alert(`Chyba: ${result.error}`);
                }
            } catch (error) {
                alert('Nepodařilo se připojit k serveru. Zkontroluj, zda backend běží.');
            }
        }
    });
});