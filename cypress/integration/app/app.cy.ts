describe('My first test', () => {
  it('Access Page', () => {
    cy.visit('/');
    cy.contains('Hello');
  });
});
