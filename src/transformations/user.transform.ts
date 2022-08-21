import { mapValues } from 'lodash';
import { SignUpState } from '../store/signup/types';
import { cleanObject } from '../services/utils';

type UserFromApp = SignUpState & { profile_url: string };

const UserEnun = {
  'health professional': 1,
  patient: 2,
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
  address,
  sex,
  weight,
  height,
  birthdate,
  userType,
  healtInfo,
  profile_url,
}: UserFromApp) => {
  const userApi = cleanObject({
    address,
    // location, TODO
    sex: GenderEnun[sex],
    birthdate,
    height: {
      val: parseInt(height, 10) / 100,
      unit: 'm', //TODO get from UI
    },
    weight: {
      val: weight,
      unit: 'Kg', //TODO get from UI
    },
    user_type: UserEnun[userType],
    profile_url,
  });

  if (userApi.user_type === UserEnun.patient) {
    userApi.health_info = mapValues(healtInfo, value => healthInfoEnum[value]);
  }
  return userApi;
};

// "{"full_name":"Juan Camilo caviedes","phone_number":"+573202878844","address":"NaN","gender":"M","birthdate":"1997-01-22","height":{"val":163,"unit":"m"},"weight":{"val":78,"unit":"Kg"},"user_type":1}"
