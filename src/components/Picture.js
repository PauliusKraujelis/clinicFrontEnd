import React from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const Picture = () => {
  return (
    <div className="picture-container">
      <img className="picture-image" src={process.env.PUBLIC_URL + 'back.jpg'} alt="Patient" />
      <div className="form-container">
        <LoginForm /> 
        <RegisterForm />
      </div>
    </div>
  );
};

export default Picture;
