import React, { useState } from 'react';
import { Button } from '@/ui/components/ui/button';
import { Link } from 'react-router-dom';
import { createLibraryMenu } from '@/modules/fe-app/components/menuController';

const Menu = () => {


  const [isLibrariesOpen, setIsLibrariesOpen] = useState(false);

  const menuContent = [createLibraryMenu(isLibrariesOpen, setIsLibrariesOpen)];
  return (

    <div className='grid'>
      {
        menuContent.map((module,index) => {
          return (<div className="p-4" key={index}>
            <button
              onClick={() => module.setViewState(!module.viewState)}
              className="flex items-center justify-between w-full text-white text-lg font-bold"
            >
              <span className="flex items-center space-x-2">
                {<module.icon className="w-6 h-6" />}
                <span>{module.name}</span>
              </span>
              <span>{module.viewState ? '-' : '+'}</span>
            </button>

            <div
              className={`mt-2 space-y-2 ${module.viewState ? 'block' : 'hidden'}`}
            >
              {
                module.items.map((item,index) => {
                  return (
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full lg:w-auto text-white text-sm flex items-center space-x-2 lg:justify-start justify-center"
                      key={index}
                    >
                      <Link to={item.path}>
                        {<item.icon className="w-5 h-5" />}
                        <span>{item.name}</span>
                      </Link>
                    </Button>
                  )
                })
              }
            </div>
          </div>)
        })
      }
    </div>
  );
};

export { Menu };
