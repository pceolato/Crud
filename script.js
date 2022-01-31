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

const getStorage = () =>  JSON.parse(localStorage.getItem('db_client')) ?? []   
const setStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

const tempClient = {
    nome: "Pedro",
    email: "pc@gmail.com",
    celular: "1198766543",
    cidade: "São Paulo"
}

// Crud - Create read update delete

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setStorage(dbClient)
}

//crud - UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorange(dbClient)
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

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,

        }
        createClient(client)
        Modal.closeModal()
    }
}

const creatRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green">Editar</button>
        <button type="button" class="button red">Excluir</button> 
    </td>`
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const updateTable = () => {
    const dbClient = readClient()
    dbClient.forEach(creatRow)
}

updateTable ()

//eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', Modal.openModal)

document.getElementById('modalClose')
    .addEventListener('click', Modal.closeModal)

document.getElementById('cancelar')
    .addEventListener('click', Modal.closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

