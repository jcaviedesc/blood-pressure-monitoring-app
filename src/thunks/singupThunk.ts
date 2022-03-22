import type { SaveUserPayload } from './types';
import { userToApi } from '../services/user.transform';
import { selectUser, clear } from '../store/singup/singupSlice';
import firebaseStoreService from '../services/FirebaseStore';
import { updateUserProfileFromSingup } from '../store/user/userSlice';
import { snakeCaseToCamelCase } from '../services/utils';
import { setScreenLoading } from '../store/app/appSlice';
import type {
  AppDispatch,
  AppGetState,
  ClientApi,
} from '../store/configureStore';
import { RegisterUser } from '../services/api/types';
import { userFromApi } from '../store/user/types';

export const saveUser = ({ navigation, authProviderId }: SaveUserPayload) => {
  return async function saveUserThunk(
    dispatch: AppDispatch,
    getState: AppGetState,
    client: ClientApi,
  ) {
    dispatch(setScreenLoading(true));
    const user = selectUser(getState());
    const { picture } = user;

    let profile_url = '';
    if (picture.uri !== '') {
      const photoURL = await firebaseStoreService(
        `profile-pic.${picture.type?.split('/')[1]}`,
        picture.uri,
        `users/${authProviderId}/images`,
      );
      profile_url = photoURL;
    }
    const userTransformed = userToApi({ ...user, profile_url }) as RegisterUser;

    const response = await client.registerUser(userTransformed);
    if (response.status === 201) {
      console.log(response);
      dispatch(clear());
      const transformUser = snakeCaseToCamelCase(response.data) as userFromApi;
      dispatch(updateUserProfileFromSingup(transformUser));
      navigation.navigate('Home');
    }
    dispatch(setScreenLoading(false));
  };
};
