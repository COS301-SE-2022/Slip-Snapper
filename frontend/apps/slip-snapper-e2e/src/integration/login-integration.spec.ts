describe('Logging in', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/report/recent*',
      },
      { fixture: '../fixtures/RecentReports.json' }
    );

    cy.intercept(
      {
        method: 'GET',
        url: '/api/report/thisweek*',
      },
      { fixture: '../fixtures/RecentReports.json' }
    );
    cy.intercept(
      {
        method: 'GET',
        url: '/api/report/today*',
      },
      { fixture: '../fixtures/TodayHomePage.json' }
    );
    cy.clearCookies();
    cy.visit('http://localhost:4200');
  });

  it('base url leads to login', () => {
    cy.url().should('eq', 'http://localhost:4200/login');
  });
  it('logs in with the correct email and password', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/user/login*',
        times: 1,
      },
      { fixture: '../fixtures/Login.json' }
    );
    cy.get('input[ title="usernameInput"]').type('Regan');
    cy.get('input[title="passwordInput"]').type('Password123');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:4200/home');
  });

  it('logs in with the incorrect email and password', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/user/login*',
        times: 1,
      },
      { fixture: '../fixtures/InvalidLogin.json' }
    );

    cy.get('input[ title="usernameInput"]').type('NotRegan');
    cy.get('input[title="passwordInput"]').type('Password123');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:4200/login');
    cy.get('.alert-head').should('be.visible');
  });
});
