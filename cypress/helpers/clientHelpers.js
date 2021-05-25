/// <reference types="Cypress" />

import * as targets from '../targets/targets'

//functions
function createClientPayload() {
    let clientPayload = {
        'name': targets.randomName,
        'email': targets.randomEmail,
        'telephone': targets.randomPhone
    }

    return clientPayload
}

function createClientRequest() {
    cy.request({
        method: 'POST',
        url: targets.newClientURL,
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
        url: targets.clientsURL, 
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
            url: targets.clientURL + lastID, 
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






//exports
module.exports = {
    createClientPayload,
    createClientRequest,
    deleteClientRequest
}