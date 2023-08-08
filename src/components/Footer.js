import React from 'react';
import './footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <p>{t('footerElement.email')} info@example.com</p>
        <p>{t('footerElement.phone')} +1 123-456-7890</p>
      </div>
    </footer>
  );
};

export default Footer;
