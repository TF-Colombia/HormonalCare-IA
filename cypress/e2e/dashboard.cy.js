
// cypress/e2e/dashboard.cy.js

describe('Dashboard básico HormonalCare', () => {
  beforeEach(() => {
    cy.visit('https://hormonal-care-ia.vercel.app/')
  })

  it('Carga el dashboard y muestra el título', () => {
    cy.contains('Dashboard').should('be.visible')
  })

  it('Muestra el botón Home en el sidebar', () => {
    cy.contains('Home').should('be.visible')
  })

  it('Muestra el botón Patients en el sidebar', () => {
    cy.contains('Patients').should('be.visible')
  })

  it('Muestra el botón Schedule en el sidebar', () => {
    cy.contains('Schedule').should('be.visible')
  })

  it('Muestra el botón Settings en el sidebar', () => {
    cy.contains('Settings').should('be.visible')
  })

    it('El chatbot responde a un saludo', () => {
    // Abre el chat si es necesario (ajusta el selector si tu botón es diferente)
    cy.contains('Chat').click({ force: true }) // O usa el selector correcto para abrir el chat
  
    // Escribe un mensaje en el input del chat
    cy.get('input[placeholder="Escribe tu mensaje..."]').type('Hola{enter}')
  
    // Espera y verifica que aparezca una respuesta del bot
    cy.contains('Hola').should('be.visible') // O ajusta según la respuesta esperada del bot
  })
})
