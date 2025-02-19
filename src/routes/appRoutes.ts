import { lazy } from 'react';
import { RouteProps } from './route.props';

const LoginPage = lazy(() => import('@fe-auth/infrastructure/pages/LoginPage'));

const ProfilePage = lazy(() => import('@fe-auth/infrastructure/pages/ProfilePage'));
const ListLibrariesPage = lazy(
  () => import('@fe-library/infrastructure/pages/ListLibrariesPage'),
);
const InsertLibrariesPage = lazy(
  () => import('@fe-library/infrastructure/pages/InsertLibrariesPage/InsertLibrariesPage'),
);
const UpdateLibraryPage = lazy(
  () => import('@fe-library/infrastructure/pages/UpdateLibraryPage/UpdateLibraryPage'),
);
const SelectLibraryPage = lazy(
  () => import('@fe-library/infrastructure/pages/SelectLibraryPage'),
);
const NotFoundPage = lazy(() => import('@fe-base/infrastructure/pages/NotFoundPage'));

export const homeLogedPage: RouteProps = {
  path: '/',
  title: 'LISTAR LIBRERÍAS',
  element: ListLibrariesPage,
};
export const insertLibraryPage = {
  path: '/insertar-librerias',
  title: 'INSERTAR LIBRERÍAS',
  element: InsertLibrariesPage,
};
export const perfilPage: RouteProps = {
  path: '/perfil',
  title: 'PERFIL',
  element: ProfilePage,
};

export const updateLibraryPage: RouteProps = {
  path: '/modificar-libreria/:id',
  title: 'MODIFICAR LIBRERÍA',
  element: UpdateLibraryPage,
};

export const selectLibraryPage: RouteProps = {
  path: '/libreria/:id',
  title: 'LIBRERÍA',
  element: SelectLibraryPage,
};

export const notFoundPage: RouteProps = {
  path: '*',
  title: 'NOT FOUND',
  element: NotFoundPage,
};

export const protectedPages: Array<RouteProps> = [
  perfilPage,
  homeLogedPage,
  insertLibraryPage,
  updateLibraryPage,
  selectLibraryPage,
  notFoundPage,
];

export const loginPage = { path: '/', title: 'LOGIN', element: LoginPage };
export const noProtectedPages: Array<RouteProps> = [loginPage, notFoundPage];

export const getRouteTitle = (currentPage: string): string => {
  const page = protectedPages.find((page) =>
    currentPage.includes(
      page.path.endsWith('/:id') ? page.path.split('/:id')[0] : page.path,
    ),
  );

  if (!page?.title) return notFoundPage.title;

  return page.title;
};
