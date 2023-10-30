import {DateTime} from 'luxon';

export enum DateTimeFormat {
    DATE = 'DATE',
    TIME = 'TIME',
    DATE_TIME = 'DATE_TIME',
    DATE_OR_TIME = 'DATE_OR_TIME',
    TIME_OR_DATE_TIME = 'TIME_OR_DATE_TIME',
    YEAR = 'YEAR',
    YEAR_MONTH_DAY = 'YEAR_MONTH_DAY',
}

export const formatDateTime = (datetime: string | undefined, format: DateTimeFormat): string => {
    if (!datetime) {
        return '';
    }
    const dt = DateTime.fromISO(datetime);
    const now = DateTime.local();
    switch (format) {
        case DateTimeFormat.DATE:
            return dt.toFormat('d.M.yyyy');
        case DateTimeFormat.TIME:
            return dt.toFormat('H:mm');
        case DateTimeFormat.DATE_TIME:
            return dt.toFormat('d.M.yyyy  H:mm');
        case DateTimeFormat.YEAR:
            return dt.toFormat('yyyy');
        case DateTimeFormat.YEAR_MONTH_DAY:
            return dt.toFormat('yyyy-MM-dd');
        case DateTimeFormat.DATE_OR_TIME:
            if (dt.hasSame(now, 'day')) {
                return dt.toFormat('H:mm');
            }
            return dt.toFormat('d.M.yyyy');
        case DateTimeFormat.TIME_OR_DATE_TIME:
            if (dt.hasSame(now, 'day')) {
                return dt.toFormat('H:mm');
            }
            return dt.toFormat('d.M.yyyy, H:mm');
        default:
            return dt.toFormat('d.M.yyyy H:mm');
    }
};
