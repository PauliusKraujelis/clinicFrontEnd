import React from 'react';
import { useTranslation } from 'react-i18next';
import './languageSelector.css';
import i18n from '../i18n';
import { ButtonGroup } from '@mui/material';

const LanguageSelector = () => {
  const { t } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-selector">
      <ButtonGroup>
      <button
        className="lan-button" 
        onClick={() => handleLanguageChange('en')}
      >
        {t('languageSelector.english')}
      </button>
      <button
        className="lan-button" 
        onClick={() => handleLanguageChange('lt')}
      >
        {t('languageSelector.lithuanian')}
      </button>
      </ButtonGroup>
    </div>
  );
};

export default LanguageSelector;
