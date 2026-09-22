// Jednoduchý script pro zobrazení upozornění při kliknutí na košík
document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.querySelector('.cart');
    
    cartBtn.addEventListener('click', () => {
        alert('Košík je zatím prázdný. Přidávání produktů bude fungovat po napojení na backend/databázi.');
    });
});