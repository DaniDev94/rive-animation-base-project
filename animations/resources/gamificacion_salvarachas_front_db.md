---
file: gamificacion_salvarachas_front_db.riv
artboards:
  "Default artboard":
    - name: GamificacionFlotadorMain
      size: [1000, 600]
      origin: [0, 0]
      stateMachines: [StateMachine]
  "Other artboards":
    - name: FlotadorVuelo
      size: [1000, 600]
      origin: [0, 0]
    - name: GamificacionFlotador
      size: [1000, 600]
      origin: [0, 0]
viewModels:
  - name: MainVM
    properties:
      - { name: isAnimCompletedFront, type: boolean }
      - { name: track, type: number }
      - { name: triggerVuelo, type: trigger }
    instances: [Instance]
assets:
  images: [SR__0002_flotador_persp.png, SR__0002_flotador_perspGLOW.png, flotador-lancha-sombra.png, SR__0000_flotador_VUELO.png, salvarachas-completo.png]
---

## Comments
Default artboard es el único que importa.

## Apuntes migración:

### EventCompleted desaparece como tal y ahora esta controlado por:
- **Property**: `isAnimCompletedFront` (boolean en MainVM)
- **Condición**: `if isAnimCompletedFront = true`
  - Este .riv llega a su fin
  - Ponemos el icono de flotador real
  - Se lanza animación restauración de la racha
- Es lo mismo que teníamos antes solo que ahora esta controlado desde un property tipo boolean en MainVM.

### TriggerVuelo desaparece como tal y ahora esta controlado por:
- **Property**: `triggerVuelo` (trigger en MainVM, en camelCase)
- Tal y como pasaba antes:
  - Este nuevo trigger sustituye al anterior y debe ser disparado exactamente en el mismo momento

### EventSounds desaparece y ahora esta controlado por
- **Property**: `track` (number en MainVM)
- **Condición**: `if track = 6`
  - Entra sonido "flying_float"
- Es lo mismo que teníamos antes solo que ahora esta controlado directamente por una propiedad tipo Number, sin eventos.

