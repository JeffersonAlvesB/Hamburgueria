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

  alert("Seu pedido foi Adicionado");
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

//finalizar compra
function Finalizada() {
  alert("Compra Finalizada");
  location.reload();
}
