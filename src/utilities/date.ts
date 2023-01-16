// 1000 (ms) * 60 (sec) * 60 (min)
const ONE_HOUR = 1000 * 60 * 60;

export const elapsedOneHour = (timestamp: number) => {
  const oneHourAgo = Date.now() - ONE_HOUR;

  return oneHourAgo > timestamp;
};
