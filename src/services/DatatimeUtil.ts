// TODO import according to i18n
import 'dayjs/locale/es-mx';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);

export default dayjs;
