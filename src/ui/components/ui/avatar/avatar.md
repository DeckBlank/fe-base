# Documentación del Componente Avatar

## Descripción General

El componente `Avatar` es un componente reutilizable de React que proporciona una imagen de avatar con estilo y personalizable, con contenido de respaldo opcional en caso de que la imagen no se pueda cargar. Utiliza la librería `@radix-ui/react-avatar` para crear elementos accesibles y eficientes.

## Uso

El componente se compone de tres partes:

- **`Avatar`**: El contenedor raíz del avatar.
- **`AvatarImage`**: El elemento de imagen dentro del avatar.
- **`AvatarFallback`**: Un elemento de respaldo que se muestra si la imagen no se puede cargar.

### Importando el Componente Avatar

```javascript
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Avatar';
```
## Ejemplo Básico

```jsx
<Avatar>
  <AvatarImage src="ruta_de_imagen.jpg" alt="Avatar del usuario" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```
