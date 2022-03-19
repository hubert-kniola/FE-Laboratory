describe('My First Test', () => {
    it('Visits the Main Site', () => {
      cy.visit('http://localhost:3000')

      cy.contains('Hello').click()
    })
  })
  