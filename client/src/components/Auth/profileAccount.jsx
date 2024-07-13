import React from 'react';
import SignOutButton from '../Buttons/buttonLogout';

const ProfileAccount = ({ user }) => {
  return (
    <>
      {user && 
        <div className="flex flex-col items-start gap-2 pb-3 text-sm md:flex-row md:items-center mx-2">
          <div className="flex flex-wrap gap-1 text-neutral-500">
            <p>Signed in as</p>
            <p className="font-medium">{user.displayName}</p>
            <p>{user.email}</p>
          </div>
          <div className="hidden text-neutral-500 md:block">•</div>
          <SignOutButton />
        </div>
      }
    </>
  );
};

export default ProfileAccount;
