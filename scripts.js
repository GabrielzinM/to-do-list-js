const button = document.querySelector(".button-ad-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = [];

function AdicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false
  })

  input.value = ''

  mostrarTarefas();
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

  listaCompleta.innerHTML = novaLi

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
