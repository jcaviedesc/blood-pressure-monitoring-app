import { useCallback, useReducer } from 'react';

const initialState = {
  selectedTab: 'patients',
  professionals: '',
  patients: '',
  keywords: '',
};

const ACTIONS = {
  update_patients: 'UPDATE_PATIENTS',
  update_professionals: 'UPDATE_PROFESSIONALS',
  change_tab: 'CHANGE_TAB',
  update_keywords: 'UPDATE_KEYWORDS',
};

type Inizializer = typeof initialState;

type SelectedTab = 'professionals' | 'patients';

function selfCareReducer(state: Inizializer, action: any) {
  console.log('action', action);
  switch (action.type) {
    case ACTIONS.update_patients:
      return { ...state, patients: action.payload };
    case ACTIONS.update_professionals:
      return { ...state, professionals: action.payload };
    case ACTIONS.change_tab:
      return { ...state, selectedTab: action.payload };
    case ACTIONS.update_keywords:
      return { ...state, keywords: action.payload };
    default:
      throw new Error('Not action supported');
  }
}

export const useSelfCareForm = () => {
  const [state, dispatch] = useReducer(selfCareReducer, initialState);

  // TODO borrar
  console.log('useSelfCareForm.state', state);

  const tabEditorContent = state[state.selectedTab as keyof Inizializer];

  const formIsComplete =
    state.patients !== '' &&
    state.professionals !== '' &&
    state.keywords !== '';

  const updateEditorByUser = useCallback(
    (user: SelectedTab, payload: string) => {
      dispatch({ type: ACTIONS[`update_${user}`], payload });
    },
    [],
  );

  const updateTab = useCallback((tab: SelectedTab) => {
    dispatch({ type: ACTIONS.change_tab, payload: tab });
  }, []);

  const updatekeywords = useCallback((keywords: string) => {
    dispatch({ type: ACTIONS.update_keywords, payload: keywords });
  }, []);

  return {
    state,
    tabEditorContent,
    formIsComplete,
    updateEditorByUser,
    updateTab,
    updatekeywords,
  };
};
