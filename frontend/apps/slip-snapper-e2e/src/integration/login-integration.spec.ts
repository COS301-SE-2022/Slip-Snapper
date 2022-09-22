describe('Logging in', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('http://localhost:4200');
  });

  it('base url leads to login', () => {
    cy.url().should('eq', 'http://localhost:4200/login');
  });
  it('logs in with the correct email and password', () => {
    cy.get('input[ title="usernameInput"]').type('testUser');
    cy.get('input[title="passwordInput"]').type('Password123');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:4200/home');
  });

  it('logs in with the incorrect email and password', () => {
    cy.get('input[ title="usernameInput"]').type('NottestUser');
    cy.get('input[title="passwordInput"]').type('Password123');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:4200/login');
    cy.get('.alert-head').should('be.visible');
  });
});
