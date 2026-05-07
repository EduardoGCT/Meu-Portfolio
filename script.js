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

//terminal simulado
const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value.trim().toLowerCase();
        let response = "";

        if (command === 'clear') {
            output.innerHTML = ""; // Limpa todo o conteúdo
            input.value = "";
            return; // Encerra a função aqui
        } 
        
        if (command === 'skills') {
            response = "Python, Django, React, Linux, SQL.";
        } else if (command === 'status') {
            response = "3º Semestre de CC | Buscando Estágio.";
        } else if (command === 'help') {
            response = "Comandos: skills, status, clear.";
        } else if (command !== "") {
            response = `Comando não encontrado: ${command}`;
        }

        if (command !== "") {
            output.innerHTML += `<p><span class="prompt">$ ${command}</span><br>${response}</p>`;
        }
        
        input.value = "";
        output.scrollTop = output.scrollHeight;
    }
});


