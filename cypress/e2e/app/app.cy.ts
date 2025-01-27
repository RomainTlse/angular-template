describe('My first test', () => {
  it('Access Page', () => {
    cy.visit('http://localhost:4200/test');
    cy.contains('Simple Card');
  });
});
