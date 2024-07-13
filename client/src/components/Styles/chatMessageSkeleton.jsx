import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChatMessageSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-2 chat-container">
      <div className="flex-1 space-y-2 overflow-y-auto messages p-2">
        <Skeleton height={60} />
      </div>
    </div>
  );
};

export default ChatMessageSkeleton;
