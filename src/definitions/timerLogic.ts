const getTimeRemaining = (deadline) => {
  const total = deadline - Date.now();
  const totalSeconds = Math.floor(total / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor(totalSeconds % (3600 * 24) / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return {
    total, days, hours, minutes, seconds
  };
};

const startTimer = (timerEvent, deadline, setTimeRemaining, setExpired, expired) => {
  const { total, days, hours, minutes, seconds } = getTimeRemaining(deadline);
  if (total >= 0) {
    const dd = `${days < 10 ? '0' : ''}${days}d:`;
    const hh = `${hours < 10 ? '0' : ''}${hours}h:`;
    const mm = `${minutes < 10 ? '0' : ''}${minutes}m:`;
    const ss = `${seconds < 10 ? '0' : ''}${seconds}s`;
    setTimeRemaining && setTimeRemaining(dd + hh + mm + ss);
    if (expired) setExpired(false);
  } else {
    setTimeRemaining && setTimeRemaining('00d:00h:00m:00s');
    clearInterval(timerEvent);
  }
};

const updateDeadline = (deadline, _timerEvent, setTimeRemaining, setExpired, expired) => {
  if (_timerEvent.current) clearInterval(_timerEvent.current);
  const timerEvent = setInterval(() => {
    startTimer(timerEvent, deadline, setTimeRemaining, setExpired, expired);
  }, 1000);
  _timerEvent.current = timerEvent;
};

export { updateDeadline };
