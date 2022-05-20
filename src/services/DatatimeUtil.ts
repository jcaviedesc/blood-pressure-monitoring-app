// TODO import according to i18n
import 'dayjs/locale/es-mx';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.updateLocale('es', {
  weekStart: 1,
});

dayjs.updateLocale('es-mx', {
  weekStart: 1,
});

export const weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export default dayjs;
