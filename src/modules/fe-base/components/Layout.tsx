import React, { useEffect, useState } from 'react';
import Sidebar from '@/modules/fe-base/components/Sidebar';
import { Header } from '@/modules/fe-base/components/Header';
import { TitleProvider } from '@/modules/fe-base/contexts/titleContext';
import { Toaster } from '@/ui/components/ui/toaster/index';
import { useToast } from '@/ui/components/hooks/use-toast';
import WebPubSubComponent from '@/modules/fe-web-pub-sub/webPubSub';
import { useMsal } from '@azure/msal-react';
import { useAuth } from '@/modules/fe-auth/contexts/authContext';
import { handleLogout } from '@/modules/fe-auth/msalt/authConfig';
import { WebPubSubRepositoryImpl } from '@/modules/fe-web-pub-sub/services';
import { messageInformative } from '@/ui/utils/messages';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [connectionUrl, setUrlConnectionUrl] = useState<string | null>(null);
  const { accessToken } = useAuth();
  const webPubSubApi = new WebPubSubRepositoryImpl(accessToken);
  useEffect(() => {
    if(accessToken)
      connectWebPubSub();
  }, [accessToken]);
  const connectWebPubSub = async () => {
    const response = await webPubSubApi.getWebPubSubUrl();
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
