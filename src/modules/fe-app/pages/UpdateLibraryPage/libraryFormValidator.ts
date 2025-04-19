import * as yup from 'yup';
export const schemaUpdateLibraryForm = yup.object().shape({
  library: yup.string().required('El nombre de la librería es obligatorio'),
  id: yup.string().required('El id es obligatorio'),
  version: yup
    .string()
    .required('La versión es obligatoria')
    .typeError('Este campo debe ser un string'),
  type: yup.string().required('El tipo de librería es obligatorio'),
  license: yup.string().required('El tipo de licencia es obligatorio'),
  link: yup
    .string()
    .url('El link debe ser una URL válida')
    .required('El link es obligatorio'),
  securityState: yup.string().required('El estado de seguridad es obligatorio'),
});
