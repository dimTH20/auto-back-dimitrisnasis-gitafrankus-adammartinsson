/// <reference types="Cypress" />

import * as targets from '../targets/targets'

//functions
function createRoomPayload() {
    let roomPayload = {
        "features": ["balcony"], 
        "category": "double", 
        "number": targets.randomNumber1, 
        "floor": targets.randomNumber2, 
        "available": true, 
        "price": targets.randomNumber3
    }

    return roomPayload
}

function createRoomRequest() {
    cy.request({
        method: 'POST',
        url: targets.newRoomURL,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: createRoomPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
        cy.log(JSON.stringify(response.body.id))
    }))

}


function deleteRoomRequest() {
    cy.request({
        method: 'GET', 
        url: targets.roomsURL, 
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
            url: targets.roomURL + lastID,  
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
    createRoomPayload,
    createRoomRequest,
    deleteRoomRequest

}