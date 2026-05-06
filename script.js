const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    // Agora ambos recebem a classe 'active' ao mesmo tempo
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active'); 
});

// Fecha o menu e volta o X para hambúrguer ao clicar em qualquer link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});


