describe('drag-and-drop-and-windows', () => {
    it('Multiple windows', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.contains('Click here') 
        .invoke('removeAttr', 'target')
        .click()

        cy.get('h3').should('have.text', 'New Window')

        cy.go('back')
        cy.get('a[href="/windows/new"]').should('have.text', 'Click Here')
    })
    it('Drag and Drop', () => {
        cy.visit('https://the-internet.herokuapp.com/drag-and-drop', { failOnStatusCode: false })

        const dataTransfer = new DataTransfer()
        cy.contains('A').trigger('dragstart', { dataTransfer })
        cy.contains('B').trigger('drop', {dataTransfer})
    })
}) 