import React from 'react';
import Skeleton from 'react-loading-skeleton';

const TitlePageSkeleton = () => {
  return (
    <div className='p-4'>
      <h1 class="text-2xl font-medium"><Skeleton width={310}/></h1>
      <p class="border-b border-dashed border-neutral-600 pb-6 pt-2 text-neutral-600"><Skeleton width={510}/></p>
    </div>
  );
};

export default TitlePageSkeleton;