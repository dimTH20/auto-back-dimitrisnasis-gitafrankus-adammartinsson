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
        body: createClientPayload
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}


function deleteClientRequest() {
    cy.request({
        method: 'GET', 
        url: 'http://localhost:3000/api/clients', 
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }
    }).then((response =>{
        expect(response.status).to.eq(200)
        let lastID = response.body[response.body.length -1].id
        cy.log(lastID)

        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/api/client/' + lastID, 
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))
}


function performLogout() {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/logout',
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
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