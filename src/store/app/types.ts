export interface AppState {
  appIsLoaded: boolean;
  language: 'es' | 'en' | '';
  countryCode: string;
  screenLoading: boolean;
}
