describe('SearchFunctionality', () => {

  var testData;

  beforeEach(() => {

      cy.fixture('../fixtures/TestData.json').then(function (td) {
          testData = td
      })

      cy.visit('https://www.google.com', { failOnStatusCode: false })

      // Accept cookies if prompted
      cy.get('#L2AGLb').then(x => {
          x.click()
      })
  })

  afterEach(() => {
      cy.log('Closing the browser.');
  })




// Validate that the basic search term is functioning properly
  it('Basic Search', () => {

      cy.get('textarea[name="q"]').type(testData.basicSearchTerm + '\n')

      cy.get('#res em').first().should('have.text', testData.basicSearchTerm)

      cy.get('#res a').first().click()

  })


// Validate on searching with Exact term   
  it('Exact Term Search', () => {

      cy.get('textarea[name="q"]').type(`"${testData.exactSearchTerm}"\n`)

      cy.get('#search em')
          .contains(testData.exactSearchTerm)
          .should('have.text', testData.exactSearchTerm)


      cy.get('#search a').first().click({ force: true })

  })


// Validate that the Advanced Search operators are functioning properly
  it('Advanced Search', () => {

      cy.get('textarea[name="q"]')
          .type(`${testData.advanceFirstTerm} AND ${testData.advanceSecondTerm} site:${testData.advanceSite} filetype:${testData.advanceFileType}\n`)

      cy.get('#search em')
          .contains(testData.advanceFirstTerm)
          .should('have.text', testData.advanceFirstTerm)


      cy.get('#search em')
          .contains(testData.advanceSecondTerm)
          .should('have.text', testData.advanceSecondTerm)


      cy.get('#search a[href*=".pdf"]')
          .first()
          .click({ force: true })

  })


// Validate that the Auto Complete feature is functioning properly
  it('Autocomplete Search', () => {

      cy.get('textarea[name="q"]')
          .type(`${testData.autoCompleteTerm}`)

      cy.get('div[data-ved] li[role="presentation"] span')
          .first()
          .click()



      cy.get('#search a')
          .first()
          .click({ force: true })

  })


// Validate that in case of entering an invalid term, the error is handled
  it('Invalid Search', () => {

      cy.get('textarea[name="q"]').type(testData.invalidSearch + '\n')

      cy.get('div p[Role="heading"]')
          .should('contain.text', 'did not match')


  })




})