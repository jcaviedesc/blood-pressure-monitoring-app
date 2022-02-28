type Navigation = {
  navigate: (route: string) => void;
};

export type SaveUserPayload = {
  navigation: Navigation;
  authProviderId: string;
};
