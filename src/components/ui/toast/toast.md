# `Toast`

El componente `Toast` proporciona una interfaz para mostrar notificaciones en forma de mensajes emergentes (toasts). Estos mensajes se utilizan para proporcionar retroalimentación temporal al usuario.

## Componentes Exportados

- **`ToastProvider`**: Un proveedor que debe envolver la parte de tu aplicación que usará los toasts. Gestiona el contexto necesario para los toasts.
- **`ToastViewport`**: Contenedor para los toasts visibles en la interfaz de usuario. Administra la posición y el diseño de los toasts en la pantalla.
- **`Toast`**: El componente principal para crear un toast. Incluye el título, descripción y botones de acción.
- **`ToastTitle`**: Componente para el título del toast.
- **`ToastDescription`**: Componente para la descripción del toast.
- **`ToastClose`**: Botón para cerrar el toast.
- **`ToastAction`**: Botón para realizar una acción específica desde el toast.

## Uso

### Ejemplo Básico

Para utilizar el componente `Toast`, primero necesitas envolver tu aplicación con el `ToastProvider`. Luego, puedes usar los componentes `Toast`, `ToastTitle`, `ToastDescription`, y `ToastAction` para mostrar notificaciones.

```jsx
import React from 'react';
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from './path/to/Toast';

function App() {
  return (
    <ToastProvider>
      {/* Your application components */}
      <Toast>
        <ToastTitle>Toast Title</ToastTitle>
        <ToastDescription>This is a description of the toast message.</ToastDescription>
        <ToastAction>Undo</ToastAction>
        <ToastClose />
      </Toast>
    </ToastProvider>
  );
}
```

#### Propiedades

### `ToastProvider`

No requiere propiedades específicas. Se utiliza para envolver los componentes de toast en la aplicación.

### `ToastViewport`

- **`className`**: (Opcional) Clases CSS adicionales para el estilo.

### `Toast`

- **`className`**: (Opcional) Clases CSS adicionales para el estilo.
- **`variant`**: (Opcional) Variantes de estilo para el toast, como 'default' o 'destructive'.

### `ToastTitle`

- **`className`**: (Opcional) Clases CSS adicionales para el estilo.

### `ToastDescription`

- **`className`**: (Opcional) Clases CSS adicionales para el estilo.

### `ToastClose`

- **`className`**: (Opcional) Clases CSS adicionales para el estilo.

### `ToastAction`
- **`className`**: (Opcional) Clases CSS adicionales para el estilo.