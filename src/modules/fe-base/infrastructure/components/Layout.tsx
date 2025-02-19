import React, { useEffect, useState } from 'react';
import Sidebar from '@fe-base/infrastructure/components/Sidebar';
import { Header } from '@fe-base/infrastructure/components/Header';
import { TitleProvider } from '@fe-base/infrastructure/contexts/titleContext';
import { Toaster } from '@/components/ui/toaster/index';
import { GetWebPubSubUrlUseCase } from '@fe-web-pub-sub/application/useCases';
import { useToast } from '@/components/hooks/use-toast';
import WebPubSubComponent from '@fe-web-pub-sub/infrastructure/components/webPubSub';
import { useMsal } from '@azure/msal-react';
import { useAuth } from '@fe-auth/infrastructure/contexts/authContext';
import { handleLogout } from '@fe-auth/infrastructure/msalt/authConfig';
import { WebPubSubRepositoryImpl } from '@fe-web-pub-sub/infrastructure/repository';
import { messageInformative } from '@/lib/utils/messages';
import { AuthProvider } from '@fe-auth/infrastructure/contexts/authContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [connectionUrl, setUrlConnectionUrl] = useState<string | null>(null);
  const { accessToken } = useAuth();
  const webPubSubApi = new WebPubSubRepositoryImpl(accessToken);
  const getWebPubSubUrlUseCase = new GetWebPubSubUrlUseCase(webPubSubApi);
  useEffect(() => {
    if(accessToken)
      connectWebPubSub();
  }, [accessToken]);
  const connectWebPubSub = async () => {
    const response = await getWebPubSubUrlUseCase.execute();
    setUrlConnectionUrl(response.data?.url || null);
    messageInformative({
      title: 'WebSocket',
      message: response.message,
      toast
    });
  };
  const { instance } = useMsal();

  return (
    <div className="flex flex-row bg-white h-screen overflow-hidden">
      <TitleProvider initialTitle={''}>
        <Toaster />
        <Sidebar logout={()=>handleLogout(instance)} />
        <div className="flex flex-col flex-grow h-full">
          <Header />
          {connectionUrl && (
            <WebPubSubComponent urlConnection={connectionUrl} />
          )}
          <main className="flex-grow overflow-y-auto">{children}</main>
        </div>
      </TitleProvider>
    </div>
  );
};

export default Layout;
