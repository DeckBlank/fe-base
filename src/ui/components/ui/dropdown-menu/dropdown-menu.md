# Documentación del Componente DropdownMenu

## Descripción General

El componente `DropdownMenu` es una implementación de menú desplegable reutilizable en React. Utiliza la librería `@radix-ui/react-dropdown-menu` para construir menús accesibles y configurables. El componente está compuesto por varios subcomponentes que permiten crear menús complejos con diferentes opciones y comportamientos.

## Partes del Componente DropdownMenu

El componente `DropdownMenu` se compone de los siguientes elementos:

- **`DropdownMenu`**: El contenedor raíz del menú desplegable.
- **`DropdownMenuTrigger`**: El elemento que activa la apertura del menú.
- **`DropdownMenuContent`**: El contenedor del contenido del menú.
- **`DropdownMenuItem`**: Un ítem individual dentro del menú.
- **`DropdownMenuCheckboxItem`**: Un ítem de menú que puede ser marcado o desmarcado.
- **`DropdownMenuRadioItem`**: Un ítem de menú que funciona como opción de radio.
- **`DropdownMenuLabel`**: Una etiqueta para agrupar ítems en el menú.
- **`DropdownMenuSeparator`**: Un separador visual entre ítems en el menú.
- **`DropdownMenuShortcut`**: Un componente opcional para mostrar atajos de teclado.

### Importando el Componente DropdownMenu

```javascript
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from '@/components/DropdownMenu';
```
## Propiedades de los Subcomponentes

- `DropdownMenu`: Contenedor raíz del menú.
- `DropdownMenuTrigger`: Activa la apertura del menú cuando se hace clic.
- `DropdownMenuContent`: Contiene el contenido del menú y se posiciona según el sideOffset.
- `DropdownMenuItem`: Representa un ítem del menú. Puede aceptar la propiedad inset para ajustar el relleno.
- `DropdownMenuCheckboxItem`: Un ítem que puede estar marcado o desmarcado. Usa la propiedad checked para su estado.
- `DropdownMenuRadioItem`: Un ítem que actúa como opción de radio.
- `DropdownMenuLabel`: Etiqueta para agrupar ítems. Puede aceptar la propiedad inset para ajustar el relleno.
- `DropdownMenuSeparator`: Un separador visual entre ítems.
- `DropdownMenuShortcut`: Muestra atajos de teclado opcionales.

### Ejemplo Básico
A continuación se muestra un ejemplo básico de cómo usar el componente DropdownMenu:

```jsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <button>Opciones</button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Opción 1</DropdownMenuItem>
    <DropdownMenuItem>Opción 2</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Grupo de opciones</DropdownMenuLabel>
    <DropdownMenuCheckboxItem checked={true}>Opción Checkbox</DropdownMenuCheckboxItem>
    <DropdownMenuRadioGroup>
      <DropdownMenuRadioItem>Opción Radio 1</DropdownMenuRadioItem>
      <DropdownMenuRadioItem>Opción Radio 2</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
    <DropdownMenuShortcut>⌘+K</DropdownMenuShortcut>
  </DropdownMenuContent>
</DropdownMenu>
```

En este ejemplo:

- `DropdownMenuTrigger`: Activa el menú cuando se hace clic.
- `DropdownMenuContent`: Contiene los ítems y otros subcomponentes del menú.
- `DropdownMenuItem`: Ítems individuales del menú.
- `DropdownMenuSeparator`: Separa visualmente los ítems.
- `DropdownMenuLabel`: Agrupa ítems bajo una etiqueta.
- `DropdownMenuCheckboxItem`: Un ítem con una casilla de verificación.
- `DropdownMenuRadioGroup`: Agrupa ítems de tipo radio.
- `DropdownMenuShortcut`: Muestra un atajo de teclado para la opción.