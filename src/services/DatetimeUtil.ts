import 'dayjs/locale/es-mx';
import 'dayjs/locale/es';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.updateLocale('es', {
  weekStart: 1,
});

dayjs.updateLocale('en', {
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

export const getWeekRange = (date: dayjs.Dayjs) => {
  return [date.startOf('w').format(), date.endOf('w').format()];
};

// puede que esto se vea raro pero funciona
const Dayjs = dayjs;
// dayjs.locale('es');
export const changeLocaleDayjs = (locale: string) => {
  Dayjs.locale(locale);
};

export default Dayjs;
