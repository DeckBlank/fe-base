# Toaster

El componente `Toaster` es un componente de React que proporciona un sistema de notificaciones (toasts) para mostrar mensajes emergentes al usuario. Utiliza un conjunto de componentes para crear, mostrar y gestionar los toasts de manera accesible y estilizada. 

El `Toaster` utiliza los componentes del módulo `@/ui/components/ui/toast` para manejar los toasts y visualizarlos en la interfaz de usuario.

## Uso

El componente `Toaster` es responsable de renderizar y gestionar los toasts en la aplicación. Utiliza el hook `useToast` para obtener los toasts que deben ser mostrados.

### Importando el Componente Toaster

```javascript
import { Toaster } from '@/components/Toaster';
```

## Ejemplo Básico

Aquí hay un ejemplo de cómo utilizar el componente Toaster en tu aplicación:

```jsx
import { Toaster } from '@/components/Toaster';

function App() {
  return (
    <div>
      {/* Otros componentes */}
      <Toaster />
    </div>
  );
}
```

El Toaster se incluye en el componente raíz o en un nivel superior para que pueda gestionar y mostrar todos los toasts que se generen en la aplicación.

## Componentes Internos
El Toaster utiliza los siguientes componentes internos para renderizar los toasts:

- `ToastProvider`: Proporciona el contexto para los toasts y maneja su visualización.
- `Toast`: Representa un único toast. Puede incluir un título, una descripción y una acción.
- `ToastTitle`: Muestra el título del toast.
- `ToastDescription`: Muestra la descripción del toast.
- `ToastClose`: Un botón para cerrar el toast.
- `ToastViewport`: Define el área donde se mostrarán los toasts.