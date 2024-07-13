import React from 'react';

const MessageForm = ({ newMessage, setNewMessage, sendMessage, user }) => {
    return (
      <>
        {user && (
          <div className="flex items-center gap-x-1 border-t border-dashed border-neutral-600 pt-4 pb-3 mx-2 mt-4">
            <input
              className="flex-grow rounded-md border p-2 focus:outline-none dark:border-neutral-600"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message"
            />

            <button
              onClick={sendMessage}
              type="submit"
              className="ml-2 rounded-md p-3 text-white !bg-neutral-600"
              data-umami-event="Chat Widget: Send Chat"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height={18}
                width={18}
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1={22} y1={2} x2={11} y2={13} />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        )}
      </>
    );
};

export default MessageForm;
