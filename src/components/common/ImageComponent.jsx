import React from 'react';

const ImageComponent = ({ src, alt }) => {
  return (
    <div className='img_menu'>
        <img 
          src={src} 
          alt={alt} 
          width={375} 
          height={240}
        /> 
    </div>
  )
}

export default ImageComponent;
