/// <reference types="Cypress" />

//functions
function performInvalidLogin() {
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
}

//exports
module.exports = {
    performInvalidLogin

}