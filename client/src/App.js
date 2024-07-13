import React, { useState, useEffect } from 'react';
import { auth } from './components/Auth/getAuth';
import { onAuthStateChanged } from 'firebase/auth';
import TitlePage from './components/Commons/titlePage';
import ChatMessages from './components/Auth/chatMessages';
import LoginUser from './components/Buttons/buttonLogin';
import Skeleton from 'react-loading-skeleton';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App min-h-screen md:min-h-fit max-w-[768px] mx-auto card-1 overflow-hidden lg:my-4">
      <main className="no-scrollbar w-full scroll-smooth transition-all duration-300 pb-0">
        <div className="h-screen flex flex-col p-2">
        {loading ? (
            <Skeleton />
        ) : (
          <>
            <TitlePage />
            <ChatMessages user={user} />
            {!user && <LoginUser setUser={setUser} />}
          </>
        )}
        </div>
      </main>
    </div>
  );
}

export default App;
