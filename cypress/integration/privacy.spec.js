/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT - Privacy', function() {
    beforeEach(function() {
        cy.visit('./src/privacy.html')
    })
 
    it.only('Talking About Testing', () => {
        
        cy.contains('Talking About Testing').should('be.visible')
    })

})