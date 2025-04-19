import { lazy } from 'react';
import { RouteProps } from './route.props';

const LoginMsaltPage = lazy(
  () => import('@/modules/fe-auth/pages/LoginMsalt.page'),
);
const LoginPage = lazy(() => import('@/modules/fe-auth/pages/Login.page'));

const ProfilePage = lazy(() => import('@/modules/fe-auth/pages/Profile.page'));
const ListLibrariesPage = lazy(
  () => import('@/modules/fe-app/pages/ListLibraries.page'),
);
const InsertLibrariesPage = lazy(
  () =>
    import(
      '@/modules/fe-app/pages/InsertLibrariesPage/InsertLibraries.page'
    ),
);
const UpdateLibraryPage = lazy(
  () =>
    import('@/modules/fe-app/pages/UpdateLibraryPage/UpdateLibrary.page'),
);
const SelectLibraryPage = lazy(
  () => import('@/modules/fe-app/pages/SelectLibrary.page'),
);
const NotFoundPage = lazy(() => import('@/modules/fe-base/pages/NotFound.page'));

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

export const loginMsaltPage = {
  path: '/',
  title: 'LOGIN',
  element: LoginMsaltPage,
};
export const loginPage = { path: '/login', title: 'LOGIN', element: LoginPage };
export const noProtectedPages: Array<RouteProps> = [
  loginMsaltPage,
  loginPage,
  notFoundPage,
];

export const getRouteTitle = (currentPage: string): string => {
  const page = protectedPages.find((page) =>
    currentPage.includes(
      page.path.endsWith('/:id') ? page.path.split('/:id')[0] : page.path,
    ),
  );

  if (!page?.title) return notFoundPage.title;

  return page.title;
};
