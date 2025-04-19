# Documentación del Componente Button

## Descripción General

El componente `Button` es un botón altamente personalizable y accesible, construido sobre las librerías `@radix-ui/react-slot` y `class-variance-authority`. Permite crear diferentes estilos y tamaños de botones, y puede ser utilizado como un enlace HTML estándar o como cualquier otro elemento.

## Propiedades

* **`variant`**: Define el estilo visual del botón. Opciones disponibles:
  * `default`: Estilo predeterminado.
  * `destructive`: Estilo para acciones destructivas (e.g., eliminar).
  * `outline`: Botón con borde.
  * `secondary`: Estilo secundario.
  * `ghost`: Botón transparente.
  * `link`: Estilo de enlace.
* **`size`**: Define el tamaño del botón. Opciones disponibles:
  * `default`: Tamaño predeterminado.
  * `sm`: Tamaño pequeño.
  * `lg`: Tamaño grande.
  * `icon`: Tamaño para iconos.
* **`asChild`**: Si es `true`, el botón se renderiza como un componente `slot`, permitiendo que el botón se comporte como cualquier otro elemento.
* **`className`**: Permite agregar clases CSS personalizadas al botón.

## Ejemplos

```jsx
import { Button, buttonVariants } from '@/components/Button';

<Button variant="primary" size="lg">
  Click me
</Button>

<Button asChild variant="link" href="/about">
  About Us
</Button>