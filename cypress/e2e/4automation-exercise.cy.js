 /// <reference types="cypress" />

 /*
 HOOKS/ganchos:
    - before -> x antes de todos os testes
    - beforeEach -> antes de cada teste
    - after -> x depois de todos os testes
    - afterEach -> depois de cada teste

 */

import data from '../fixtures/example.json'
import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {
    beforeEach(() => {
        //cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()
    });

     it('Exemplos de log', () => {
        cy.log(`Nome do usuario: ${data.name}`)
        cy.fixture('imagem-exemplo.png').as('imagem')
       // cy.get('elemento').selectFile('@imagem')
        cy.log(`PGATS AUTOMAÇÃO WEB CONSOLE LOG`)
 }); 

    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()

        cy.get('[data-qa="signup-name"]').type(faker.internet.username())
        cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`)   
        //cy.get('[data-qa="signup-button"]').click()
        cy.contains('button','Signup').click()

        //duas fornmas de capturar - radio ou checkboxes -> check
        //cy.get('input[type=radio]').check('Mrs.')
        cy.get('#id_gender2').check()
        cy.get('input#password').type('12345', {log: false})

        //para comboboxes ou selects -> select
        cy.get('select[data-qa=days]').select('7')
        cy.get('[data-qa=months]').select('June')
        cy.get('[data-qa=years]').select('1994')

        //cy.get('input#first_name').type('Tester')
        cy.get('input#first_name').type(faker.person.firstName());
        cy.get('input#last_name').type(faker.person.lastName());
        cy.get('input#company').type('PGATS')
        cy.get('input#address1').type(faker.location.streetAddress());
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state());
        cy.get('input#city').type(faker.location.city());
        cy.get('input#zipcode').type(faker.location.zipCode());
        cy.get('[data-qa="mobile_number"]').type(faker.phone.number());
        
        cy.get('[data-qa="create-account"]').click()

        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
    }); 

    it('Login com Sucesso', () => {

        cy.get('[data-qa="login-email"]').type('testesucesso@teste.com')
        cy.get('[data-qa="login-password"]').type('12345', {log: false})   
        cy.get('[data-qa="login-button"]').click()
 
        cy.contains('b', 'qa tester')
        cy.get(':nth-child(10) > a').should('contain', 'Logged in as qa tester');

        });

        it('Login Inválido', () => {

        cy.get('[data-qa="login-email"]').type('testesucesso@teste.com')
        cy.get('[data-qa="login-password"]').type('123457', {log: false})   
        cy.get('[data-qa="login-button"]').click()
 
        
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');

        });

        it('Logout', () => {

        cy.get('[data-qa="login-email"]').type('testesucesso@teste.com')
        cy.get('[data-qa="login-password"]').type('12345', {log: false})   
        cy.get('[data-qa="login-button"]').click()
 
        cy.get('a[href="/logout"]').click()

        cy.get('h2').should('contain', 'Login to your account');
        cy.url().should('includes', 'login')

        });

        it('Cadastro de e-mail existente', () => {

        cy.get('[data-qa="signup-name"]').type('Email Já Existente')
        cy.get('[data-qa="signup-email"]').type('testesucesso@teste.com')   
        cy.contains('button','Signup').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
        cy.url().should('includes', 'signup')

        });
        it('Envio de formulário com upload de arquivo', () => {

        cy.get('a[href="/contact_us"]').click()

        cy.get('[data-qa="name"]').type(data.name)
        cy.get('[data-qa="email"]').type(data.email) 
        cy.get('[data-qa="subject"]').type(data.subject)   
        cy.get('[data-qa="message"]').type(data.message) 

        cy.fixture('imagem-exemplo.png').as('imagem')
        cy.get('input[type=file]').selectFile('@imagem')
        
        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status')
        .should('contain.text', 'Success! Your details have been submitted successfully.');

        });
});

//describe ou context -> agrupar testes
//it -> testes em si