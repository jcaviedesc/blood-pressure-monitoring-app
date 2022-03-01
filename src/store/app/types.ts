export interface AppState {
  appIsLoaded: boolean;
  isOpenAppFirstTime: boolean;
  hasUserActiveSession: boolean;
  lenguage: 'es' | 'en' | '';
  countryCode: string;
  screenLoading: boolean;
}
