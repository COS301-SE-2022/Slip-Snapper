describe('Navigate from Home',()=>{
    beforeEach(() =>{
        cy.clearCookies();
        cy.visit('http://localhost:4200')
        cy.get('input[ title="usernameInput"]').clear()
        cy.get('input[ title="usernameInput"]').type('Regan')
        cy.get('input[title="passwordInput"]').clear()
        cy.get('input[title="passwordInput"]').type('Password123')
        cy.get('ion-button[type="submit"]').click()
        cy.intercept(
          {
            method: 'GET',
            url: '/api/report/recent*',
          },
          { fixture: '../fixtures/RecentReports.json' }
        )
        cy.intercept(
          {
            method: 'POST',
            url: '/api/user/login*',
          },
          { fixture: '../fixtures/Login.json' },
        )
        cy.intercept(
          {
            method: 'GET',
            url: '/api/report/user*',
          },
          { fixture: '../fixtures/getAllReports.json' }
        )
    })
    
    it('naviagtes to report page', ()=>{
      cy.get('ion-button[router-link="/viewreports"]').click()
      cy.url().should('eq','http://localhost:4200/viewreports')
    })
  
  });