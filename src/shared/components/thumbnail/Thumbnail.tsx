import { useState } from 'react';

import './Thumbnail.scss';

interface ThumbnailProps {
  image?: string;
  name?: string;
}

export default function Thumbnail({
  image,
  name
}: ThumbnailProps) {
  const [isBroken, setIsBroken] = useState(false);

  const showFallback = !image || isBroken;

  return (
    <div className='thumbnail-main'>
      {showFallback ? (
        <span className='font-size-24 assistant-bold'>
          {name?.charAt(0).toUpperCase() || '?'}
        </span>
      ) : (
        <img 
          src={image} 
          alt={name || "Thumbnail"} 
          onError={() => setIsBroken(true)} 
        />
      )}
    </div>
  );
}