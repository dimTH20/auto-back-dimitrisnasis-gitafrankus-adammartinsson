/// <reference types="Cypress" />


//functions
function createBillPayload() {
    let billsPayload = {
        'value': '120', 'paid': true
    }
    return billsPayload
}

function editBillPayload(id) {
    let billsPayload2 = {
        "value":"126","paid":true,"id":id,"created":"2021-05-25T10:08:13.198Z"
        }
    return billsPayload2
}

function createBillRequest() {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/bill/new',
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: createBillPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function editBillRequest() {
    cy.request({
        method: 'GET', 
        url: 'http://localhost:3000/api/bills', 
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }
    }).then((response =>{
        expect(response.status).to.eq(200)
        let lastID = response.body[response.body.length -1].id
        cy.log(lastID)
        cy.request({
            method: 'PUT',
            url: 'http://localhost:3000/api/bill/' + lastID,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: editBillPayload(lastID)
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))
}


function deleteBillRequest() {
    cy.request({
        method: 'GET', 
        url: 'http://localhost:3000/api/bills', 
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
            url: 'http://localhost:3000/api/bill/' + lastID,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))
}

//exports
module.exports = {
    createBillRequest,
    editBillRequest,
    deleteBillRequest
}