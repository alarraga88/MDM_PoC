// pages/Callback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userManager from '../auth/AuthService';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(() => {
        navigate('/dashboard'); // or "/" if that's your landing page
      })
      .catch((err) => {
        console.error('Signin redirect callback error:', err);
      });
  }, [navigate]);

  return <p className="text-center mt-10">Processing login...</p>;
};

export default Callback;
