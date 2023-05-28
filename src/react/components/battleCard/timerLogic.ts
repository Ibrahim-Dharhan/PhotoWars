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

const startTimer = (deadline, setTimeRemaining, setExpired) => {
  const { total, days, hours, minutes, seconds } = getTimeRemaining(deadline);
  if (total >= 0) {
    const dd = `${days < 10 ? '0' : ''}${days}d:`;
    const hh = `${hours < 10 ? '0' : ''}${hours}h:`;
    const mm = `${minutes < 10 ? '0' : ''}${minutes}m:`;
    const ss = `${seconds < 10 ? '0' : ''}${seconds}s`;
    setTimeRemaining(dd + hh + mm + ss);
  } else {
    setTimeRemaining('00d:00h:00m:00s');
    setExpired(true);
  }
};

const updateDeadline = (deadline, _timerEvent, setTimeRemaining, setExpired) => {
  if (_timerEvent.current) clearInterval(_timerEvent.current);
  const newTimerEvent = setInterval(() => {
    startTimer(deadline, setTimeRemaining, setExpired);
  }, 1000);
  _timerEvent.current = newTimerEvent;
};

export { updateDeadline };
