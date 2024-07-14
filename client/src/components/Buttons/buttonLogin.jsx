import React from 'react';
import AuthLogin from '../Auth/loginAuth';

const Login = ({ setUser }) => {
  return (
    <div className="bg-[#121212] mt-2 flex flex-col items-center gap-x-1 p-4 rounded-t-xl md:rounded-b-xl rounded-b-[42px]">
      <div className="mb-1 space-y-4 py-2 text-center text-neutral-700">
        {/* <h1 className="text-xl font-medium">" JAWA DILARANG LOGIN "</h1> */}
        <p className="text-sm text-[#a7a7a7]">Please sign in to start. Don't worry, your data is safe.</p>
        <div class="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-5">
          <AuthLogin setUser={setUser} />
        </div>
      </div>
    </div>
  );
};

export default Login;
