Feature: Mediciones
Resumen de Mediciones con valores y fecha de ultimo registro.

  Scenario: Usuario nuevo
    When Ingreso por primera vez a la applicación
    Then En la pantalla de resumen veo las siguientes Mediciones:
      | name             | value               | actualizado en       |
      | presion arterial | no data             |                      |
      | Peso             | "peso registrado"   | "fecha del registro" |
      | Altura           | "altura registrado" | "fecha del registro" |

  Scenario: Usuario registrado
    Given Que soy un usuario registrado
    And Realice mediciones de presion arterial
    Then Puedo visualizar el valor y fecha del ultimo registrado de cada medición

  Scenario: Navegacion estadisticas de una medicion.
  Given yo estoy en la tab de resumen
  And Presiono la card con la medicion de presion arterial
  Then La applicación abre la pantalla de estadisticas de presion arterial
