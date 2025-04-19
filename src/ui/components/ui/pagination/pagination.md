# Documentación del Componente Pagination

## Descripción General

El componente `Pagination` es un conjunto de componentes reutilizables de React diseñados para implementar una interfaz de paginación accesible y estilizada. Incluye elementos como botones para navegar entre páginas y representaciones visuales de las páginas en una interfaz de usuario. Utiliza la librería `lucide-react` para los íconos y proporciona una estructura flexible para la paginación en aplicaciones web.

## Componentes

El componente `Pagination` se divide en varios subcomponentes que se pueden utilizar para construir una interfaz de paginación completa.

### `Pagination`

El contenedor principal para la navegación por paginación.

#### Propiedades

- **`className`**: Clases CSS adicionales para personalizar el estilo del contenedor.
- **`...props`**: Otras propiedades estándar de un elemento `<nav>`.

#### Ejemplo

```jsx
<Pagination>
  {/* Contenido de la paginación aquí */}
</Pagination>
```
## PaginationContent

Un contenedor para los elementos de paginación, como números de página o íconos.

### Propiedades

className: Clases CSS adicionales para personalizar el estilo del contenedor.

#### Ejemplo

```jsx
<PaginationContent>
  {/* Elementos de la paginación aquí */}
</PaginationContent>
```
## PaginationItem

Un contenedor para cada ítem individual dentro de la paginación.

### Propiedades

className: Clases CSS adicionales para personalizar el estilo del ítem.

#### Ejemplo

```jsx
<PaginationItem>
  {/* Contenido del ítem aquí */}
</PaginationItem>
```

## PaginationLink

Un enlace que representa un ítem de paginación. Puede ser un número de página o un botón para navegar.

### Propiedades

isActive: Indica si el enlace está activo (página actual).
size: Tamaño del botón, se puede ajustar a default o icon.
className: Clases CSS adicionales para personalizar el estilo del enlace.

#### Ejemplo

```jsx
<PaginationLink isActive={true} href="/page/1">
  1
</PaginationLink>
```

## PaginationPrevious

Un botón para navegar a la página anterior.

### Propiedades

className: Clases CSS adicionales para personalizar el estilo del botón.

#### Ejemplo

```jsx
<PaginationPrevious href="/page/previous">
  Previous
</PaginationPrevious>
```

## PaginationNext

Un botón para navegar a la página siguiente.

### Propiedades

className: Clases CSS adicionales para personalizar el estilo del botón.

#### Ejemplo

```jsx
<PaginationNext href="/page/next">
  Next
</PaginationNext>
```

## PaginationEllipsis

Un indicador para más páginas, usado para representar una omisión de números de página.

### Propiedades

className: Clases CSS adicionales para personalizar el estilo del indicador.

#### Ejemplo

```jsx
<PaginationEllipsis />
```