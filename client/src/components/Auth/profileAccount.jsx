import React, { useState, useEffect } from 'react';
import SignOutButton from '../Buttons/buttonLogout';

const truncateUsername = (username) => {
  if (window.innerWidth <= 768) {
    return username.length > 15 ? username.slice(0, 15) + '...' : username;
  }
  return username;
};

const ProfileAccount = ({ user }) => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (user && user.displayName) {
      setDisplayName(truncateUsername(user.displayName));
    }

    const handleResize = () => {
      if (user && user.displayName) {
        setDisplayName(truncateUsername(user.displayName));
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [user]);

  return (
    <>
      {user && 
        // <div className="bg-yellow-300 flex flex-col items-start gap-2 pb-3 text-sm md:flex-row md:items-center p-4">
        //   <div className="flex flex-wrap gap-1 text-neutral-500">
        //     <p>Signed in as</p>
        //     <p className="font-medium">{user.displayName}</p>
        //     <p>{user.email}</p>
        //   </div>
        //   <div className="hidden text-neutral-500 md:block">•</div>
        //   <SignOutButton />
        // </div>
        <div className='profile-acc flex justify-between items-center p-3 rounded-xl mb-2'>
          <div className='image'>
            <img
              alt="user"
              loading="lazy"
              width="40"
              height="40"
              decoding="async"
              data-nimg="1"
              className="rounded-full md:w-13 md:h-13 w-11 h-11"
              src={user.photoURL}
            />
          </div>
          <div className='username text-center'>
            <p className="font-semibold text-lg text-white">{displayName}</p>
          </div>
          <div className='logout flex justify-center items-center'>
            <SignOutButton />
          </div>
        </div>
      }
    </>
  );
};

export default ProfileAccount;
