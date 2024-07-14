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
            className="mt-[4px] rounded-full md:w-10 md:h-10 h-8 w-8"
            src={src}
        />
    );
};

export default UserImage;
