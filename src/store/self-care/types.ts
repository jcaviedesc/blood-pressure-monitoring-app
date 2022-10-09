export interface Editor {
  patient: string;
  professional: string;
}

export interface Owner {
  avatar: string;
  id: string;
  name: string;
}

export interface SelfCareTip {
  editor: Editor;
  id: string;
  keywords: string[];
  owner: Owner;
}

export interface SelfCareState {
  result: SelfCareTip[];
  loading: 'idle' | 'pending';
  currentRequestId: undefined | string;
  error: null | Record<string, unknown>;
}
