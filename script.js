'use strict'

const Modal = {
    openModal() {
        document.getElementById('modal')
    .classList.add('active')
    },
    closeModal() {
        document.getElementById('modal')
        .classList.remove('active')
        } 
    }

const tempClient = {
    nome:"Pedrinho",
    email:"pc@gmail.com",
    celular:"1198766543",
    cidade:"São Paulo"
}
// Crud - Create read update delete

const createClient = (client) => {
    const db_client = JSON.parse(localStorage.getItem('db_client'))
    console.log(db_client)
    db_client.push(client)
    localStorage.setItem("db_client", JSON.stringify(db_client))
}


document.getElementById('cadastrarCliente')
    .addEventListener('click', Modal.openModal)

document.getElementById('modalClose')
    .addEventListener('click', Modal.closeModal)

document.getElementById('cancelar')
    .addEventListener('click', Modal.closeModal)


