import dayjs from 'dayjs';
export const delay = (ms: number) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve('');
    }, ms),
  );

export const getTimeDifference = inputTime => {
  const now = dayjs();
  const input = dayjs(inputTime);
  const diffInDays = now.diff(input, 'day');
  const diffInHours = now.diff(input, 'hour');
  const diffInMinutes = now.diff(input, 'minute');

  if (diffInDays > 5) {
    return input.format('YYYY-MM-DD HH:mm:ss');
  } else if (diffInDays > 1) {
    return `${diffInDays} 天前`;
  } else if (diffInHours > 1) {
    return `${diffInHours} 小时前`;
  } else if (diffInMinutes > 1) {
    return `${diffInMinutes} 分钟前`;
  }
  return input.format('YYYY-MM-DD HH:mm:ss');
};
