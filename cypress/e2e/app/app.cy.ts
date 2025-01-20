describe('My first test', () => {
  it('Access Page', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Hello');
  });
});
