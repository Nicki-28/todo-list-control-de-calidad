/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })

  it('Se crea correctamente una tarea', () => {

    cy.get('#input-box').type('Tarea 1{enter}') // usamos el id para identificarlo mejor
    cy.get('#list-container li')                // Buscar tareas en la lista
    .should('have.length.at.least', 1)         // Debe haber al menos una
    .and('contain.text', 'Tarea 1')           // Debe contener este texto
  })

  context ('Con una tarea creada',() =>{
    beforeEach(() =>{
      //crea una tarea
      cy.get('#input-box').type('Tarea {enter}')
      cy.get('#list-container li')                
      .should('have.length.at.least', 1)         
      .and('contain.text', 'Tarea') 

    })

    it('Eliminamos una tarea correctamente', () => {
    //eliminala
    cy.get('#list-container li').first().find('span').click()
    cy.contains('Tarea').should('not.exist')
    })

    it('Marca la tarea como completada', () => {

    cy.contains('#list-container li', 'Tarea').click()
    // comprobamos que cambió de clase
     cy.contains('#list-container li', 'Tarea')
    .should('have.class', 'checked')
    })

    it(' Verificamos que se mantienen los estados al recargar la página',()=>{
      //recargamos y verificamos que sigue existiendo la tarea
      cy.reload()
      cy.get('#list-container li').should('have.length.at.least', 1) 
      
      //Tachamos la tarea, recargamos y verificamos que se mantiene su estado
      cy.contains('#list-container li', 'Tarea').click()
      cy.reload()
      cy.contains('#list-container li', 'Tarea')
      .should('have.class', 'checked')

      //eliminamos la tarea, recargamos y verificamos que no esté
      cy.contains('#list-container li', 'Tarea').find('span').click()
      cy.reload()
      cy.contains('Tarea').should('not.exist')
    })


    
  })
  

})
