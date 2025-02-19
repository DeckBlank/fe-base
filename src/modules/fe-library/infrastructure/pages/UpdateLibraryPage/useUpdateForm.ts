import { useState } from 'react';

export const useUpdateForm = <T>(initialState: T) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return {
    formValues,
    handleChange,
    setFormValues,
  };
};
