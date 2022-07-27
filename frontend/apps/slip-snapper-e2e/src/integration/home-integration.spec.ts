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
  });

  it('Should have Scan Slip button', () => {
    cy.get('.takePicture > .ion-color > .md').should('be.visible');
  });

  it('Should have title and navbar', () => {
    
    cy.get('.ion-page > .header-md > .toolbar-title-default > .title-default').should('be.visible');
    cy.get('div > [router-link="/home"]').should('be.visible');
    cy.get('div > [router-link="/viewreports"]').should('be.visible');
    cy.get('div > [router-link="/profile"]').should('be.visible');
    cy.get('div > [router-link="/receipts"]').should('be.visible');
  });
});

describe('Edit Page integration from Home', () => {
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
  });

  it('Should go to Add Entry page', () => {
    
    cy.get('ion-fab-button[color="secondary"]').should('have.length', 1);
    cy.get('ion-fab-button[color="secondary"]').click();
    cy.get('ion-fab-button[router-link="/addentry"]').click();
    cy.url().should("eq", 'http://localhost:4200/addentry')

  });

  it('Should go to Add Entry page and cancel new entry', () => {
    
    cy.get('ion-fab-button[color="secondary"]').should('have.length', 1);
    cy.get('ion-fab-button[color="secondary"]').click();
    cy.get('ion-fab-button[router-link="/addentry"]').click();
    cy.get("#cancelButton").click()
    cy.url().should("eq", 'http://localhost:4200/home')

  });

  it('Should go to Add Entry page and clcik submit', () => {
    
    cy.get('ion-fab-button[color="secondary"]').should('have.length', 1);
    cy.get('ion-fab-button[color="secondary"]').click();
    cy.get('ion-fab-button[router-link="/addentry"]').click();
    cy.get(".ion-color-primary > [fill='solid'][color='secondary']").click();
    cy.get('.alert-head').should("be.be.visible");

  });
});
