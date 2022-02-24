import {DateTime} from 'luxon';

export const formatDate = (dateString) => {
    const dateISOString = new Date(dateString).toISOString();
    const formattedDateTime = DateTime.fromISO(dateISOString);
    return formattedDateTime.setLocale('en').toLocaleString(DateTime.DATE_FULL);
}

export const formatCurrency = (amount) => `₦${new Intl.NumberFormat('en-GB').format(amount)}`;
