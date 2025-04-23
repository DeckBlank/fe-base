import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';
import { Textarea } from '@/ui/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select';
import { Label } from '@/ui/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/components/ui/radio-group';
import { schemaLibraryForm } from './insertLibraryValidations';
import { LibraryRepositoryImpl } from '@/modules/fe-app/services/library.service';
import { homeLogedPage } from '@/routes/appRoutes';
import { useTitle } from '@/modules/fe-base/contexts/titleContext';
import { useNavigate } from 'react-router-dom';
import { messageError, messageSuccess } from '@/ui/utils/messages';
import { useToast } from '@/ui/components/hooks/use-toast';
import { useAuth } from '@/modules/fe-auth/contexts/authContext';

const InsertLibrariesPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setTitle} = useTitle();
  const { accessToken, refreshToken, userName } = useAuth();
 useEffect(()=>{
  setTitle('INSERTAR LIBRERÍAS');
  if (!accessToken) {
    refreshToken();
  }
 },[useTitle,accessToken,refreshToken]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaLibraryForm),
    mode: 'onChange',
  });
  const libraryApi = new LibraryRepositoryImpl(accessToken || '');  

  const insertLibrary = async (library: any) => {
    try {
      await libraryApi.addLibrary({
        ...library,
        createdUser: userName
      });
      const now = new Date();
      messageSuccess({
        title: 'Exitoso: CREATE',
        message: `${userName} - ${library.library} - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        toast,
      });
      navigate(homeLogedPage.path);
    } catch (error) {
      if (error instanceof Error) messageError(error.message, toast);
    }
  };
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(insertLibrary)}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <Label htmlFor="library" className="mb-2">
              Nombre de la librería
            </Label>
            <Input
              id="library"
              placeholder="Nombre de la librería"
              className="border rounded px-4 py-2 w-full mt-1"
              {...register('library')}
            />
            <p className="text-destructive">{errors.library?.message}</p>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="version" className="mb-2">
              Versión
            </Label>
            <Input
              id="version"
              placeholder="Versión"
              className="border rounded px-4 py-2 w-full mt-1"
              {...register('version')}
            />
            <p className="text-destructive">{errors.version?.message}</p>
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
              {...register('description')}
            />
            <p className="text-destructive">{errors.description?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <Label htmlFor="type" className="mb-2">
              Tipo de librería
            </Label>
            <Select
              onValueChange={(value) => {
                setValue('type', value, { shouldValidate: true });
                clearErrors('type'); 
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de librería" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Externa">Externa</SelectItem>
                <SelectItem value="Privada">Privada</SelectItem>
                
              </SelectContent>
            </Select>
            <p className="text-destructive">{errors.type?.message}</p>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="license" className="mb-2">
              Tipo de licencia
            </Label>
            <Select
              onValueChange={(value) => {
                setValue('license', value, { shouldValidate: true });
                clearErrors('license'); 
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de licencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Paga">Paga</SelectItem>
                
              </SelectContent>
            </Select>
            <p className="text-destructive">{errors.license?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-2">
            <Label htmlFor="link" className="mb-2">
              Link
            </Label>
            <Input
              id="link"
              placeholder="Link"
              className="border rounded px-4 py-2 w-full mt-1"
              {...register('link')}
            />
            <p className="text-destructive">{errors.link?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-2">
            <Label className="mb-2">Estado de Seguridad</Label>
            <RadioGroup
              onValueChange={(value) => {
                setValue('securityState', value, { shouldValidate: true });
                clearErrors('securityState'); 
              }}
              className="flex space-x-4 mt-1"
            >
              <RadioGroupItem id="approved" value="Aprobado" />
              <Label htmlFor="approved" className="mr-4">
                Aprobado
              </Label>
              <RadioGroupItem id="vulnerable" value="Vulnerable" />
              <Label htmlFor="vulnerable">Vulnerable</Label>
            </RadioGroup>
            <p className="text-destructive">{errors.securityState?.message}</p>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded text-lg font-bold"
          >
            Registrar
          </Button>
          <Button
            onClick={goBack}
            type="button"
            className="bg-gray-500 text-white px-6 py-3 rounded text-lg font-bold ml-4"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InsertLibrariesPage;
