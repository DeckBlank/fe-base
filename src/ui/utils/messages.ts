export const messageError = (message: string, toast: any) => {
    toast({
      title: 'Error',
      variant: 'eMessage',
      description: message,
    });
  };
  
  export const messageSuccess = ({
    message,
    title,
    toast,
  }: {
    message: string;
    title?: string;
    toast: any;
  }) => {
    toast({
      title: title || 'Exito!',
      variant: 'sMessage',
      description: message,
      duration: 5000
    });
  };

  export const messageInformative = ({
    message,
    title,
    toast,
  }: {
    message: string;
    title?: string;
    toast: any;
  }) => {
    toast({
      title: title || 'Exito!',
      variant: 'iMessage',
      description: message,
      duration: 5000
    });
  };
  