# Documentación del Componente RadioGroup

## Descripción General

El componente `RadioGroup` y sus elementos relacionados permiten crear un grupo de botones de opción (radio buttons) accesibles y estilizados. Utiliza la librería `@radix-ui/react-radio-group` para crear un grupo de opciones donde el usuario puede seleccionar solo una opción a la vez. Los componentes están diseñados para ser fácilmente integrables y personalizables en aplicaciones React.

## Componentes

### `RadioGroup`

El contenedor principal para el grupo de botones de opción.

#### Propiedades

- **`className`**: Clases CSS adicionales para personalizar el estilo del contenedor.
- **`...props`**: Otras propiedades estándar de un elemento `<div>` o `<form>`, ya que `RadioGroupPrimitive.Root` se comporta como un contenedor.

#### Ejemplo

```jsx
<RadioGroup>
  <RadioGroupItem value="option1">Option 1</RadioGroupItem>
  <RadioGroupItem value="option2">Option 2</RadioGroupItem>
</RadioGroup>
```

## RadioGroupItem

Un botón de opción individual dentro del grupo.

### Propiedades

className: Clases CSS adicionales para personalizar el estilo del botón de opción.

#### Ejemplo
```jsx
<RadioGroupItem value="option1" id="option1">
  Option 1
</RadioGroupItem>
```