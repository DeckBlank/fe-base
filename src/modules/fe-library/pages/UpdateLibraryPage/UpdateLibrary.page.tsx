import React, { useEffect, useState } from 'react';
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
import {
  RadioGroup,
  RadioGroupItem,
} from '@/ui/components/ui/radio-group';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IUpdateLibraryForm,
  Library,
} from '@/modules/fe-library/domain/entities';
import { LibraryRepositoryImpl } from '@/modules/fe-library/services/library.service';
import { homeLogedPage } from '@/routes/appRoutes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTitle } from '@/modules/fe-base/contexts/titleContext';
import { schemaUpdateLibraryForm } from './libraryFormValidator';
import { useToast } from '@/ui/components/hooks/use-toast';
import { messageError, messageSuccess } from '@/ui/utils/messages';
import { useAuth } from '@/modules/fe-auth/contexts/authContext';

const UpdateLibraryPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setTitle } = useTitle();
  const { accessToken, refreshToken, userName } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [library, setLibrary] = useState<Library>();
  const libraryApi = new LibraryRepositoryImpl(accessToken || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaUpdateLibraryForm),
    mode: 'onChange',
  });
  useEffect(() => {
    setTitle(`MODIFICAR LIBRERÍA: ${library?.library}`);
    if (!accessToken) {
      refreshToken();
    }
  }, [useTitle, library,accessToken,refreshToken]);

  useEffect(() => {
    if (typeof id !== 'string') return navigate(-1);
    getLibrary(id);
  }, [id]);
  const getLibrary = async (id: string) => {
    try {
      const data = await libraryApi.getLibraryById(id);
      if (data?.status === 'error') return messageError(data?.message, toast);
      if (!data?.data) {
        return messageError(data?.message, toast);
      }
      setLibrary(data?.data);
      setValue('library', data?.data?.library);
      setValue('id', id);
      setValue('version', data?.data?.version);
      setValue('type', data?.data?.type);
      setValue('license', data?.data?.license);
      setValue('link', data?.data?.link);
      setValue('securityState', data?.data?.securityState);
    } catch (error) {
      if (error instanceof Error) messageError(error.message, toast);
    }
  };

  const updateLibrary = async (formValues: IUpdateLibraryForm) => {
    try {
      const updated = await libraryApi.updateLibrary({
        ...formValues,
        updatedUser: userName,
      });
      if (updated.status === 'error') messageError(updated.message, toast);
      const now = new Date();
      messageSuccess({
        title: 'Exitoso: UPDATE',
        message: `${userName} - ${formValues.library} - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        toast,
      });
      navigate(homeLogedPage.path);
    } catch (error: any) {
      messageError(error?.message, toast);
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(updateLibrary)}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <Label htmlFor="library" className="mb-2">
              Nombre de la librería
            </Label>
            <Input
              id="library"
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
              defaultValue={library?.version}
              {...register('version')}
            />
            <p className="text-red-500">{errors.version?.message}</p>
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
            {library?.type && (
              <Select
                defaultValue={library?.type}
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
            )}
            <p className="text-red-500">{errors.type?.message}</p>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="license-type" className="mb-2">
              Tipo de licencia
            </Label>
            {library?.license && (
              <Select
                defaultValue={library?.license}
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
            )}
            <p className="text-red-500">{errors.license?.message}</p>
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
              defaultValue={library?.link}
              {...register('link')}
            />
            <p className="text-red-500">{errors.link?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-2">
            <Label className="mb-2">Estado de Seguridad</Label>
            {library?.securityState && (
              <RadioGroup
                className="flex space-x-4 mt-1"
                onValueChange={(value) => setValue('securityState', value)}
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
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded text-lg font-bold"
          >
            Modificar
          </Button>
          <Button
            type="button"
            onClick={goBack}
            className="bg-gray-500 text-white px-6 py-3 rounded text-lg font-bold ml-4"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLibraryPage;
