import React, { useCallback, useEffect } from 'react';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

type TranslationGetter = {
  en: () => JSON;
  es: () => JSON;
};

interface ILocalizationProvider {
  children: Element[] | Element;
}

const translate = memoize(
  (key: string, config?: object) => i18n.t(key, config),
  (key: string, config?: object) =>
    config ? key + JSON.stringify(config) : key,
);

const LocalizationContext = React.createContext({
  translate,
});

export const LocalizationProvider = ({ children }: ILocalizationProvider) => {
  const translationGetters = React.useMemo(() => {
    return {
      en: () => require('../locales/en.json'),
      es: () => require('../locales/es.json'),
    };
  }, []);

  const setI18nConfig = useCallback(() => {
    const fallback = { languageTag: 'en', isRTL: false };
    const { languageTag } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
    translate?.cache?.clear();
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  }, [translationGetters]);

  useEffect(() => {
    setI18nConfig();
    console.log(RNLocalize.getLocales());
    console.log(RNLocalize.getCountry());
  }, [setI18nConfig]);

  return (
    <LocalizationContext.Provider
      value={{
        translate,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useI18nLocate = () => {
  const context = React.useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('usei18nLocate must be used within a LocalizationProvider');
  }
  return context;
};
