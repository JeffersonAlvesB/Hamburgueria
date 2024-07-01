const carrinhoIcon = document.querySelector("#carrinho_compras");
const carrinhoContainer = document.querySelector(".carrinho_container");
const fecharCarrinho = document.querySelector(".fechar_carrinho");

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
  let removerItemCarrinho = document.getElementsByClassName("carrinho_remover");
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

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("carrinho_box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("produto_titulo"); // Corrected line
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      return;
    }
  }
  let cartBoxContent = `<img
                class="carrinho_produto_img"
                src="${productImg}"
                alt=""
                class="cart-img"
              />
              <div class="detalhe_box">
                <div class="carrinho_titulo_produto">${title}</div>
                <div class="carrinho_preço">${price}</div>
                <input type="number" value="1" class="carrinho_quantidade"  />
              </div>
              <!-- Remove Cart -->      
              <img class="carrinho_remover" src="assents/images/lixeira.png" alt="">`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("carrinho_remover")[0]
    .addEventListener("click", removeCarItem);
  cartShopBox
    .getElementsByClassName("carrinho_quantidade")[0]
    .addEventListener("change", quantityChanged);
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
    // Substitui vírgula por ponto para conversão correta e remova o 'R$'
    const preco = parseFloat(
      precoElement.innerText.replace("R$:", "").replace(",", ".")
    );
    const quantidade = quantidadeElement.valueAsNumber;
    total += preco * quantidade;
  }
  // Atualize o elemento com o id 'total_preço' com o total formatado
  document.getElementById("total_preço").innerText = `R$:${total
    .toFixed(2)
    .replace(".", ",")}`;
}

// Quantidade changes
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//Função abaixo será executada ao clicar no botão adicionar carrinho

let notifications = document.querySelector(".notifications");

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
  alert("Compra Finalizada");
  location.reload();
}
