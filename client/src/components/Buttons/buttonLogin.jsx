import React from 'react';
import AuthLogin from '../Auth/loginAuth';

const Login = ({ setUser }) => {
  return (
    <div className="flex flex-col items-center gap-x-1 border-t border-dashed border-neutral-600 lg:pt-2 lg:pb-0 pt-4 pb-2 mx-4 mt-4 lg:mt-2">
      <div className="mb-1 space-y-4 py-3 text-center text-neutral-700">
        <h1 className="text-xl font-medium">" JAWA DILARANG LOGIN "</h1>
        <p className="text-sm">Please sign in to start. Don't worry, your data is safe.</p>
        <div class="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-5">
          <AuthLogin setUser={setUser} />
        </div>
      </div>
    </div>
  );
};

export default Login;
