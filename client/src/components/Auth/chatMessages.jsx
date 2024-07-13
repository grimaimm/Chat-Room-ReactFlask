import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AuthorIcon from '../Commons/Author';
import Username from '../Commons/userName';
import MessageTime from '../Commons/messageTime';
import UserImage from '../Commons/userImage';
import MessageForm from '../Form/formMessage';
import ProfileAccount from '../Auth/profileAccount';

const ChatMessages = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userPhotos, setUserPhotos] = useState({});

  useEffect(() => {
    axios.get('https://unforaimv1.pythonanywhere.com/messages')
      .then(response => {
        const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setMessages(sortedMessages);

        const photos = {};
        sortedMessages.forEach(msg => {
          if (msg.user.photoURL && !photos[msg.user.email]) {
            photos[msg.user.email] = msg.user.photoURL;
          }
        });
        setUserPhotos(photos);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        text: newMessage,
        user: {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email
        },
        timestamp: new Date().toISOString()
      };

      axios.post('https://unforaimv1.pythonanywhere.com/messages', message)
        .then(response => {
          const updatedMessages = [message, ...messages];
          const sortedMessages = updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          setMessages(sortedMessages);
          setNewMessage('');

          if (!userPhotos[user.email]) {
            setUserPhotos(prevPhotos => ({
              ...prevPhotos,
              [user.email]: user.photoURL
            }));
          }
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  };

  const formatMessageText = (text) => {
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, index) => {
      return part.startsWith('@') ? (
        <span key={index} className="text-yellow-500 font-bold">{part}</span>
      ) : (
        <span key={index}>{part}</span>
      );
    });
  };

  const handleReply = (username) => {
    const cleanUsername = username.replace(/\s+/g, '');
    setNewMessage(`@${cleanUsername} `);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-2 chat-container">
      <div className="flex-1 space-y-2 overflow-y-auto messages">
        {messages.map((msg, index) => (
          msg.user.email === 'muhammadrahim.mr196@gmail.com' ? (
            <div key={index} className="flex justify-end">
              <div className="flex items-start justify-end gap-3 px-2 p-2 w-full">
                <div className="space-y-1">
                  <div className="flex flex-col items-end gap-3 md:flex-row-reverse">
                    <div className="flex items-center gap-2">
                      <AuthorIcon />
                      <Username displayName={msg.user.displayName} />
                    </div>
                  </div>
                  <div className="group flex items-center justify-end gap-3 box-message w-full">
                    <button
                      className="icon-reply-user hidden group-hover:flex"
                      onClick={() => handleReply(msg.user.displayName)}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="#000000"
                        viewBox="0 -32 576 576"
                        xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(0)matrix(-1, 0, 0, -1, 0, 0)"
                      >
                        <path d="M136.309 189.836L312.313 37.851C327.72 24.546 352 35.348 352 56.015v82.763c129.182 10.231 224 52.212 224 183.548 0 61.441-39.582 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 38.512-123.162-3.922-169.482-112.59-182.015v84.175c0 20.701-24.3 31.453-39.687 18.164L136.309 226.164c-11.071-9.561-11.086-26.753 0-36.328zm-128 36.328L184.313 378.15C199.7 391.439 224 380.687 224 359.986v-15.818l-108.606-93.785A55.96 55.96 0 0 1 96 207.998a55.953 55.953 0 0 1 19.393-42.38L224 71.832V56.015c0-20.667-24.28-31.469-39.687-18.164L8.309 189.836c-11.086 9.575-11.071 26.767 0 36.328z"></path>
                      </svg>
                    </button>
                    <p className="max-w-md rounded-xl rounded-tr-none bg-neutral-200 px-3 py-2 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 group-hover:dark:bg-neutral-700">
                      {formatMessageText(msg.text)}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <MessageTime timestamp={msg.timestamp} />
                  </div>
                </div>
                <UserImage alt="author" src={msg.user.photoURL} />
              </div>
            </div>
          ) : (
            <div key={index} className="flex justify-start">
              <div className="flex items-start justify-start gap-3 px-2 p-2 w-full">
                <UserImage alt="user" src={msg.user.photoURL} />
                <div className="space-y-1">
                  <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                      <Username displayName={msg.user.displayName} />
                      <div className="hidden md:flex">
                        <MessageTime timestamp={msg.timestamp} />
                      </div>
                    </div>
                  </div>
                  <div className="group flex items-center justify-start gap-3 box-message w-full">
                    <p className="max-w-md rounded-xl rounded-tl-none bg-neutral-200 px-3 py-2 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 group-hover:dark:bg-neutral-700">
                      {formatMessageText(msg.text)}
                    </p>
                    <button
                      className="icon-reply-user hidden group-hover:flex"
                      onClick={() => handleReply(msg.user.displayName)}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="#000000"
                        viewBox="0 -32 576 576"
                        xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(0)matrix(1, 0, 0, -1, 0, 0)"
                      >
                        <path d="M136.309 189.836L312.313 37.851C327.72 24.546 352 35.348 352 56.015v82.763c129.182 10.231 224 52.212 224 183.548 0 61.441-39.582 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 38.512-123.162-3.922-169.482-112.59-182.015v84.175c0 20.701-24.3 31.453-39.687 18.164L136.309 226.164c-11.071-9.561-11.086-26.753 0-36.328zm-128 36.328L184.313 378.15C199.7 391.439 224 380.687 224 359.986v-15.818l-108.606-93.785A55.96 55.96 0 0 1 96 207.998a55.953 55.953 0 0 1 19.393-42.38L224 71.832V56.015c0-20.667-24.28-31.469-39.687-18.164L8.309 189.836c-11.086 9.575-11.071 26.767 0 36.328z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-start md:hidden">
                    <MessageTime timestamp={msg.timestamp} />
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      <MessageForm
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        user={user}
      />
      <ProfileAccount user={user} />
    </div>
  );
};

export default ChatMessages;
