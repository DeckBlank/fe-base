# Documentación del Componente Input

## Descripción General

El componente `Input` es un campo de entrada de texto reutilizable en React. Está diseñado para ser altamente configurable y estilizable, proporcionando una apariencia consistente y accesible para campos de entrada. Utiliza utilidades de clase para aplicar estilos y manejar estados.

## Propiedades

El componente `Input` acepta las siguientes propiedades:

- **`type`**: Especifica el tipo de entrada (por ejemplo, `text`, `password`, `email`, etc.).
- **`className`**: Permite añadir clases CSS adicionales para personalizar el estilo del campo de entrada.

### Interfaz `InputProps`

```typescript
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
```
## Uso

Importando el Componente Input

```javascript
import { Input } from '@/components/Input';
```
Ejemplo Básico
Aquí hay un ejemplo básico de cómo utilizar el componente Input:

```jsx
<Input
  type="text"
  placeholder="Escribe algo..."
  className="custom-class"
/>
```