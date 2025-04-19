import React, { useEffect, useState } from 'react';
import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';
import { Textarea } from '@/ui/components/ui/textarea';
import { Label } from '@/ui/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/ui/components/ui/radio-group';
import { useNavigate, useParams } from 'react-router-dom';
import { Library } from '@/modules/fe-app/domain/entities/Library';
import { LibraryRepositoryImpl } from '@/modules/fe-app/services/library.service';
import { useTitle } from '@/modules/fe-base/contexts/titleContext';
import { messageError } from '@/ui/utils/messages';
import { useToast } from '@/ui/components/hooks/use-toast';
import { useAuth } from '@/modules/fe-auth/contexts/authContext';

const SelectLibraryPage: React.FC = () => {
  const toast = useToast();
  const { setTitle } = useTitle();
  const { accessToken, refreshToken } = useAuth();
  const navigate = useNavigate();
  const libraryApi = new LibraryRepositoryImpl(accessToken || '');
  const { id } = useParams<{ id: string }>();
  const [library, setLibrary] = React.useState<Library>();
  useEffect(() => {
    if (typeof id !== 'string') return navigate(-1);
    getLibrary(id);
  }, [id]);
  useEffect(() => {
    setTitle(`LIBRERÍA: ${library?.library}`);
    if (!accessToken) {
      refreshToken();
    }
  }, [library, accessToken, refreshToken]);

  const getLibrary = async (id: string) => {
    try {
      const data = await libraryApi.getLibraryById(id);
      setLibrary(data?.data);
    } catch (error) {
      if (error instanceof Error) messageError(error.message, toast);
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2">
          <Label htmlFor="library-name" className="mb-2">
            Nombre de la librería
          </Label>
          <Input
            id="library-name"
            placeholder="Nombre de la librería"
            className="border rounded px-4 py-2 w-full mt-1"
            value={library?.library}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="version" className="mb-2">
            Versión
          </Label>
          <Input
            id="version"
            placeholder="Versión"
            className="border rounded px-4 py-2 w-full mt-1"
            value={library?.version}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <Label htmlFor="description" className="mb-2">
            Descripción de la librería
          </Label>
          <Textarea
            id="description"
            placeholder="Descripción de la librería"
            className="border rounded px-4 py-2 w-full mt-1"
            value={library?.description}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2">
          <Label htmlFor="library-type" className="mb-2">
            Tipo de librería
          </Label>
          <Input
            id="library-type"
            placeholder="Tipo de librería"
            className="border rounded px-4 py-2 w-full mt-1"
            value={library?.type}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="license-type" className="mb-2">
            Tipo de licencia
          </Label>
          <Input
            id="license-type"
            placeholder="Tipo de licencia"
            className="border rounded px-4 py-2 w-full mt-1"
            value={library?.license}
          />
        </div>
      </div>

      {/* Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <Label htmlFor="link" className="mb-2">
            Link
          </Label>
          <Input
            id="link"
            placeholder="Link"
            className="border rounded px-4 py-2 w-full mt-1"
            value={library?.link}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <Label className="mb-2">Estado de Seguridad</Label>
          {library?.securityState && (
            <RadioGroup
              className="flex space-x-4 mt-1"
              defaultValue={library?.securityState}
            >
              <RadioGroupItem
                id="approved"
                value={'Aprobado'}
                defaultChecked={library?.securityState === 'Aprobado'}
              />
              <Label htmlFor="approved" className="mr-4">
                Aprobado
              </Label>
              <RadioGroupItem
                id="vulnerable"
                value={'Vulnerable'}
                defaultChecked={library?.securityState === 'Vulnerable'}
              />
              <Label htmlFor="vulnerable">Vulnerable</Label>
            </RadioGroup>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          onClick={goBack}
          className="bg-blue-500 text-white px-6 py-3 rounded text-lg font-bold"
        >
          Regresar
        </Button>
      </div>
    </div>
  );
};

export default SelectLibraryPage;
