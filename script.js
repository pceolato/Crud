'use strict'

const Modal = {
    openModal() {
        document.getElementById('modal')
    .classList.add('active')
    },
    closeModal() {
        clearFields()
        document.getElementById('modal')
        .classList.remove('active')
        } 
    }

//pegar e definir documento
const getStorage = () =>  JSON.parse(localStorage.getItem('db_client')) ?? []   
const setStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// Crud - Create read update delete
// Crud - DELETE
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setStorage(dbClient)
}

//crud - UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setStorage(dbClient)
}

// Crud - READ
const readClient = () => getStorage()

// Crud - CREATE
const createClient = (client) => {
    const dbClient = getStorage()
    dbClient.push(client)
    setStorage(dbClient)
}   

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

//salvar cliente
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,

        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            Modal.closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            Modal.closeModal()
        }   
    }
}

//criar as linhas da tabela
const creatRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}" >Editar</button>
        <button type="button" class="button red" id="delete-${index}" >Excluir</button> 
    </td>`
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}


//limpar as linhas para o update de uma nova
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

//criar linha com dados
const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(creatRow)
}

//prencher os campos
const fillFields = (client) => {  
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

//abrir modal para editar
const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    Modal.openModal()
}

//editar e deletar cliente
const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o(a) cliente ${client.nome}`)
            if (response) {
            deleteClient(index)
            updateTable()
            }
        }
    } 
}

updateTable()

//eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', Modal.openModal)

document.getElementById('modalClose')
    .addEventListener('click', Modal.closeModal)

document.getElementById('cancelar')
    .addEventListener('click', Modal.closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)
document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)
