describe('Navigate from Home', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('http://localhost:4200');
    cy.get('input[ title="usernameInput"]').clear();
    cy.get('input[ title="usernameInput"]').type('IntUser');
    cy.get('input[title="passwordInput"]').clear();
    cy.get('input[title="passwordInput"]').type('P@ssword1');
    cy.get('ion-button[type="submit"]').click();
  });

  it('naviagtes to report page', () => {
    cy.get('.buttons-last-slot > div > :nth-child(2)').click();
    cy.url().should('eq', 'http://localhost:4200/viewreports');
  });

  it('naviagtes to profile page', () => {
    cy.get('.buttons-last-slot > div > :nth-child(3)').click();
    cy.url().should('eq', 'http://localhost:4200/profile');
  });

  it('naviagtes to receipts page', () => {
    cy.get('.buttons-last-slot > div > :nth-child(4)').click();
    cy.url().should('eq', 'http://localhost:4200/receipts');
  });
});
