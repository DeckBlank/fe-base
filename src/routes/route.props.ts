export interface RouteProps {
    path: string;
    title: string;
    element: React.LazyExoticComponent<React.ComponentType<any>>;
  }