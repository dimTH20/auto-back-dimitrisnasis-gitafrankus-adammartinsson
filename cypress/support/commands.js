// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import * as targets from '../targets/targets'

Cypress.Commands.add('authenticate', () => {
    const USER_CREDENTIALS = targets.correctLogin

    cy.request({
        method: 'POST',
        url: targets.loginURL,
        headers: {
            'Content-Type': 'application/json'
        },
        body: USER_CREDENTIALS
    }).then((response => {
        expect(response.status).to.eq(200)
        Cypress.env({loginToken:response.body}) 
        cy.log(response.body)
    }))
})

Cypress.Commands.add('logout', () => {
    cy.request({
        method: 'POST',
        url: targets.logoutURL,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
})