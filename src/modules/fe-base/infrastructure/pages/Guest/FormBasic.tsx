import React from 'react';
import { AutoForm } from 'uniforms-semantic';

import { bridge as schema } from './GuestSchema';

const  GuestFormBasic: React.FC = () => {
  return <AutoForm schema={schema} onSubmit={console.log} />;
}

export default GuestFormBasic;