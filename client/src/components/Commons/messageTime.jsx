// import React from 'react';
// import { format } from 'date-fns';

// export const formatDate = (timestamp) => {
//     return format(new Date(timestamp), 'MM/dd/yyyy, HH:mm');
// };

// const MessageTime = ({ timestamp }) => {
//     return (
//         <div className="text-xs text-neutral-500">
//             {formatDate(timestamp)}
//         </div>
//     );
// };

// export default MessageTime;


import React from 'react';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore'; // Import Timestamp

export const formatDate = (timestamp) => {
    let date;

    // Check if timestamp is a Firestore Timestamp
    if (timestamp instanceof Timestamp) {
        date = timestamp.toDate(); // Convert to JavaScript Date
    } else {
        date = new Date(timestamp); // Try to create a Date from the timestamp
    }

    // Handle invalid date
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    return format(date, 'MM/dd/yyyy, HH:mm');
};

const MessageTime = ({ timestamp }) => {
    return (
        <div className="text-xs text-neutral-500">
            {formatDate(timestamp)}
        </div>
    );
};

export default MessageTime;
