import moment from 'moment';

export const formatDate = day => {
  return moment(day).format('dddd, MMM D, YYYY');
};

export const formatCalendarDate = day => {
  return moment(day).format('MMMM Do, YYYY');
}