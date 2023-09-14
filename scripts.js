/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/


const getList = async () => {
  let url = 'http://127.0.0.1:5000/medicamentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.medicamentos.forEach(item => insertList(item.medicine, item.posology, item.doctor,  item.specialty,))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/


const postItem = async (inputMedicine, inputPosology, inputDoctor, inputSpecialty) => {
  const formData = new FormData();
  formData.append('medicine', inputMedicine);
  formData.append('posology', inputPosology);
  formData.append('doctor', inputDoctor);
  formData.append('specialty', inputSpecialty);
  
  let url = 'http://127.0.0.1:5000/medicamento';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de exclusão para cada item da lista
  --------------------------------------------------------------------------------------
*/


const insertButton = (parent) => {
  let span = document.createElement("button");
  let txt = document.createTextNode("x");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista clicando no botão Excluir
  --------------------------------------------------------------------------------------
*/


const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que deseja excluir esse medicamento?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Medicamento excluído!")
      }
    }
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/


const deleteItem = (item) => {
  console.log(item)
  let url = 'http://localhost:5000/medicamento?medicine=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo medicamento, posologia, médico(a) e especialidade
  --------------------------------------------------------------------------------------
*/


const newItem = () => {
  let inputMedicine = document.getElementById("newMedicine").value;
  let inputPosology = document.getElementById("newPosology").value;
  let inputDoctor = document.getElementById("newDoctor").value;
  let inputSpecialty = document.getElementById("newSpecialty").value;

  if (inputMedicine === ''){ 
    alert("Escreva o nome de um medicamento!");
    
  } if (inputPosology === ''){ 
    alert("Descreva como utilizar a medicação!");
   
  } if (inputDoctor === ''){
    alert("Escreva o nome do(a) médico(a)!");
    
  } if (inputSpecialty === ''){
    alert("Escreva uma especialidade!");
    
  } else {
    postItem(inputMedicine, inputPosology, inputDoctor, inputSpecialty)
    insertMedicine(inputMedicine, inputPosology, inputDoctor, inputSpecialty)
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para exibir medicamentos na lista apresentada
  --------------------------------------------------------------------------------------
*/


 const insertList = (medicine, posology, medic, specialty) => {
  var table = document.getElementById('myTable');
  var item = [medicine, posology, medic, specialty];
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1));
  document.getElementById("newMedicine").value = "";
  document.getElementById("newPosology").value = "";
  document.getElementById("newDoctor").value = "";
  document.getElementById("newSpecialty").value = "";

  removeElement();
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir medicamento na lista apresentada
  --------------------------------------------------------------------------------------
*/

const insertMedicine = (medicine, posology, medic, specialty) => {
  var table = document.getElementById('myTable');
  
  // Verifica se já existe um medicamento com o mesmo nome na lista
  if (isMedicineAlreadyInList(table, medicine)) {
    alert("Esse medicamento já está na lista.");
    return; // Não adiciona o medicamento se já existir
  }

  var item = [medicine, posology, medic, specialty];
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1));
  document.getElementById("newMedicine").value = "";
  document.getElementById("newPosology").value = "";
  document.getElementById("newDoctor").value = "";
  document.getElementById("newSpecialty").value = "";

  removeElement();
  alert("Medicamento inserido")
}


/*
  --------------------------------------------------------------------------------------
   Função para verificar se o medicamento já está na lista
  --------------------------------------------------------------------------------------
*/


const isMedicineAlreadyInList = (table, medicine) => {
  var rowCount = table.rows.length;
  for (var i = 1; i < rowCount; i++) { // Começando de 1 para ignorar o cabeçalho
    var row = table.rows[i];
    var existingMedicine = row.cells[0].textContent.toLowerCase(); // Converte para letras minúsculas

    if (existingMedicine === medicine.toLowerCase()) {
      return true; // O medicamento já está na lista
    }
  }
  return false; // O medicamento não está na lista
}


/*
  --------------------------------------------------------------------------------------
  Função para rolar suavemente de volta ao topo da página
  --------------------------------------------------------------------------------------
*/


function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}


/*
  --------------------------------------------------------------------------------------
  Função para limpar a tabela (não exclui do banco de dados)
  --------------------------------------------------------------------------------------
*/

function clsList() {
  var rowCount = myTable.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    myTable.deleteRow(i);
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para exibir a lista de medicamentos sem repetí-la
  --------------------------------------------------------------------------------------
*/


function shwList() {
  var rowCount = myTable.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    myTable.deleteRow(i);
  }
  getList()
  }


/*
  --------------------------------------------------------------------------------------
  Função para buscar medicamento
  --------------------------------------------------------------------------------------
*/


const searchMedicine = () => {
  let srchMedicine = document.getElementById("srchMedicine").value;
  if (srchMedicine === ''){ 
    alert("Escreva o nome de um medicamento!");
  } else {
    var rowCount = myTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
      myTable.deleteRow(i);
    }
    getMedicine(srchMedicine);
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para buscar medicamento via requisição GET
  --------------------------------------------------------------------------------------
*/


const getMedicine = async (srchMedicine) => {
  let url = `http://localhost:5000/medicamento?medicine=${srchMedicine}`;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.medicine) {
        insertList(data.medicine, data.posology, data.doctor, data.specialty);
      } else {
        alert("Nenhum medicamento encontrado.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Variável para rastrear o estado da lista (exibida ou oculta)
  --------------------------------------------------------------------------------------
*/


let isListVisible = false;


/*
  --------------------------------------------------------------------------------------
  Variável para rastrear o estado da pesquisa (exibida ou oculta)
  --------------------------------------------------------------------------------------
*/


let isSearchVisible = false;

/*
  --------------------------------------------------------------------------------------
  Variável para rastrear o estado de inserir Medicamento
  --------------------------------------------------------------------------------------
*/

let isInsertMedicineVisible = false;


/*
  --------------------------------------------------------------------------------------
  Função para alternar a exibição/ocultação da lista
  --------------------------------------------------------------------------------------
*/


function toggleList() {
    const listSection = document.querySelector(".items");
    const toggleListButton = document.getElementById("toggleListButton");

    if (isListVisible) {
        clsList(); // Chama a função para ocultar a lista
        toggleListButton.textContent = "Exibir Lista"; // Altera o texto do botão
    } else {
        shwList(); // Chama a função para exibir a lista
        toggleListButton.textContent = "Ocultar Lista"; // Altera o texto do botão
    }

    // Inverte o estado da lista
    isListVisible = !isListVisible;
}


/*
  --------------------------------------------------------------------------------------
  Função para alternar a exibição/ocultação da pesquisa
  --------------------------------------------------------------------------------------
*/



function toggleSearchBox() {
    const searchBox = document.getElementById("searchBox");
    const toggleSearchButton = document.getElementById("toggleSearchButton");

    if (isSearchVisible) {
        // Se a pesquisa estiver visível, oculta ela
        searchBox.style.display = "none";
        toggleSearchButton.textContent = "Pesquisar Medicamento";
    } else {
        // Se a pesquisa estiver oculta, exibe ela
        searchBox.style.display = "block";
        toggleSearchButton.textContent = "Ocultar Pesquisar Medicamento";
    }

    // Inverte o estado da pesquisa
    isSearchVisible = !isSearchVisible;
}


/*
  --------------------------------------------------------------------------------------
  Função para alternar a exibição/ocultação do formulário de inserção
  --------------------------------------------------------------------------------------
*/


function toggleInsertMedicine() {
    const insertMedicineForm = document.querySelector(".newItem");
    const insertMedicineButton = document.getElementById("insertMedicineButton");

    if (isInsertMedicineVisible) {
        insertMedicineForm.style.display = "none"; // Oculta o formulário de inserção
        insertMedicineButton.textContent = "Inserir Medicamento"; // Altera o texto do botão
    } else {
        insertMedicineForm.style.display = "block"; // Exibe o formulário de inserção
        insertMedicineButton.textContent = "Ocultar Inserir Medicamento"; // Altera o texto do botão
    }

    // Inverte o estado do formulário de inserção
    isInsertMedicineVisible = !isInsertMedicineVisible;
}
