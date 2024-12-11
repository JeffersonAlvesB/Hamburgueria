// Animações
AOS.init();

// Dom
let logo = document.querySelector(".logo");
let menu = document.querySelector(".navbar");
let menuLinha = document.querySelector(".menu_linha");
let links = document.querySelector(".ul_links");

// Abrir e fechar menu
menuLinha.addEventListener("click", () => {
    menuLinha.classList.toggle("active");
    menu.classList.toggle("active");
});

// Fechar o menu ao clicar nos links
links.addEventListener("click", () => {
    menuLinha.classList.toggle("active");
    menu.classList.toggle("active");
});

// Recarregar a página ao clicar na logo
logo.addEventListener("click", () => {
    location.reload();
});
