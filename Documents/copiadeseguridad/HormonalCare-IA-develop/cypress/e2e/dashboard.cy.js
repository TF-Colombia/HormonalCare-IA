
// cypress/e2e/dashboard.cy.js

describe('HormonalCare Dashboard Tests', () => {
  beforeEach(() => {
    cy.visit('https://hormonal-care-ia.vercel.app/')
  })

  it('should load the dashboard and show the welcome message', () => {
    cy.contains("Welcome back, Dr. Reed").should('be.visible')
  })

  it('should display key metrics correctly', () => {
    cy.contains("Total Patients").should('be.visible')
    cy.contains("Appointments Today").should('be.visible')
    cy.contains("Active Cases").should('be.visible')
  })

  it('should navigate to quick access links', () => {
    cy.contains("Analytics").click()
    cy.url().should('include', '/analytics') // adjust if it's a modal or component instead
    cy.go('back')

    cy.contains("Reports").click()
    cy.url().should('include', '/reports')
    cy.go('back')

    cy.contains("Lab Results").click()
    cy.url().should('include', '/labs')
  })

  it('should toggle the sidebar', () => {
    cy.get('button').contains('Toggle').click()
    cy.get('aside').should('not.be.visible')
    cy.get('button').contains('Toggle').click()
    cy.get('aside').should('be.visible')
  })

  it('should show user email in sidebar', () => {
    cy.contains("e.reed@hormonal.care").should('be.visible')
  })

  it('should be responsive on mobile view', () => {
    cy.viewport('iphone-6')
    cy.contains("Welcome back, Dr. Reed").should('be.visible')
  })

  it('should support keyboard navigation', () => {
    cy.get('body').tab()
    cy.focused().should('exist')
  })
})
