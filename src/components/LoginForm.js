import React from 'react';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();

  return (
    <div className="login-form">
      <h2>{t('logingForms.login')}</h2>
      <form>
        {/* <div className="form-group">
          <label>{t('logingForms.email')}</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>{t('logingForms.password')}</label>
          <input type="password" required />
        </div> */}
        {/* Login Button */}
        <a className="submit-button" href="http://localhost:8080/login">{t('buttons.loginButton')}</a>

        {/* Logout Button */}
        <a className="submit-button" href="http://localhost:8080/logout">Logout</a>
      </form>
    </div>
  );
};

export default LoginForm;
