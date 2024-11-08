/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, TesteTeste, TesteTeste, TesteTeste, TesteTeste, TesteTeste, Teste'
        cy.get('#firstName').type('Carlos')
        cy.get('#lastName').type('Sierra')
        cy.get('#email').type('cassiso91@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('Carlos')
        cy.get('#lastName').type('Sierra')
        cy.get('#email').type('cassiso91@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()       
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-nomérico', function(){
        cy.get('#phone')
          .type('abcdefij')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Carlos')
        cy.get('#lastName').type('Sierra')
        cy.get('#email').type('cassiso91@gmail.com')
        cy.get('#phone-checkbox').check ()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()       
        cy.get('.error').should('be.visible')        
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Carlos').should('have.value', 'Carlos').clear().should('have.value', '')
        cy.get('#lastName').type('Sierra').should('have.value', 'Sierra').clear().should('have.value', '')
        cy.get('#email').type('cassiso91@gmail.com').should('have.value', 'cassiso91@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('#firstName').type('Carlos')
        cy.get('#lastName').type('Sierra')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()       
        cy.get('.error').should('be.visible')  
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });

    it('Usar .contais no botão de enviar', () => {
        const longText = 'Teste, TesteTeste, TesteTeste, TesteTeste, TesteTeste, TesteTeste, Teste'
        cy.get('#firstName').type('Carlos')
        cy.get('#lastName').type('Sierra')
        cy.get('#email').type('cassiso91@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar' ).click()
        cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    });
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
          .check()
          .last()
          .uncheck()
          .should('not.be.checked')
    });


    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
   
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action:"drag-drop"})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
   
    });
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('samplefile')
        cy.get('input[type="file"]')
        .selectFile('@samplefile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr','target','_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a').invoke('removeAttr','target').click()
        cy.contains('Talking About Testing').should('be.visible')
    });

    // it.only('abrir cypress modo mobile', () => {
    //     cy.viewport(768, 1024)
    // });
     
})

