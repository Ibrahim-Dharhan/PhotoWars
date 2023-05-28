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
    let remainingTime = '';
    if (days > 0) {
      remainingTime = `${days}d left`;
    } else if (hours > 0) {
      remainingTime = `${hours}h left`;
    } else {
      remainingTime = `${minutes}m left`;
    }
    setTimeRemaining && setTimeRemaining(remainingTime);
    if (expired) setExpired(false);
  } else {
    setTimeRemaining && setTimeRemaining('Finished');
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
