Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Carlos')
    cy.get('#lastName').type('Sierra')
    cy.get('#email').type('cassiso91@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
} )