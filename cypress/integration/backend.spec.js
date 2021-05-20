/// <reference types="Cypress" />

describe('Test suite', () => {

    it('TC1 Invalid Login', () => {

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/login',
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                'username': 'tester01',
                'password': 'tester01'
            }

        }).then((response => {
            expect(response.status).to.eq(401)
            cy.log(JSON.stringify(response.status))

            const errormessage = JSON.stringify(response.body)
            expect(errormessage).to.equal('{"error":"Bad username or password"}')
            cy.log(errormessage)
        }))

    })


    it('TC2 Valid Login', () => {
        cy.authenticate()
    })


    it('TC3 Logout', () => {
        cy.logout()

    })


    it('TC4 Create Room', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/room/new',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "features": ["balcony"], "category": "double", "number": "103", "floor": "3", "available": true, "price": "123"
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        }))

        cy.logout()

    })


    it('TC5 Delete Room', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/room/new',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "features": ["balcony"], "category": "double", "number": "103", "floor": "3", "available": true, "price": "123"
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                let newRoomID = response.body.id  //adds local variable to store the new room id in newRoomID
                cy.log(newRoomID)

                cy.request({
                    method: 'DELETE',
                    url: 'http://localhost:3000/api/room/' + newRoomID,  // add the new room id to the endpoint
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


    it('TC6 Create Client', () => {
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