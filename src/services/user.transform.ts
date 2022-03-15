import { mapValues } from 'lodash';
import type { userState } from '../store/singup/types';
import { cleanObject } from './utils';

type UserFromApp = userState & { profile_url: string };

const UserEnun = {
  healthUser: 1,
  normalUser: 2,
  '': 2,
};

const healthInfoEnum = {
  yes: 'Y',
  not: 'N',
  'not know': 'NK',
  '': '',
};

const GenderEnun = {
  male: 'M',
  female: 'F',
};

export const userToApi = ({
  fullName,
  phone,
  address,
  location,
  gender,
  weight,
  stature,
  birthdate,
  userType,
  healtInfo,
  profile_url,
}: UserFromApp) => {
  const userApi = cleanObject({
    full_name: fullName,
    phone_number: phone,
    address,
    // location, TODO
    gender: GenderEnun[gender],
    birthdate,
    height: {
      val: stature,
      unit: 'm', //TODO get from UI
    },
    weight: {
      val: weight,
      unit: 'Kg', //TODO get from UI
    },
    user_type: UserEnun[userType],
    profile_url,
  });

  if (userApi.user_type === 2) {
    userApi.health_info = mapValues(healtInfo, value => healthInfoEnum[value]);
  }
  return userApi;
};
