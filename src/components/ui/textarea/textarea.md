# `Textarea`

El componente `Textarea` es un campo de texto multilinea que permite a los usuarios ingresar y editar texto en un área expandible. Este componente está construido utilizando React y permite la personalización a través de propiedades estándar de un elemento `textarea` de HTML.

## Funcionalidad

- **Entrada de Texto Multilinea**: Ideal para textos extensos que requieren varias líneas.
- **Compatibilidad con Props HTML**: Acepta todas las propiedades que se pueden aplicar a un elemento `textarea` estándar, como `placeholder`, `disabled`, `rows`, y más.
- **Ref Forwarding**: Utiliza `React.forwardRef` para permitir que el componente sea referenciado desde otros componentes.

## Propiedades

El componente `Textarea` acepta las siguientes propiedades:

- **`className`**: (Opcional) Clase(s) CSS adicional(es) para personalizar el estilo del componente.
- **`...props`**: Cualquier otra propiedad estándar de un `textarea`, por ejemplo:
  - `placeholder`: Texto que se muestra cuando el campo está vacío.
  - `rows`: Número de filas visibles.
  - `disabled`: Si el campo está deshabilitado.
  - `value`: Valor del campo.
  - `onChange`: Función de callback para manejar cambios en el campo.

## Uso

Aquí hay un ejemplo básico de cómo usar el componente `Textarea`:

```jsx
import React from 'react';
import { Textarea } from './path/to/Textarea';

function MyComponent() {
  return (
    <Textarea
      placeholder="Escribe tu mensaje aquí..."
      rows={4}
      onChange={(e) => console.log(e.target.value)}
    />
  );
}
