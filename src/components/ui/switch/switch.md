# Componente `Switch`

El componente `Switch` es un switch estilizado que puede ser utilizado para representar estados de activación o desactivación. Este componente utiliza la biblioteca Radix UI para crear un switch accesible y personalizable.

## Props

- **`className`**: Permite agregar clases CSS adicionales para personalizar el estilo del switch.
- **`...props`**: Propiedades estándar que se pueden pasar a un elemento `<button>` o `<div>`, como `id`, `name`, `disabled`, etc.

## Ejemplo de Uso

```jsx
<Switch />
```

## Estilos

- **`Switch`**: El switch en sí, con transición de color y animaciones para los estados activado `(data-[state=checked])` y desactivado `(data-[state=unchecked])`. Incluye soporte para modos claro y oscuro.
- **`SwitchPrimitives.Thumb`**: La parte deslizante del switch, que se mueve de un lado a otro con una animación fluida. Estilizado con una sombra y una transición de desplazamiento basada en el estado del switch.