import React, { useCallback, useEffect } from 'react';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
  selectAppLocale,
  setLenguage,
  setCountry,
} from '../store/app/appSlice';
interface ILocalizationProvider {
  children: Element[] | Element;
}

export const translate = memoize(
  (key: string, config?: object) => i18n.t(key, config),
  (key: string, config?: object) =>
    config ? key + JSON.stringify(config) : key,
);

interface ILocalizationContext {
  translate: typeof translate;
  changeLenguage: (languageTag: 'es' | 'en') => void | (() => void);
}
const LocalizationContext = React.createContext({
  translate,
  changeLenguage: () => {},
} as ILocalizationContext);

export const LocalizationProvider = ({ children }: ILocalizationProvider) => {
  const { lenguage, countryCode } = useAppSelector(selectAppLocale);
  const dispatch = useAppDispatch();
  const translationGetters = React.useMemo(() => {
    return {
      en: () => require('../locales/en.json'),
      es: () => require('../locales/es.json'),
    };
  }, []);

  const setI18nConfig = useCallback(() => {
    const fallback = { languageTag: 'en', isRTL: false };
    translate?.cache?.clear();
    // TODO validar que carge antes persitStore
    if (lenguage === '') {
      const { languageTag } =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
        fallback;
      dispatch(setLenguage(languageTag));
      i18n.translations = { [languageTag]: translationGetters[languageTag]() };
      i18n.locale = languageTag;
    } else {
      i18n.translations = { [lenguage]: translationGetters[lenguage]() };
      i18n.locale = lenguage;
    }
  }, [translationGetters, dispatch, lenguage]);

  useEffect(() => {
    setI18nConfig();
    if (!countryCode) {
      const country = RNLocalize.getCountry();
      dispatch(setCountry(country));
    }
  }, [setI18nConfig, dispatch, countryCode]);

  const changeLenguage = (languageTag: 'es' | 'en') => {
    translate.cache?.clear();
    dispatch(setLenguage(languageTag));
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    console.log(i18n.translations);
    i18n.locale = languageTag;
    // TODO Reload app
  };

  return (
    <LocalizationContext.Provider
      value={{
        translate,
        changeLenguage,
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
