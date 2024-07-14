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
import { Timestamp } from 'firebase/firestore';

export const formatDate = (timestamp) => {
    let date;
    if (timestamp instanceof Timestamp) {
        date = timestamp.toDate();
    } else {
        date = new Date(timestamp);
    }
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    return format(date, 'dd/MM/yyyy, HH:mm');
};

const MessageTime = ({ timestamp }) => {
    return (
        <div className="text-xs text-[rgba(167,167,167,0.5)]">
            {formatDate(timestamp)}
        </div>
    );
};

export default MessageTime;
