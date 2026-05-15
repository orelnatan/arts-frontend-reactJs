import { useState } from 'react';

import './UserThumbnail.scss';

interface UserThumbnailProps {
  image?: string;
  name?: string;
}

export default function UserThumbnail({
  image,
  name
}: UserThumbnailProps) {
  const [isBroken, setIsBroken] = useState(false);

  const showFallback = !image || isBroken;

  return (
    <div className='user-thumbnail-main'>
      {showFallback ? (
        <span className='font-size-24 assistant-bold'>
          {name?.charAt(0).toUpperCase() || '?'}
        </span>
      ) : (
        <img 
          src={image} 
          alt={name || "User Thumbnail"} 
          onError={() => setIsBroken(true)} 
        />
      )}
    </div>
  );
}