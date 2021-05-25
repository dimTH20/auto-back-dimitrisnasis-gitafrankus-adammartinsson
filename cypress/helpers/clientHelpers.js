/// <reference types="Cypress" />

const faker = require('faker')
//functions
function createClientPayload() {
    let clientPayload = {
        'name': faker.name.firstName(), 
        'email': faker.internet.email(), 
        'telephone': faker.phone.phoneNumber()
    }

    return clientPayload
}

function createClientRequest() {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/client/new',
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: createClientPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        Cypress.env({lastID:response.body.id})
       // cy.log(JSON.stringify(response.body))
    }))
}

function deleteClientRequest(ClientID) {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/client/' + ClientID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        expect(response.status).to.eq(200)
      //  cy.log(JSON.stringify(response.body))
    }))
}
function performLogout() {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/logout',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        //cy.log(JSON.stringify(response.body))
    }))
}



//exports
module.exports = {
    createClientPayload,
    createClientRequest,
    deleteClientRequest,
    performLogout
}