import React from 'react';

const Picture = () => {
  return (
    <div className="picture-container">
      <img className="picture-image" src={process.env.PUBLIC_URL + 'back.jpg'} alt="Patient" />
    </div>
  );
};

export default Picture;
