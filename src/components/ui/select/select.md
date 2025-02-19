# Documentación del Componente Select

## Descripción General

El componente `Select` y sus subcomponentes proporcionan una solución completa para crear menús desplegables accesibles y estilizados en aplicaciones React. Utiliza la librería `@radix-ui/react-select` para manejar la funcionalidad del menú desplegable y ofrece una interfaz de usuario personalizable con soporte para temas claros y oscuros.

## Componentes

### `Select`

El componente principal que actúa como el contenedor para el menú desplegable.

#### Propiedades

- **`className`**: Clases CSS adicionales para personalizar el estilo del contenedor.
- **`...props`**: Otras propiedades estándar de un elemento `<div>` o `<form>`.

#### Ejemplo

```jsx
<Select>
  <SelectTrigger>Select an option</SelectTrigger>
  <SelectContent>
    {/* Menu items here */}
  </SelectContent>
</Select>
```

### `SelectTrigger`

El botón que activa el menú desplegable.

#### Propiedades

- **`className`**: Clases CSS adicionales para personalizar el estilo del botón.

#### Ejemplo
```jsx
<SelectTrigger>
  <span>Select an option</span>
</SelectTrigger>
```

### `SelectScrollUpButton`

Botón para desplazar el contenido del menú hacia arriba.

#### Propiedades

- **`className`**: Clases CSS adicionales para personalizar el estilo del botón.

#### Ejemplo
```jsx
<SelectScrollUpButton />
```

### `SelectScrollDownButton`

Botón para desplazar el contenido del menú hacia abajo.

#### Propiedades

- **`className`** : Clases CSS adicionales para personalizar el estilo del botón.

#### Ejemplo
```jsx
<SelectScrollDownButton />
```

### `SelectContent`

El contenedor para el contenido del menú desplegable.

#### Propiedades

- **`className`**: Clases CSS adicionales para personalizar el estilo del contenedor.
- **`position`**: Determina la posición del menú desplegable en relación con el trigger. Puede ser 'popper' (predeterminado) o 'static'.

#### Ejemplo
```jsx
<SelectContent>
  <SelectItem value="option1">Option 1</SelectItem>
  <SelectItem value="option2">Option 2</SelectItem>
</SelectContent>
```

### `SelectLabel`

Etiqueta para el menú desplegable.

#### Propiedades

- **`className`**: Clases CSS adicionales para personalizar el estilo de la etiqueta.

#### Ejemplo
```jsx
<SelectLabel>Select an option</SelectLabel>
```

### `SelectItem`
Elemento individual dentro del menú desplegable.

#### Propiedades

- **`className`**: Clases CSS adicionales para personalizar el estilo del elemento.

#### Ejemplo

```jsx
<SelectItem value="option1">Option 1</SelectItem>
```

### `SelectSeparator`

Separador visual dentro del menú desplegable.

#### Propiedades

- **`className`**: Clases CSS adicionales para personalizar el estilo del separador.

#### Ejemplo
```jsx
<SelectSeparator />
```