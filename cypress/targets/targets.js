/// <reference types="Cypress" />

const faker = require('faker');

let generatedNumber1 = faker.datatype.number();
let generatedNumber2 = faker.datatype.number();
let generatedNumber3 = faker.datatype.number();
let generatedName = faker.name.firstName();
let generatedEmail = faker.internet.email();
let generatedPhoneNumber = faker.phone.phoneNumber();

//correct login data
let loginData = {
    "username": "tester01",
    "password": "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
}

module.exports = {

    //url list
    baseURL: 'http://localhost:3000/',
    loginURL: 'http://localhost:3000/api/login',
    newRoomURL: 'http://localhost:3000/api/room/new',
    roomsURL: 'http://localhost:3000/api/rooms',
    roomURL: 'http://localhost:3000/api/room/',
    newClientURL: 'http://localhost:3000/api/client/new',
    clientsURL: 'http://localhost:3000/api/clients',
    clientURL: 'http://localhost:3000/api/client/',
    logoutURL: 'http://localhost:3000/api/logout',
    newBillURL: 'http://localhost:3000/api/bill/new',
    billsURL: 'http://localhost:3000/api/bills',
    billURL: 'http://localhost:3000/api/bill/',
    logoutURL: 'http://localhost:3000/api/logout',

    //used in payload to create room
    randomNumber1: generatedNumber1,
    randomNumber2: generatedNumber2,
    randomNumber3: generatedNumber3,

    //use in payload to create client
    randomName: generatedName,
    randomEmail: generatedEmail,
    randomPhone: generatedPhoneNumber,

    //logindata
    correctLogin: loginData

}