# Documentación del Componente Label

## Descripción General

El componente `Label` es un componente de React diseñado para representar etiquetas accesibles y estilizadas. Utiliza la librería `@radix-ui/react-label` para crear etiquetas que se integran bien con otros componentes de formulario y UI. El componente `Label` admite estilos y variantes configurables mediante la librería `class-variance-authority`.

## Uso

El componente `Label` se utiliza para asociar una etiqueta a un control de formulario, como un campo de entrada. Proporciona una forma de mostrar texto de etiqueta de manera accesible y estilizada.

### Importando el Componente Label

```javascript
import { Label } from '@/components/Label';
Ejemplo Básico
Aquí hay un ejemplo de cómo utilizar el componente Label:

```jsx
<Label htmlFor="input-id">Etiqueta del Campo</Label>
<input id="input-id" type="text" />
```

El Label está asociado con un campo de entrada mediante el atributo htmlFor, que debe coincidir con el id del campo de entrada.

## Propiedades
El componente Label acepta las siguientes propiedades:

- `className`: Permite aplicar clases CSS adicionales para personalizar el estilo del componente Label.
- `htmlFor`: Especifica el id del control de formulario al que la etiqueta está asociada.
- `Otras propiedades`: Se pueden pasar otras propiedades estándar de un elemento HTML label.