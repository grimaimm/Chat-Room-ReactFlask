import React from 'react';

const UserImage = ({ alt, src }) => {
    return (
        <img
            alt={alt}
            loading="lazy"
            width="40"
            height="40"
            decoding="async"
            data-nimg="1"
            className="mt-1 rounded-full border dark:border-neutral-800"
            src={src}
        />
    );
};

export default UserImage;
