'use client';

import React from 'react';
import { useToast } from '@/ui/components/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/ui/components/ui/toast';
import { Check, CheckCheck, CheckCheckIcon, CircleX, Info } from 'lucide-react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className='flex items-center'>
              {props.variant==='sMessage' &&<Check className="w-5 h-5 text-green-700 mr-2"/>}
              {props.variant==='iMessage' &&<Info className="w-5 h-5 text-blue-700 mr-2"/>}
              {props.variant==='eMessage' &&<CircleX className="w-5 h-5 text-red-700 mr-2"/>}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
