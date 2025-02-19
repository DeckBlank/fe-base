import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginRequest } from '@/modules/fe-auth/infrastructure/msalt/authConfig';
import { Button } from '@/components/ui/button';
import { useTitle } from '@fe-base/infrastructure/contexts/titleContext';
import { useNavigate } from 'react-router-dom';
import { callMsGraphProfile } from '@/modules/fe-auth/infrastructure/msalt/graph';
import { useMsal } from '@azure/msal-react';

const ProfilePage: React.FC = () => {
  const { setTitle } = useTitle();
  const navigate = useNavigate();

  useEffect(() => {
    requestProfileData();
    setTitle('PERFIL');
  }, []);
  const goBack = () => {
    navigate(-1);
  };
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState({
    mail: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    companyName: '',
  });
  const requestProfileData = () => {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraphProfile(response.accessToken).then((response) => {
          console.log(response);

          setGraphData({
            mail: response.account[0].userPrincipalName,
            lastName: response.names[0].last,
            firstName: response.names[0].first,
            jobTitle: response.positions[0].detail.jobTitle,
            companyName: response.positions[0].detail.company.displayName,
          });
        });
      });
  };
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2">
          <Label htmlFor="name" className="mb-2">
            Nombres
          </Label>
          <Input
            id="name"
            placeholder="Nombres"
            className="border rounded px-4 py-2 w-full mt-1"
            contentEditable={false}
            value={graphData.firstName}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="apellidos" className="mb-2">
            Apellidos
          </Label>
          <Input
            id="apellidos"
            placeholder="Apellidos"
            className="border rounded px-4 py-2 w-full mt-1"
            contentEditable={false}
            value={graphData.lastName}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2">
          <Label htmlFor="organizacion" className="mb-2">
            Organizacion
          </Label>
          <Input
            id="organizacion"
            placeholder="Organizacion"
            className="border rounded px-4 py-2 w-full mt-1"
            contentEditable={false}
            value={graphData.companyName}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="cargo" className="mb-2">
            Cargo
          </Label>
          <Input
            id="cargo"
            placeholder="Cargo"
            className="border rounded px-4 py-2 w-full mt-1"
            contentEditable={false}
            value={graphData.jobTitle}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="col-span-2">
          <Label htmlFor="correo" className="mb-2">
            Correo
          </Label>
          <Input
            id="correo"
            placeholder="Correo"
            className="border rounded px-4 py-2 w-full mt-1"
            contentEditable={false}
            value={graphData.mail}
          />
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

export default ProfilePage;
