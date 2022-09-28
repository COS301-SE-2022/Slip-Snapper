describe('Home page integration', () => {
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

  it('Should have Scan Slip button', () => {
    cy.get('.takePicture > .ion-color').should('be.visible');
  });

  it('Should have title and navbar', () => {
    cy.get(
      '.ion-page > .header-md > .toolbar-title-default > .title-default'
    ).should('be.visible');
    cy.get('.buttons-last-slot > div > :nth-child(1)').should('be.visible');
    cy.get('.buttons-last-slot > div > :nth-child(2)').should('be.visible');
    cy.get('.buttons-last-slot > div > :nth-child(3)').should('be.visible');
    cy.get('.buttons-last-slot > div > :nth-child(4)').should('be.visible');
  });
});

describe('Edit Page integration from Home', () => {
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

  it('Should go to Add Entry page', () => {
    cy.get('ion-fab-button[color="secondary"]').should('have.length', 1);
    cy.get('ion-fab-button[color="secondary"]').click();
    cy.get('ion-fab-button[router-link="/addentry"]').click();
    cy.url().should('eq', 'http://localhost:4200/addentry');
  });

  it('Should go to Add Entry page and cancel new entry', () => {
    cy.get('ion-fab-button[color="secondary"]').should('have.length', 1);
    cy.get('ion-fab-button[color="secondary"]').click();
    cy.get('ion-fab-button[router-link="/addentry"]').click();
    cy.get('#cancelButton').click();
    cy.url().should('eq', 'http://localhost:4200/home');
  });

  it('Should go to Add Entry page and click submit', () => {
    cy.get('ion-fab-button[color="secondary"]').should('have.length', 1);
    cy.get('ion-fab-button[color="secondary"]').click();
    cy.get('ion-fab-button[router-link="/addentry"]').click();
    cy.get("#submitButton").click();
    cy.get('.alert-head').should('be.be.visible');
  });
});
