import { useEffect } from 'react';
import React from 'react';
import { WebPubSubComponentProps } from './types';
import { useToast } from '@/ui/components/hooks/use-toast';
import { messageInformative, messageSuccess } from '@/ui/utils/messages';

const WebPubSubComponent = ({ urlConnection }: WebPubSubComponentProps) => {
  const { toast } = useToast();

  let retryCount = 0;
  useEffect(() => {
    connectWS();
  }, [urlConnection]);
  const connectWS = () => {
    const client = new WebSocket(urlConnection);
    client.onopen = () => {
      messageSuccess({
        title: 'WebSocket',
        message: 'Conexión WebSocket establecida',
        toast
      });
      retryCount = 0;
    };
    client.onmessage = (event) => {
      const data = JSON.parse(JSON.parse(event.data));
      const now = new Date(data.date);      
      messageInformative({
        title: `Informativo: ${data.action}`,
        message: `${data.user} - ${data.library} - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        toast
      });
    };

    client.onerror = (error) => {
      console.error('WebSocket error:', client.readyState, error);
    };
    client.onclose = (event) => {
      retryCount++;
      const delay = Math.min(10000 * Math.pow(2, retryCount), 30000);
      setTimeout(connectWS, delay);
    };
  };

  return <></>;
};

export default WebPubSubComponent;
