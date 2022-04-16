const PRODUCTION_BUILD_SERVER = 'http://localhost:8938'

const onProductionBuild = (path: string) => new URL(path, PRODUCTION_BUILD_SERVER).toString()

describe('Browser.element', () => {
  before(() => {
    cy.visit(onProductionBuild('/'))
  })

  it('seems to be working', () => {
    cy.contains("I'm compiled Browser.element")
    cy.get('[aria-label="Clickable"]').click()
    cy.contains('Woooo')
  })
})

describe('Browser.application', () => {
  before(() => {
    cy.visit(onProductionBuild('/application'))
  })

  it('seems to be working', () => {
    cy.contains('Your Elm App is working!')
  })

  describe('assets', () => {
    it('render an asset with asset tag', () => {
      cy.get('[alt="without option"]')
        .should('be.visible')
        .and(($img) => {
          expect($img.attr('src')).to.be.match(/\/assets\/logo\.\d+\.jpg/)
        })
    })

    it('With inline option', () => {
      cy.get('[alt="with inline option"]')
        .should('be.visible')
        .and(($img) => {
          expect($img.attr('src').length).to.be.greaterThan(100)
        })
    })

    it('With vite-plugin-helper', () => {
      cy.get('[alt="with vite-plugin-helper"]')
        .should('be.visible')
        .and(($img) => {
          expect($img.attr('src').length).to.be.greaterThan(100)
        })
    })
  })
})