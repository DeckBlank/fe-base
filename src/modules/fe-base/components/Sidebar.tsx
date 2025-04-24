import React, { useEffect, useRef, useState } from 'react';
import { Menu } from '@/modules/fe-base/components/Menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/ui/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Menu as LucidMenu, X } from 'lucide-react';
import { homeLogedPage, perfilPage } from '@/routes/appRoutes';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  logout: () => void;
}

const Sidebar = ({ logout }: SidebarProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [userImage, setUserImage] = useState<string>('');
  const sidebarRef = useRef<HTMLDivElement>(null);
  //const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState({
    userPrincipalName: '',
    givenName: '',
  });

  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(' ');
    return `${firstName.charAt(0).toUpperCase()}${lastName ? lastName.charAt(0).toUpperCase() : ''}`;
  };

  // const getImageProfile = async (accessToken: string) => {
  //   const userImage = await fetchProfileImage(accessToken);
  //   setUserImage(userImage || '');
  // };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef?.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  useEffect(() => {
    setIsOpen(true);
    //requestProfileData();
  }, []);

  // const requestProfileData = () => {
  //   instance
  //     .acquireTokenSilent({
  //       ...loginRequest,
  //       account: accounts[0],
  //     })
  //     .then((response) => {
  //       getImageProfile(response.accessToken);
  //       callMsGraph(response.accessToken).then((response) =>
  //         setGraphData(response),
  //       );
  //     });
  // };

  return (
    <>
      <button
        className="absolute top-4 left-4 text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <LucidMenu />
      </button>
      <div
        className={`absolute md:relative ${isOpen ? 'block' : 'hidden '}`}
        ref={sidebarRef}
      >
        <div
          className={`relative inset-y-0 left-0 z-50 w-64 h-screen bg-primary text-white transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
        >
          <div className={`${isOpen ? 'block' : ' lg:block'}`}>
            <div className="flex items-center justify-center h-20 md:h-20 md:bg-primary">
              <h1 className="text-white text-2xl font-bold">
                <Link to={homeLogedPage.path}>Aplicación Base</Link>
              </h1>
              <div className="flex ml-2 items-end">
                <button
                  className="text-white text-2xl font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <X />
                </button>
              </div>
            </div>

            <div className="flex-grow flex items-center justify-center">
              <Menu />
            </div>

            <div className="border-t border-white my-1 md:hidden" />

            <div className="flex flex-col items-center space-y-4 p-4 md:p-4 md:mt-auto md:flex-row md:space-y-0 md:space-x-4">
              {graphData && (
                <>
                  <Link to={perfilPage.path}>
                    <Avatar className="w-16 h-16 border-2 border-white cursor-pointer">
                      <AvatarImage src={userImage} />
                      <AvatarFallback className="text-black text-lg font-bold">
                        {getInitials(graphData.givenName || '')}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="text-white text-center">
                    <Link
                      to={perfilPage.path}
                      className="text-lg font-bold mb-1 cursor-pointer"
                    >
                      {graphData.givenName || 'Usuario'}
                    </Link>
                    <div
                      className="text-white font-bold text-sm underline cursor-pointer block mt-2"
                      onClick={logout}
                    >
                      Cerrar Sesión
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
