/// <reference types="Cypress" />

describe('Test suite', () => {

    it('TC1 Invalid Login, POST request to api/login', () => {

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/login',
            failOnStatusCode: false,
            headers: {
                'Content-Type':'application/json'
            },
            body: {
                'username':'tester01',
                'password':'tester01'
            }
        
        }).then((response => {
            expect(response.status).to.eq(401)
            cy.log(JSON.stringify(response.status))

            const errormessage = JSON.stringify(response.body)
            expect(errormessage).to.equal('{"error":"Bad username or password"}')
            cy.log(errormessage)
        }))

    })

    it('TC2 Valid Login, POST request to /api/login', () => {
        cy.authenticate()
    })

    it('TC3 Logout, POST request to /api/logout', () => {
        cy.logout()

    })

    it('TC4 Create Room, POST request to /api/room/new', () => {
        cy.authenticate().then((response => {
            cy.request({
                method:'POST',
                url: 'http://localhost:3000/api/room/new',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "features":["balcony"],"category":"double","number":"103","floor":"3","available":true,"price":"123"
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        }))

       cy.logout()

    })


it('TC5 Delete Room, DELETE request to /api/room/:id', () => {
    cy.authenticate().then((response =>  {
        cy.request({
            method:'POST',
            url: 'http://localhost:3000/api/room/new',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                "features":["balcony"],"category":"double","number":"103","floor":"3","available":true,"price":"123"
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
            Cypress.env({newRoomID:response.body.id})  //adds global variable to store the new room id in newRoomID
            cy.log(JSON.stringify(Cypress.env().newRoomID))
        })),
        // NOTE THE COMMA AT THE END OF LINE ABOVE

        cy.log(JSON.stringify(Cypress.env().newRoomID))
     
        cy.request({
            method:'DELETE',
            url: 'http://localhost:3000/api/room/' + JSON.stringify(Cypress.env().newRoomID),  // add the new room id (stringifyed) to the endpoint
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    
    }))
    cy.logout()
})



it('TC6 Create Client, POST request to /api/client/new', () => {
    cy.authenticate().then((response => {
        cy.request({
            method:'POST',
            url: 'http://localhost:3000/api/client/new',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                'name':'stefan','email':'stefan@mail.com','telephone':'0700000000'
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))

   cy.logout()

})


it('TC7 Delete Client, DELETE request to /api/client/:id', () => {
    cy.authenticate().then((response =>  {
        cy.request({
            method:'POST',
            url: 'http://localhost:3000/api/client/new',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                'name':'stefan','email':'stefan@mail.com','telephone':'0700000000'
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
            Cypress.env({newClientID:response.body.id})  //adds global variable to store the new client id in newClientID
            cy.log(JSON.stringify(Cypress.env().newClientID))
        })),
        // NOTE THE COMMA AT THE END OF LINE ABOVE

        cy.log(JSON.stringify(Cypress.env().newClientID))
     
        cy.request({
            method:'DELETE',
            url: 'http://localhost:3000/api/client/' + JSON.stringify(Cypress.env().newClientID),  // add the new client id (stringifyed) to the endpoint
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    
    }))
    cy.logout()
})


it('TC8 Create Bill, POST request to /api/bill/new', () => {
    cy.authenticate().then((response => {
        cy.request({
            method:'POST',
            url: 'http://localhost:3000/api/bill/new',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                'value':'120','paid':true
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))

            Cypress.env({newBillID:response.body.id})  //adds global variable to store the new bill id in newBillID
            cy.log(JSON.stringify(Cypress.env().newBillID))

        }))
    }))

   cy.logout()

})


it('TC9 Edit Bill, PUT request to /api/bill/:id', () => {

    //########################
    // lägg ID som 0 på Cypress.env().newBillID  för att kunna köra koden oberoende från tidigare TC (men kommer ge problem ändå, kanske ska man ta reda på vad som finns i listan med GET för att sen ta reda på ID)
    cy.authenticate().then((response => {
        cy.request({
            method:'PUT',
            url: 'http://localhost:3000/api/bill/' + JSON.stringify(Cypress.env().newBillID),
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                "value":"100","paid":true,"id":2,"created":"2021-05-16T12:27:00.279Z"
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))

   cy.logout()

})



it('TC10 Delete Bill, DELETE request to /api/bill/:id', () => {
    cy.authenticate().then((response =>  {

        cy.request({
            method:'GET',
            url: 'http://localhost:3000/api/bills',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
            Cypress.env({newBillID:response.body.id})  //adds global variable to store the new bill id in newBillID
            cy.log(JSON.stringify(Cypress.env().newBillID))
        })),


        cy.request({
            method:'POST',
            url: 'http://localhost:3000/api/bill/new',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                'value':'120','paid':true
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
            Cypress.env({newBillID:response.body.id})  //adds global variable to store the new bill id in newBillID
            cy.log(JSON.stringify(Cypress.env().newBillID))
        })),
        // NOTE THE COMMA AT THE END OF LINE ABOVE

        cy.log(JSON.stringify(Cypress.env().newBillID))
     
        cy.request({
            method:'DELETE',
            url: 'http://localhost:3000/api/bill/' + JSON.stringify(Cypress.env().newBillID),  // add the new bill id (stringifyed) to the endpoint
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    
    }))
    cy.logout()
})



})