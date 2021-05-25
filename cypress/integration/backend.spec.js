/// <reference types="Cypress" />

import * as login from '../helpers/loginHelpers'
import * as room from '../helpers/roomHelpers'
import * as client from '../helpers/clientHelpers'


describe('Test suite', () => {

    it('TC1 Invalid Login', () => {
        login.performInvalidLogin()
    })


    it('TC2 Valid Login', () => {
        cy.authenticate()
    })


    it('TC3 Logout', () => {
        cy.logout()
    })


    it('TC4 Create Room', () => {
        cy.authenticate().then((response => {
            room.createRoom()
        }))

        cy.logout()
    })


    it('TC5 Delete Room', () => {
        cy.authenticate().then((response => {
            room.createRoom()
            room.deleteRoom(Cypress.env().newRoomID)
        }))
        cy.logout()
    })


    it('TC6 Create Client', () => {

        /*
        cy.authenticate().then((response => {
        client.createClientRequest()
        client.deleteClientRequest(cypress.env().lastID)  // alternativt, skapa en getLastClientRequest()
        client.performLogout()
    }))
    
    */

        cy.authenticate().then((response => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/client/new',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    'name': 'stefan', 'email': 'stefan@mail.com', 'telephone': '0700000000'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        }))

        cy.logout()

    })


    it('TC7 Delete Client', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/client/new',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    'name': 'stefan', 'email': 'stefan@mail.com', 'telephone': '0700000000'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                let newClientID = response.body.id
                cy.log(newClientID)

                cy.request({
                    method: 'DELETE',
                    url: 'http://localhost:3000/api/client/' + newClientID,
                    headers: {
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                        'Content-Type': 'application/json'
                    },
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))
        }))
        cy.logout()
    })


    it('TC8 Create Bill', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/bill/new',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    'value': '120', 'paid': true
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        }))
        cy.logout()
    })


    it('TC9 Edit Bill', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/bill/new',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    'value': '120', 'paid': true
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))

                let newBillID = response.body.id
                cy.log(newBillID)
                cy.request({
                    method: 'PUT',
                    url: 'http://localhost:3000/api/bill/' + newBillID,
                    headers: {
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "value": "100", "paid": true, "id": newBillID, "created": "2021-05-16T12:27:00.279Z"
                    }
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))

            }))
        }))
        cy.logout()
    })


    it('TC10 Delete Bill', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/bill/new',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    'value': '120', 'paid': true
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))

                let newBillID = response.body.id
                cy.log(newBillID)
                cy.request({
                    method: 'DELETE',
                    url: 'http://localhost:3000/api/bill/' + newBillID,
                    headers: {
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                        'Content-Type': 'application/json'
                    }
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))

            }))
        }))
        cy.logout()
    })

})