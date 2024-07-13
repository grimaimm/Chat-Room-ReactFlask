import React from 'react';
import { format } from 'date-fns';

export const formatDate = (timestamp) => {
    return format(new Date(timestamp), 'MM/dd/yyyy, HH:mm');
};

const MessageTime = ({ timestamp }) => {
    return (
        <div className="text-xs text-neutral-500">
            {formatDate(timestamp)}
        </div>
    );
};

export default MessageTime;
