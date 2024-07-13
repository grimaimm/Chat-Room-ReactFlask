// SignOutButton.js
import React from 'react';
import { auth } from '../Auth/getAuth';

const SignOutButton = () => {
  const signOut = () => {
    auth.signOut()
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error("Error signing out:", error);
      });
  };

  return (
      <button
        onClick={signOut}
        className="flex cursor-pointer items-center gap-1 font-medium text-red-500"
        data-umami-event="Sign Out from Chat Page"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="cursor-pointer text-red-500"
          height={16}
          width={16}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span>Sign Out</span>
      </button>
  );
};

export default SignOutButton;
