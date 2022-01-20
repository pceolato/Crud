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

    
document.getElementById('cadastrarCliente')
    .addEventListener('click', Modal.openModal)

document.getElementById('modalClose')
    .addEventListener('click', Modal.closeModal)

document.getElementById('cancelar')
    .addEventListener('click', Modal.closeModal)


