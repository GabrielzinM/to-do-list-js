const button = document.querySelector(".button-ad-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = [];

function AdicionarNovaTarefa() {
  const novaTarefa = input.value.trim();

  // Verifica se está vazio
  if (novaTarefa === "") {
    exibirAlerta("Digite algo antes de adicionar.", "erro");
    return;
  }

  // Verifica se já existe
  const existe = minhaListaDeItens.some(item => item.tarefa.toLowerCase() === novaTarefa.toLowerCase());
  if (existe) {
    exibirAlerta("Essa tarefa já foi adicionada.", "erro");
    return;
  }

  minhaListaDeItens.push({
    tarefa: novaTarefa,
    concluida: false
  });

  input.value = "";
  mostrarTarefas();
  exibirAlerta("Tarefa adicionada com sucesso!", "sucesso");
}

function exibirAlerta(mensagem, tipo) {
  const alerta = document.createElement("div");
  alerta.textContent = mensagem;
  alerta.className = `alerta alerta-${tipo}`;
  document.body.prepend(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 3000);
}

function mostrarTarefas() {
  let novaLi = ''

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi = novaLi + `

        <li class="task ${item.concluida && "done"}">
            <img src="./assests/img/checked.png" alt="checked-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./assests/img/lixo.png" alt="tarefa-para-lixo" onclick="deletarItem(${posicao})">
        </li>
        `
  })

  listaCompleta.innerHTML = novaLi;

  document.querySelectorAll(".task").forEach((el) => {
  el.classList.add("animar-tarefa");
});


  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function recarregarTarefas(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')


    if(tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    console.log(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener("click", AdicionarNovaTarefa);

function alternarModo() {
  document.body.classList.toggle("claro");

  const modoAtual = document.body.classList.contains("claro") ? "claro" : "escuro";
  localStorage.setItem("modo", modoAtual);

  atualizarIconeTema();
}

function atualizarIconeTema() {
  const icone = document.getElementById("icone-tema");
  const modoAtual = document.body.classList.contains("claro") ? "claro" : "escuro";

  icone.textContent = modoAtual === "claro" ? "🌞" : "🌙";
}

window.onload = () => {
  const modoSalvo = localStorage.getItem("modo");
  if (modoSalvo === "claro") {
    document.body.classList.add("claro");
  }

  atualizarIconeTema();
};


// Carrega o modo salvo
window.onload = () => {
  const modoSalvo = localStorage.getItem("modo");
  if (modoSalvo === "claro") {
    document.body.classList.add("claro");
  }
};
