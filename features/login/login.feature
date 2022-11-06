Feature: Inicio de sesión
Ingreso a la applicación mediante numero telefonico.

  Scenario: Envio de OTP exitoso.
    Given Yo estoy en la pantalla de bienvenida
    When Ingreso mi numero de telefono correctamente
    Then La aplicacion habilita el boton continuar
    When Yo presiono el boton
    Then Recivo un codigo OTP de 6 digitos por sms
    When Yo ingreso el codigo correcto
    And Yo estoy previamente registrado
    Then Yo puedo avanzar a la pantalla de resumen
    When Yo no estoy registrado
    Then Soy redireccionado al flujo de registro.

  Scenario: Envio de OTP fallido.
    Given Yo estoy en la pantalla para confirma mi numero de telefono
    And Yo no he recibido mi codigo de 6 digitos
    And El tiempo de 2 minutos de espera para reenviar el codigo termina
    Then Yo puedo solicitar el reenvio del codigo.

  Scenario: Ingreso de OTP incorrecto.
    Given Yo estoy en la pantalla para confirma mi numero de telefono
    When Yo ingreso un codigo incorrecto
    Then Yo voy a recibir el siguiente mensaje en un snackbar de error "Codigo Incorrecto"
    And El codigo que ingrese es borrado.
