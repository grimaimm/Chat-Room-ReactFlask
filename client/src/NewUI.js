import React, { useState, useEffect } from 'react';
import { auth } from './components/Auth/getAuth';
import { onAuthStateChanged } from 'firebase/auth';
import TitlePage from './components/Commons/titlePage';
import ChatMessages from './components/Auth/chatMessageeNewUI';
import LoginUser from './components/Buttons/buttonLogin';
import Skeleton from 'react-loading-skeleton';
// import BgAnimation from './components/Styles/bgAnimation';
import { requestNotificationPermission, showNotification } from './components/Auth/getAuth';
import './NewUI.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        requestNotificationPermission()
          .then(() => {
            console.log('Notification permission granted.');
          })
          .catch((err) => {
            console.error('Failed to get permission:', err);
          });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  
  const handleReplyNotification = (username) => {
    showNotification(username + ' telah membalas pesan anda');
  };

  return (
    <div className="NewUI w-screen h-screen bg-[#000000] lg:p-5 p-2">
      <div className="bg-[#00000] max-w-[768px] rounded-lg h-full mx-auto overflow-hidden">
        <main className="no-scrollbar w-full h-full scroll-smooth transition-all duration-300">
          <div className="h-full flex flex-col">
            {loading ? (
              <Skeleton />
            ) : (
              <>
                {!user && <TitlePage />}
                <ChatMessages user={user} onReply={handleReplyNotification} />
                {!user && <LoginUser setUser={setUser} />}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
