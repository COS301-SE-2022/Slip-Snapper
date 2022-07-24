describe('Navigate from Home',()=>{
    beforeEach(() =>{
        cy.clearCookies();
        cy.visit('http://localhost:4200')
        cy.get('input[ title="usernameInput"]').type('Regan')
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
            times: 1,
          },
          { fixture: '../fixtures/Login.json' },
        )
    })
    
    it('naviagtes to report page', ()=>{
      cy.get('ion-button[router-link="/viewreports"]').click()
      cy.intercept(
        {
          method: 'GET',
          url: '/api/report/user*',
          times: 1
        },
        { fixture: '../fixtures/getAllReports.json' }
      )
      cy.url().should('eq','http://localhost:4200/viewreports')
    })
  
  });