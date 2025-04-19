import { Library, List, PlusCircle } from "lucide-react";
import { homeLogedPage, insertLibraryPage } from "@/routes/appRoutes";

export const createLibraryMenu = (isOpen: any, setIsOpen: any) => ({
  name: "Librerías",
  icon: Library,
  items: [
    {
      name: "Listar Librerías",
      icon: List,
      path: homeLogedPage.path,
    },
    {
      name: "Insertar Librerías",
      icon: PlusCircle,
      path: insertLibraryPage.path,
    },
  ],
  viewState: isOpen,
  setViewState: setIsOpen,
});
