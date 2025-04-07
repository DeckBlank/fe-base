<h1 align="center">
  Aplicación Base - React App 👨🏼‍💻
</h1>

> Aplicación base para crear aplicaciones web usando Webpack y la mayoría de los mejores paquetes o herramientas para fetching de data, testing, coverage, linting y code formatting.

## 🔖 Tabla de Contenidos

- [Primeros pasos](#getting-started)
- [Prerequisitos](#Prerequisites)
- [Configuracion Inicial](#initial-configuration)
- [Extensiones VS Code](#vs-code-plugins)
- [Scripts Disponibles](#project-setup)
- [Estructuración del Proyecto](#file-structure)
- [Convenciones de Nomenclatura](#naming-conventions)
- [Changelog](#changelog)
- [Recursos](#resources)

## 🚀 Primeros Pasos

Se plantea generar un proyecto base como buen punto de partida para aprender o iniciar un proyecto con ReactJS y plugins básicos, mejores prácticas, convenciones, estructura de archivos y más. Encontramos diferentes piezas de lo que estabamos buscando, así que decidímos juntarlas todas.

Básicamente, lo que tenemos aquí es un proyecto de inicio de ReactJS creado con `webpack` desde cero y configuraciones esenciales para iniciar una aplicación ReactJS limpia y rápida:

- Routing (`ReactJs Router`).
- Store Management (`Redux` / `Modules`).
- Unit testing (`jest`).
- Lint and formatting (`ESLint` + `Prettier` + `Husky`).
- Estructura de archivos sólida y recomendada (soporta contenedores, componentes inteligentes y dummys).
- Archivos de configuración.
- Scripts customizados.
- Ejemplo de CSS modules, responsividad (`TailwindCss` + `Styled Components`).

Para utilizar esta estructura, en el repositorio dale `fork` y reutilizalo 😃.

Corre `npm install` y luego `npm start`.

## 🤔 Prerequisitos

NodeJS
Actualizacion a node v22.11.0
<https://nodejs.org/en/>

## 🤔 Configuración Inicial

Dentro de la carpeta del repositorio vacía vamos a configurar un proyecto de ReactJS desde 0, para ello inicializaremos el proyecto de NodeJS con:

```bash
npm init -y
```

Luego instalamos las dependencias necesarias para el proyecto de ReactJS

```bash
npm install react react-dom
npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin
npm install typescript @types/node @types/react @types/react-dom --save-dev
npm install ts-loader css-loader style-loader babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript --save-dev
npm install tailwindcss postcss autoprefixer --save-dev
```

Configuramos Typescript para el proyecto, para eso corremos

```bash
npx tsc --init
```

Eso generará un archivo `tsconfig.json` y recomendamos tener esta configuración para los alias y consideraciones del proyecto

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react",
    "outDir": "./dist",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@ui/*": ["./ui/*"]
    },
  },
  "include": ["src/**/*", "tests"],
  "exclude": ["node_modules"]
}
```

Configuramos Babel, para ello crearemos un archivo `.babelrc` en la raíz del proyecto con la siguiente configuración

```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

Luego de eso configuramos webpack, para eso crearemos un archivo `webpack.config.ts` y recomendamos utilizar esta configuración para que compile los assets, las rutas acortadas y demás configuraciones

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const PORT = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /test/],
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
    new Dotenv(),
  ],
  devServer: {
    host: 'localhost',
    port: PORT,
    historyApiFallback: true,
    open: true,
  },
};
```

Con esta configuración en la raíz del proyecto procedemos a crear la primera estructura del proyecto: añadir las carpetas `src` y `public`.

En `public` agregamos el archivo `index.html` con la siguiente estructura, que será importante para la ejecución de nuestra app

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>Aplicacion Base</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Entonces con la configuración inicial del proyecto siguiendo paso a paso, debería tener la siguiente estructura del proyecto

```text
web-me-aw-abs-baseApplication
├── fe-baseapplication
│   ├── src                     * Raíz del proyecto
│   ├── public                  * Contiene el archivo index y el favicon
│   │   └── index.html
│   │   └── favicon.ico

```

## 👨🏼‍💻 Extensiones VS Code

Recomendamos usar VS Code, así que incluimos una lista de complementos básicos para aplicaciones ReactJS (si usas un IDE diferente, estamos bastante seguros de que debería haber los mismos complementos para tu IDE):

### Debes Tener

- ES7 React/Redux
- Jest
- ESLint
- Prettier
- Tailwind Css Intellissense
- DotENV

### Optionales

- Auto Close Tag
- Auto Rename Tag
- Auto import - ES6
- Path Intellisense
- TODO Highlight
- vscode-styled-components
- Sass

## 🙌 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.<br>
Abre [http://localhost:9000](http://localhost:9000) para verla en el navegador.

La página se volverá a cargar si realizas modificaciones.<br>
También verás los errores de lint en la consola.

### `npm test`

Inicia el ejecutor de pruebas en el modo de observación interactiva.<br>

### `npm run build`

Genera la carpeta build que será necesaria para subir el aplicativo a un entorno de despliegue y de pruebas continuas.

### `npm run lint` y `npm run lint:fix`

Limpia todos los archivos dentro de `./src` y muestra el resultado sin corregirlo.

### `npx shadcn@2.1.8 add dialog`

Agrega un componente `dialog` a la carpeta `src/component/ui`.

## 😎 Estructura del proyecto

La estructura de carpetas se basa en la arquitectura hexagonal en combinación con algunas convenciones y preferencias del equipo:

```text

```

**Algunos files importantes en la raíz del proyecto**

```text
.
├── .editorconfig * Estilos de codificación (también por lenguaje de programación).
├── .env              * Variables de entorno (env.production, env.local, env.uat, etc.).
├── .eslintrc.json    * Configuración y reglas de ESLint.
├── .prettierrc       * Opciones de formato de Prettier.
└── jsconfig.js       * Configuraciones del compilador JS (por ejemplo, establecer la carpeta raíz para las raíces al importar archivos).
```

### TSX vs TS

Dado que JSX no es JS estándar, debería incluir su propia extensión, es decir, `.ts` para TypeScript, `.jsx` para JSX.
Hoy en día, la mayoría de los IDE admiten ambas extensiones para ReactJs, por lo que la razón más importante hoy en día es que ayuda a indicar qué es: ¿un componente o JS simple?

### Nombres

- Los **nombres de componentes** siempre deben ser **de varias palabras**, excepto para los componentes raíz `App`. Utilice `UserCard` o `ProfileCard` en lugar de `Card`, por ejemplo.
Cada componente debe estar en su propio archivo.

```
Da más significado y contexto a lo que hace el componente.
```

- Los **archivos de componentes** siempre deben ser **PascalCase**/**kebab-case** excepto para los HOC. Utilice `UserCard.jsx` o `user-card.jsx`.

```
PascalCase funciona mejor con el autocompletado en editores de código, ya que es coherente con la forma en que hacemos referencia a los componentes
en JS(X) y plantillas, siempre que sea posible.

Sin embargo, los nombres de archivo con mayúsculas y minúsculas a veces pueden crear problemas en sistemas de archivos que no distinguen entre mayúsculas y minúsculas, por lo que kebab-case también es perfectamente aceptable.
```

- **Los componentes se nombran de acuerdo a su ruta relativa a los componentes o src**. Teniendo en cuenta que, un componente ubicado en `src/components/User/List.jsx` se llamaría `UserList`. Un componente ubicado en `src/screens/User/List` se llamaría `ScreensUserList`.
- **Los componentes que están en una carpeta con el mismo nombre, no repiten el nombre en el componente**. Teniendo en cuenta que, un componente ubicado en `src/components/User/List/List.jsx` se llamaría `UserList` y **NO** `UserListList`.

```
El nombre que le damos a los componentes, debe ser claro y único en la aplicación, para
que sean más fáciles de encontrar y evitar posibles confusiones.

Fácil búsqueda dentro del proyecto.
```

- Los componentes que solo se **usan una vez por página deben comenzar con el prefijo “The”**, para indicar que solo puede haber uno. Por ejemplo, para una barra de navegación o un pie de página, debe usar `TheNavbar.jsx` o `TheFooter.jsx`.

```
Esto no significa que el componente solo se use en una sola página,
pero solo se usará una vez por página.

Estos componentes nunca aceptan ningún atributo, ya que son específicos de su aplicación, no su contexto
dentro de su aplicación.

Si encuentra la necesidad de agregar atributos, es una buena indicación de que este es en realidad un componente reutilizable que solo se usa una vez por página por ahora.
```

- Nombre de archivo y carpeta de **Componentes de orden superior** (HOC) en **minúsculas en mayúsculas**.

```
Convención genérica
```

- **Siempre use el nombre completo** en lugar de la abreviatura en el nombre de sus componentes. Por ejemplo, no utilice `UDSettings`, utilice en su lugar `UserDashboardSettings`.

```
Mantenga las cosas claras
```

- **Cada página es un componente de clase de React** que tiene algún estado. Un **componente de página** usa otros componentes para ensamblar la página como bloques de Lego.

```
Punto de entrada único por función o página.

Mantenga las páginas en una carpeta separada en la raíz de src, porque se agruparán de acuerdo con la definición de ruta y no por módulos.
```

- **Mantenga los componentes superficiales**. Si un componente tiene mucho marcado anidado, las posibilidades de reutilizarlo disminuyen. En cambio, deberíamos aprovechar la composición. Nos ahorra la perforación de propiedades o tener que llegar a la API de contexto.

```
Código reutilizable y legible.

Pasar propiedades a múltiples componentes secundarios es lo que llaman un olor de código.
```

- Los **componentes de presentación** son aquellos que **no tienen estado interno**. Su función es mostrar ciertas partes de la interfaz de usuario o el diseño. Se les proporcionan datos a través de propiedades o API de contexto o administración de estado.
- Los **componentes de contenedor** son aquellos que **se ocupan de la lógica empresarial**. Por lo general, tienen algún estado y solo representan componentes de presentación según la lógica.

```
De esta manera, los componentes de presentación y de contenedor completan el rompecabezas juntos.

Al dividir las responsabilidades, el código se vuelve más fácil de mantener y depurar.
```

### Organización / Mejores prácticas

- Use un **archivo de exportación central** (Barrel export -> `index.js`) en el directorio de componentes. Con este archivo, podemos importar todos nuestros componentes y exportarlos. Esto nos permitirá importar componentes a cualquier archivo desde el mismo lugar.
- Los **componentes de presentación** y **componentes de contenedor** se guardan en `src/components`.
- **Agrupe los componentes** por `module/feature` dentro de la `carpeta de componentes`.
- Mantener los **componentes genéricos** por contexto dentro de `src/components/ui` o `src/components/layout`.
- Mantener las páginas simples**, con una estructura y un código mínimos.
- Agrupar las páginas según la definición de la ruta. Para una ruta `/user/list`, tendríamos una página ubicada en `/src/pages/User/List.jsx`.

<h2 id="changelog"> Changelog</h2>
- Se hizo upgrade a la version de Node a la 22.11.0 (LTS)

## 🗒 Recursos

Linkografía aquí:

- [Estructurar proyectos y nombrar componentes en React](https://medium.com/hackernoon/structuring-projects-and-naming-components-in-react-1261b6e18d76)
- [Cómo estructuro mis aplicaciones React](https://blog.usejournal.com/how-i-structure-my-react-apps-86e897054593)
- [Estructurar un proyecto React: una guía definitiva](https://blog.bitsrc.io/structuring-a-react-project-a-definitive-guide-ac9a754df5eb)
- [¿Existe una forma recomendada de estructurar React? proyectos](https://reactjs.org/docs/faq-structure.html#is-there-a-recommended-way-to-structure-react-projects)
- [Aplicación de reglas de organización de código al código concreto de Redux](https://jaysoo.ca/2016/02/28/applying-cod)
