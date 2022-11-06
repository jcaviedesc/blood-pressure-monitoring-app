Feature: Resumen de medicinas
Listado de medicinas proximas a tomar por el paciente

  Scenario: Usuario sin medicinas
    Given yo estoy en la tab de resumen
    And No tengo medicinas registradas
    Then Visualizo un empty state con un push para agregar medicinas

  Scenario: Usuario con medicinas
    Given yo estoy en la tab de resumen
    And Tengo medicinas registradas
    Then Visualizo el listado de medicinas que debo tomar ordenadas por la hora de la toma.

