// ---------------- CARDS DE CIMA ----------------

const dividas = document.querySelector("#dividas");
const pParcela = document.querySelector("#pParcela");

dividas.textContent = "R$ 0,00";
pParcela.textContent = "R$ 0,00";


// ---------------- ENTRADAS SALVAS ----------------

let entradas = JSON.parse(localStorage.getItem("entradas")) || [];


// ---------------- ENTRADAS ----------------

const totalEntradas = document.querySelector("#valor-total-de-entradas");
const painelEntradas = document.querySelector(".painel");

function atualizarTotalEntradas() {

    const valoresEntradas = document.querySelectorAll(".valor-entrada");

    let total = 0;

    valoresEntradas.forEach((entrada) => {
        total += Number(entrada.textContent);
    });

    totalEntradas.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    return total;
}

// ---------------- SALDO ----------------


// ---------------- SALDO ----------------

const totalSaldo = document.querySelector("#valor-total-de-saldo");

function atualizarTotalSaldo() {

    const valorEntradas = atualizarTotalEntradas();

    const valorDividas = 0;

    const total = valorEntradas - valorDividas;

    totalSaldo.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    return total;
}


// ---------------- SALVAR ENTRADAS ----------------

function salvarEntradas() {

    localStorage.setItem("entradas", JSON.stringify(entradas));

}


// ---------------- CRIAR ENTRADA NA TELA ----------------

function criarEntrada(nome, valor) {

    const novaEntrada = document.createElement("div");

    novaEntrada.classList.add("box-geral");

    novaEntrada.innerHTML = `
        <div class="box-geral-esquerdo">

            <h4>${nome}</h4>

        </div>

        <div class="box-geral-direito">

            <p>
                R$
                <span class="valor-entrada">
                    ${valor}
                </span>
            </p>

            <div class="box-icone-lixeira">

                <img
                    class="icone-lixeira"
                    src="icons/lixeira.png"
                    alt=""
                >

            </div>

        </div>
    `;

    painelEntradas.appendChild(novaEntrada);

}


// ---------------- CARREGAR ENTRADAS SALVAS ----------------

function carregarEntradas() {

    entradas.forEach((entrada) => {

        criarEntrada(
            entrada.nome,
            entrada.valor
        );

    });

    atualizarTotalSaldo();

}


// ---------------- MODAL ----------------

const botaoNova = document.querySelector(".nova");

const modal = document.querySelector("#modal");

const botaoFechar = document.querySelector("#fechar-modal");

const botaoAdicionar = document.querySelector("#adicionar");

const inputNome = document.querySelector("#nome");

const inputValor = document.querySelector("#valor");

const selectTipo = document.querySelector("#tipo");


// ---------------- ABRIR MODAL ----------------

botaoNova.addEventListener("click", () => {

    modal.classList.add("ativo");

});


// ---------------- FECHAR MODAL ----------------

botaoFechar.addEventListener("click", () => {

    modal.classList.remove("ativo");

});


// ---------------- FECHAR CLICANDO FORA ----------------

modal.addEventListener("click", (evento) => {

    if (evento.target === modal) {

        modal.classList.remove("ativo");

    }

});


// ---------------- ADICIONAR ENTRADA ----------------

botaoAdicionar.addEventListener("click", () => {

    const nome = inputNome.value;
    const valor = Number(inputValor.value);

    if (nome === "" || valor <= 0) {

        alert("Preencha o nome e um valor válido.");

        return;

    }


    // adiciona no array
    entradas.push({
        nome: nome,
        valor: valor
    });


    // salva no navegador
    salvarEntradas();


    // cria na tela
    criarEntrada(nome, valor);


    // atualiza os valores
    atualizarTotalSaldo();


    // limpa os campos
    inputNome.value = "";
    inputValor.value = "";


    // fecha o modal
    modal.classList.remove("ativo");

});


// ---------------- BOTÃO DE REMOÇÃO ----------------

document.addEventListener("click", (evento) => {

    if (evento.target.classList.contains("icone-lixeira")) {

        const registro = evento.target.closest(".box-geral");


        // pega todas as entradas da tela
        const todosRegistros = [...document.querySelectorAll(".painel .box-geral")];

        // descobre qual foi clicado
        const indice = todosRegistros.indexOf(registro);


        // remove do array
        entradas.splice(indice, 1);


        // salva novamente
        salvarEntradas();


        // remove da tela
        registro.remove();


        // atualiza total e saldo
        atualizarTotalSaldo();

    }

});


// ---------------- CARREGAR AO ABRIR A PÁGINA ----------------

carregarEntradas();