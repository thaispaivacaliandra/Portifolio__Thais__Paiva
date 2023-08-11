const header = document.querySelector("header");

window.addEventListener("scroll", diminuiHeader);
function diminuiHeader(){
    if(window.pageY0ffset > 0 && header.classList.contains("max")){
        header.classList.remove("max");
        header.classList.add("min");
    } else if(window.pageY0ffset === 0 && header.classList.contains("min")){
        header.classList.add("max");
        header.classList.remove("min");
    }
}




function selecionarPrato(prato) {
  let pratoSelecionado = document.querySelector(".pratos .escolhido");
  
  if (prato.classList.contains("escolhido")) {
    prato.classList.remove("escolhido");
  } 
  else {
    if (!!pratoSelecionado) {
      
    }
    prato.classList.add("escolhido");
  }
  
  verificarSelecao();
}



function selecionarMeia(meia) {
  let meiaSelecionado = document.querySelector(".meias .escolhido");
  
  if (meia.classList.contains("escolhido")) {
    meia.classList.remove("escolhido");
  } 
  else {
    if (!!meiaSelecionado) {
      
    }
    meia.classList.add("escolhido");
  }
  
  verificarSelecao();
}

  function selecionarBebidas(bebida) {
    let bebidaSelecionada = document.querySelector(".bebidas .escolhido");

    if (bebida.classList.contains("escolhido")){
      bebida.classList.remove("escolhido");
    }
    else{
      if(!!bebidaSelecionada){

      }
      bebida.classList.add("escolhido");
    }
  
    
    verificarSelecao();
  }
  
  function selecionarSobremesas(sobremesa) {
    let sobremesaSelecionada = document.querySelector(".sobremesas .escolhido");
  
    if (!!sobremesaSelecionada) {
      sobremesaSelecionada.classList.remove("escolhido");
    }
  
    sobremesa.classList.add("escolhido");
    verificarSelecao();
  }
  
  function verificarSelecao() {
    const verifica = document.querySelectorAll(".escolhido").length;
    const footer = document.querySelector("footer");
  
    if (verifica === 1) {
      footer.firstElementChild.classList.add("escondido");
      footer.lastElementChild.classList.remove("escondido");
    }
  }
  
  function formatarPreco(valor) {
    let preco = valor
      .querySelector(".valor")
      .innerHTML.replace("R$", "")
      .replace(",", ".");
  
    preco = (Number(preco) * 100) / 100;
  
    return preco;
  }
  
  function fechandoPedido() {
    let pedido = {};
    const pratosSelecionados = document.querySelectorAll(".pratos .escolhido");
    const meiasSelecionadas = document.querySelectorAll(".meias .escolhido");
    const bebidasSelecionadas = document.querySelectorAll(".bebidas .escolhido");
    const sobremesasSelecionadas = document.querySelectorAll(".sobremesas .escolhido");
  
    const nomePratos = [];
    const nomeMeias = []; 
    const nomeBebidas = [];
    const nomeSobremesas = [];
    const precosPratos = [];
    const precosMeias = [];
    const precosBebidas = [];
    const precosSobremesas = [];
  
    pratosSelecionados.forEach((pratoSelecionado) => {
      const nomePrato = pratoSelecionado.querySelector(".nome").innerHTML;
      const precoPrato = formatarPreco(pratoSelecionado);
      nomePratos.push(nomePrato);
      precosPratos.push(precoPrato);
    });
  
    meiasSelecionadas.forEach((meiaSelecionada) => {
      const nomeMeia = meiaSelecionada.querySelector(".nome").innerHTML;
      const precoMeia = formatarPreco(meiaSelecionada);
      nomeMeias.push(nomeMeia); 
      precosMeias.push(precoMeia);
    });
  
    bebidasSelecionadas.forEach((bebidaSelecionada) => {
      const nomeBebida = bebidaSelecionada.querySelector(".nome").innerHTML;
      const precoBebida = formatarPreco(bebidaSelecionada);
      nomeBebidas.push(nomeBebida);
      precosBebidas.push(precoBebida);
    });
  
    sobremesasSelecionadas.forEach((sobremesaSelecionada) => {
      const nomeSobremesa = sobremesaSelecionada.querySelector(".nome").innerHTML;
      const precoSobremesa = formatarPreco(sobremesaSelecionada);
      nomeSobremesas.push(nomeSobremesa);
      precosSobremesas.push(precoSobremesa);
    });
  
    const precoTotal = (
      precosPratos.reduce((acc, curr) => acc + curr, 0) +
      precosMeias.reduce((acc, curr) => acc + curr, 0) +
      precosBebidas.reduce((acc, curr) => acc + curr, 0) +
      precosSobremesas.reduce((acc, curr) => acc + curr, 0)
    ).toFixed(2);
  
    pedido = {
      nomePratos,
      nomeMeias,
      nomeBebidas,
      nomeSobremesas,
      precosPratos,
      precosMeias,
      precosBebidas,
      precosSobremesas,
      precoTotal,
    };
  
    return pedido;
  }
  
    
    function confirmaPedido() {
      document.querySelector(".tela-de-confirmacao").classList.remove("nenhuma-selecao");
      mostraItensDoPedido();
    }
    
    function mostraItensDoPedido() {
      const {
        nomePratos,
        nomeMeias,
        nomeBebidas,
        nomeSobremesas,
        precosPratos,
        precosBebidas,
        precosSobremesas,
        precoTotal,
      } = fechandoPedido();
    
      const itensDoPedido = document.querySelector(".itens-confirmacao");
      itensDoPedido.innerHTML = "";
    
      nomePratos.forEach((nomePrato, index) => {
        const precoPrato = precosPratos[index].toFixed(2);
        const itemPratoHTML = `
          <li class="item">
            <h6 class="nome">${nomePrato}</h6>
            <h6 class="preco">${precoPrato}</h6>
          </li>
        `;
        itensDoPedido.innerHTML += itemPratoHTML;
      });

      nomeMeias.forEach((nomeMeia, index) => {
        const precoMeia = precoMeia[index].toFixed(2);
        const itemMeiaHTML = `
          <li class="item">
            <h6 class="nome">${nomeMeia}</h6>
            <h6 class="preco">${precoMeia}</h6>
          </li>
        `;
        itensDoPedido.innerHTML += itemMeiaHTML;
      });
    
      nomeBebidas.forEach((nomeBebida, index) => {
        const precoBebida = precosBebidas[index].toFixed(2);
        const itemBebidaHTML = `
          <li class="item">
            <h6 class="nome">${nomeBebida}</h6>
            <h6 class="preco">${precoBebida}</h6>
          </li>
        `;
        itensDoPedido.innerHTML += itemBebidaHTML;
      });
    
      nomeSobremesas.forEach((nomeSobremesa, index) => {
        const precoSobremesa = precosSobremesas[index].toFixed(2);
        const itemSobremesaHTML = `
          <li class="item">
            <h6 class="nome">${nomeSobremesa}</h6>
            <h6 class="preco">${precoSobremesa}</h6>
          </li>
        `;
        itensDoPedido.innerHTML += itemSobremesaHTML;
      });
    
      const totalHTML = `
        <li class="item total">
          <h5 class="total-texto">TOTAL</h5>
          <h5 class="total-valor">R$ ${precoTotal}</h5>
        </li>
      `;
      itensDoPedido.innerHTML += totalHTML;
    }
    
    function enviaPedido() {
      const { nomePratos, nomeMeias, nomeBebidas, nomeSobremesas, precoTotal } = fechandoPedido();
    
      const mensagemDoPedido = `Olá, gostaria de fazer o pedido: \n
          - Prato(s): ${nomePratos.join(", ")} \n
          - Meia(s): ${nomeMeias.join(", ")} \n
          - Bebida(s): ${nomeBebidas.join(", ")} \n
          - Sobremesa(s): ${nomeSobremesas.join(", ")} \n
          Total: R$ ${precoTotal}`;
    
      const linkWhatsApp = `https://wa.me/5561983473566?text=${encodeURIComponent(
        mensagemDoPedido
      )}`;
    
      window.open(linkWhatsApp);
    }
    
    function cancelaPedido() {
      document
        .querySelector(".tela-de-confirmacao")
        .classList.add("nenhuma-selecao");
    
      const finalizarPedido = document.querySelector("footer");
    
      finalizarPedido.firstElementChild.classList.remove("escondido");
      finalizarPedido.lastElementChild.classList.add("escondido");
    
      let itensEscolhidos = document.querySelectorAll(".escolhido");
    
      itensEscolhidos.forEach((item) => {
        item.classList.remove("escolhido");
      });
    }