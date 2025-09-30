(() => {
  let itens = JSON.parse(localStorage.getItem("listaDeCompras")) || [];
  const form = document.getElementById("formulario");
  const inputNome = document.getElementById("item");
  const inputPreco = document.getElementById("preco");
  const inputQuantidade = document.getElementById("quantidade");
  const tabela = document.querySelector("#tabela tbody");
  const btnLimpar = document.getElementById("limpar");
  const inputCategoria = document.getElementById("categoria");
  const inputLote = document.getElementById("lote");
  const inputValidade = document.getElementById("validade");

//salvar dados
  function salvarItens(){
    localStorage.setItem("listaDeCompras", JSON.stringify(itens));
  }

//renderizar
  function render() {
    if(tabela) {
    tabela.innerHTML = "";
    itens.forEach((item, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.quantidade}</td>
        <td>R$ ${parseFloat(item.preco).toFixed(2)}</td>
        <td>${item.categoria}</td>
        <td>${item.lote}</td>
        <td>${new Date(item.validade).toLocaleDateString("pt-BR")}</td>
        <td>
          <button class="bg-editar text-texto rounded-lg px-3 py-1 font-texto editar" data-index="${i}">Editar</button>
          <button class="bg-excluir text-texto rounded-lg px-3 py-1 font-texto excluir" data-index="${i}">Excluir</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
  }
  }

//botões
if (tabela){
tabela.addEventListener("click", (e) => {
    if (e.target.classList.contains("excluir")) {
      const index = e.target.dataset.index;
      if (confirm("Tem certeza que deseja excluir este item?")) {
        itens.splice(index, 1);
        salvarItens();
        render();
      }
    }

    if (e.target.classList.contains("editar")) {
      const index = e.target.dataset.index;
      const item = itens[index];

      const novoNome = prompt("Edite o nome:", item.nome);
      if (novoNome === null || novoNome.trim() === "") return;

      const novaQuantidade = prompt("Edite a quantidade:", item.quantidade);
      if (novaQuantidade === null || novaQuantidade.trim() === "" || isNaN(novaQuantidade)) return;

      const novoPreco = prompt("Edite o preço:", item.preco);
      if (novoPreco === null || novoPreco.trim() === "" || isNaN(novoPreco)) return;

      const novoCategoria = prompt("Edite a categoria:", item.categoria);
      if (novoCategoria === null || novoCategoria.trim() === "") return;

      const novoLote = prompt("Edite o lote:", item.lote);
      if (novoLote === null || novoLote.trim() === "") return;

      const novoValidade = prompt("Edite a validade:", item.validade);
      if (novoValidade === null || novoValidade.trim() === "") return;

      itens[index] = {
        nome: novoNome.trim(),
        preco: parseFloat(novoPreco).toFixed(2),
        quantidade: parseInt(novaQuantidade),
        categoria: novoCategoria.trim(),
        lote: novoLote.trim(),
        validade: novoValidade.trim()
      };
      salvarItens();
      render();
    }
  });
}
//adicionar
  if (form){
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = inputNome.value.trim();
    const quantidade = inputQuantidade.value.trim();
    const preco = inputPreco.value.trim();
    const categoria = inputCategoria.value.trim();
    const lote = inputLote.value.trim();
    const validade = inputValidade.value.trim();

    if (!nome || !quantidade || !preco || !categoria || !lote || !validade) return;

    itens.push({ nome, quantidade: parseInt(quantidade), preco: parseFloat(preco).toFixed(2), categoria, lote, validade });

    salvarItens();

    form.reset();
  
  });
}

//limpar
if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {
    itens.length = 0;
    salvarItens();
    render();

  });
}
  render();
})();

