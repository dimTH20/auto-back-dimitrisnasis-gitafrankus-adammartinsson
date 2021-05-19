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
            method:'DELETE',
            url: 'http://localhost:3000/api/room/5',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))
})


})


