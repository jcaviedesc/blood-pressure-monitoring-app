import { mapValues } from 'lodash';
import type { SingUpState } from '../store/singup/types';
import { cleanObject } from './utils';

type UserFromApp = SingUpState & { profile_url: string };

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
  address = 'NaN',
  location,
  gender,
  weight,
  height,
  birthdate,
  userType,
  healtInfo,
  profile_url,
}: UserFromApp) => {
  const userApi = cleanObject({
    full_name: fullName,
    phone_number: phone,
    address: address,
    // location, TODO
    gender: GenderEnun[gender],
    birthdate,
    height: {
      val: height / 100,
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

// "{"full_name":"Juan Camilo caviedes","phone_number":"+573202878844","address":"NaN","gender":"M","birthdate":"1997-01-22","height":{"val":163,"unit":"m"},"weight":{"val":78,"unit":"Kg"},"user_type":1}"
