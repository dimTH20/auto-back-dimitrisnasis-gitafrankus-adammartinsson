/// <reference types="Cypress" />


//functions
function createRoomPayload() {
    let roomPayload = {
        "features": ["balcony"], 
        "category": "double", 
        "number": "103", 
        "floor": "3", 
        "available": true, 
        "price": "123"
    }

    return roomPayload
}

function createRoom() {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/room/new',
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: createRoomPayload()
    }).then((response => {
        expect(response.status).to.eq(200)

        Cypress.env({newRoomID:response.body.id})
        cy.log(Cypress.env().newRoomID)

        cy.log(JSON.stringify(response.body))

    }))
}


function deleteRoom(roomID) {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/room/' + roomID,  // add the new room id to the endpoint
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

//exports
module.exports = {
    createRoomPayload,
    createRoom,
    deleteRoom

}