describe('Home page integration', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('http://localhost:4200');
    cy.get('input[ title="usernameInput"]').clear();
    cy.get('input[ title="usernameInput"]').type('Regan');
    cy.get('input[title="passwordInput"]').clear();
    cy.get('input[title="passwordInput"]').type('Password123');
    cy.get('ion-button[type="submit"]').click();
    cy.intercept(
      {
        method: 'GET',
        url: '/api/report/recent*',
      },
      { fixture: '../fixtures/RecentReports.json' }
    );
    cy.intercept(
      {
        method: 'POST',
        url: '/api/user/login*',
      },
      { fixture: '../fixtures/Login.json' }
    );
    cy.intercept(
      {
        method: 'GET',
        url: '/api/report/pdf*',
      },
      { fixture: '../fixtures/getReport.json' }
    );
  });

  it('Should have Scan Slip button', () => {
    cy.url().should('eq', 'http://localhost:4200/home');
    cy.get('ion-fab-button').should('have.length', 3);
  });

  it('Should go to Add Entry page', () => {
    
    cy.get('ion-fab-button[color="secondary"]').should('have.length', 1);
    cy.get('ion-fab-button[color="secondary"]').click();
    cy.get('ion-fab-button[router-link="/addentry"]').click();
    cy.url().should("eq", 'http://localhost:4200/addentry')

  });
});
