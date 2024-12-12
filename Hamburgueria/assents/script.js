const carrinhoIcon = document.querySelector("#carrinho_compras");
const carrinhoContainer = document.querySelector(".carrinho_container");
const fecharCarrinho = document.querySelector(".fechar_carrinho");
let notifications = document.querySelector(".notifications");

carrinhoIcon.addEventListener("click", () => {
    carrinhoContainer.classList.add("ativo");
});

fecharCarrinho.addEventListener("click", () => {
    carrinhoContainer.classList.remove("ativo");
});

//carrinho no Js
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Função
function ready() {
    // Remove Items do carrinho
    let removerItemCarrinho =
        document.getElementsByClassName("carrinho_remover");
    for (let i = 0; i < removerItemCarrinho.length; i++) {
        let button = removerItemCarrinho[i];
        button.addEventListener("click", removeCarItem);
    }

    //Quantidade
    let quantityInputs = document.getElementsByClassName("carrinho_quantidade");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add To Cart
    let addCart = document.getElementsByClassName("adicionar_carrinho");
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

// Remove Items do carrinho ao aperta na lixeira
function removeCarItem(event) {
    let buttonClick = event.target;
    buttonClick.parentElement.remove();
    updateTotal();
}

// Add to Cart
function addCartClicked(event) {
    let button = event.target;
    let shopProduct = button.closest(".menu_cards");
    let titleElement = shopProduct.querySelector(".produto_titulo");
    let title = titleElement ? titleElement.innerText : "";
    let price = shopProduct.querySelector(".produto_preço").innerText;
    let productImg = shopProduct.querySelector(".produto_img").src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function configurarBotoesQuantidade() {
    const botoesMais = document.querySelectorAll(".mais");
    const botoesMenos = document.querySelectorAll(".menos");

    botoesMais.forEach((botao) => {
        botao.addEventListener("click", (event) => {
            const detalheBox = event.target.closest(".detalhe_box");
            const quantidadeElement = detalheBox.querySelector(
                ".carrinho_quantidade"
            );
            const novaQuantidade =
                parseInt(quantidadeElement.innerText || "1") + 1;
            quantidadeElement.innerText = novaQuantidade;
            updateTotal();
        });
    });

    botoesMenos.forEach((botao) => {
        botao.addEventListener("click", (event) => {
            const detalheBox = event.target.closest(".detalhe_box");
            const quantidadeElement = detalheBox.querySelector(
                ".carrinho_quantidade"
            );
            const novaQuantidade = Math.max(
                1,
                parseInt(quantidadeElement.innerText || "1") - 1
            );
            quantidadeElement.innerText = novaQuantidade;
            updateTotal();
        });
    });
}

// Adicionar produto ao carrinho com botões de quantidade
function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("carrinho_box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("produto_titulo");

    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            return;
        }
    }

    let cartBoxContent = `<img
                class="carrinho_produto_img"
                src="${productImg}"
                alt=""
              />
              <div class="detalhe_box">
                <div class="carrinho_titulo_produto">${title}</div>
                <div class="carrinho_preço">${price}</div>
                <div class='buttons_mais_menos'>
                  <button class='menos'>-</button>
                  <span class='carrinho_quantidade'>1</span>
                  <button class='mais'>+</button> 
                </div>
              </div>
              <img class="carrinho_remover" src="assents/images/lixeira.png" alt="">`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Configurar eventos para os novos elementos
    cartShopBox
        .querySelector(".carrinho_remover")
        .addEventListener("click", removeCarItem);
    configurarBotoesQuantidade();
    updateTotal();
}

// Função para atualizar o total
function updateTotal() {
    let total = 0;
    const carrinhoItems = document.getElementsByClassName("carrinho_box");
    for (let i = 0; i < carrinhoItems.length; i++) {
        const carrinhoItem = carrinhoItems[i];
        const precoElement = carrinhoItem.querySelector(".carrinho_preço");
        const quantidadeElement = carrinhoItem.querySelector(
            ".carrinho_quantidade"
        );
        const preco = parseFloat(
            precoElement.innerText.replace("R$:", "").replace(",", ".")
        );
        const quantidade = parseInt(quantidadeElement.innerText || "1");
        total += preco * quantidade;
    }

    document.getElementById("total_preço").innerText = `R$:${total
        .toFixed(2)
        .replace(".", ",")}`;
}

//Função abaixo será executada ao clicar no botão adicionar carrinho
function createToast(type, title, text) {
    let newToast = document.createElement("div");
    newToast.innerHTML = `
            <div class="toast ${type}">
                <div class="content">
                    <div class="title">${title}</div>
                    <span>${text}</span>
                </div>
                <svg
              style='width: 30px; cursor: pointer'  onclick="(this.parentElement).remove()"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
            </div>`;
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(() => newToast.remove(), 5000);
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".adicionar_carrinho");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            let type = "success";
            let title = "Produto Adicionado";
            let text = "Produto adicionado ao carrinho!";
            createToast(type, title, text);
        });
    });
});

//finalizar compra
function Finalizada() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Obrigado pela sua compra!</h2>
            <p>Seu pedido foi finalizado com sucesso.</p>
            <button id="closeModal">OK</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.style.display = "flex";

    document.getElementById("closeModal").addEventListener("click", () => {
        location.reload();
    });

    setTimeout(() => {
        location.reload();
    }, 5000);
}
