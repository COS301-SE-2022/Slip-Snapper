describe('Logging in',()=>{
  beforeEach(() =>{
      cy.clearCookies();
      cy.visit('http://localhost:4200')
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

  it('base url leads to login', ()=>{
    cy.url().should('eq','http://localhost:4200/login')
  })
  it('logs in with the correct email and password', ()=>{
      cy.get('input[ title="usernameInput"]').type('Regan')
      cy.get('input[title="passwordInput"]').type('Password123')
      cy.get('ion-button[type="submit"]').click()
      cy.url().should('eq','http://localhost:4200/home')
  })

  it('logs in with the incorrect email and password', ()=>{
    cy.intercept(
      {
        method: 'POST',
        url: '/api/user/login*',
        times: 1,
      },
      { fixture: '../fixtures/InvalidLogin.json' },
    )
    cy.get('input[ title="usernameInput"]').type('NotRegan')
    cy.get('input[title="passwordInput"]').type('Password123')
    cy.get('ion-button[type="submit"]').click()
    cy.url().should('eq','http://localhost:4200/login')
})

});

