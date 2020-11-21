import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
  const [initialValue, setInitialValue] = useState(null);

  useEffect(() => {
    console.log('mounted');
  }, []);

  return (
    <>
        Mounted!
    </>
    )
};

export default RegisterUser;
