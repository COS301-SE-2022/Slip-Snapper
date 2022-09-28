describe('Logging in', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('http://localhost:4200');
  });

  it('base url leads to login', () => {
    cy.url().should('eq', 'http://localhost:4200/login');
  });
  it('logs in with the correct email and password', () => {
    cy.get('input[ title="usernameInput"]').type('IntUser');
    cy.get('input[title="passwordInput"]').type('P@ssword1');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:4200/home');
  });

  it('logs in with the incorrect email and password', () => {
    cy.get('input[ title="usernameInput"]').type('IntUser');
    cy.get('input[title="passwordInput"]').type('P@ssword123');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:4200/login');
    cy.get('.alert-head').should('be.visible');
  });
});
