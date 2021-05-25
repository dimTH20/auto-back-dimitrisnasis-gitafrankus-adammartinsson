/// <reference types="Cypress" />

import * as login from '../helpers/loginHelpers'
import * as room from '../helpers/roomHelpers'
import * as client from '../helpers/clientHelpers'
import * as bill from '../helpers/billHelpers'


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
            room.deleteRoom()
        }))
        cy.logout()
    })


    it('TC6 Create Client', () => {
        cy.authenticate().then((response => {
            client.createClientRequest()
        }))
        cy.logout()
    })


    it('TC7 Delete Client', () => {
        cy.authenticate().then((response => {
            client.createClientRequest()
            client.deleteClientRequest()
        }))
        cy.logout()
    })


    it('TC8 Create Bill', () => {
        cy.authenticate().then((response => {
            bill.createBillRequest()
        }))
        cy.logout()
    })


    it('TC9 Edit Bill', () => {
        cy.authenticate().then((response => {
            bill.createBillRequest()
            bill.editBillRequest()
        }))
        cy.logout()
    })


    it('TC10 Delete Bill', () => {
        cy.authenticate().then((response => {
            bill.createBillRequest()
            bill.deleteBillRequest()
        }))
        cy.logout()
    })

})