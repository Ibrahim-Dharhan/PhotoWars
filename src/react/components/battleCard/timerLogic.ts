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

const startTimer = (deadline, setTimeRemaining) => {
  const { total, days, hours, minutes, seconds } = getTimeRemaining(deadline);
  if (total >= 0) {
    /*
    const dd = days > 0 ? `${days} day${days === 1 ? '' : 's'}, `: '';
    const hh = hours > 0 ? `${hours} hour${hours === 1 ? '' : 's'}, `: '';
    const mm = minutes > 0 ? `${minutes} minute${minutes === 1 ? '' : 's'}, `: '';
    const ss = seconds > 0 ? `${seconds} second${seconds === 1 ? '' : 's'} `: '';
    */
    const dd = days > 0 ? `${days}d:` : '';
    const hh = hours > 0 ? `${hours}h:`: '';
    const mm = minutes > 0 ? `${minutes}m:`: '';
    const ss = seconds > 0 ? `${seconds}s`: '';
    setTimeRemaining(dd + hh + mm + ss);
  } else {
    setTimeRemaining('00:00:00');
  }
};

const updateDeadline = (deadline, _timerEvent, setTimeRemaining) => {
  if (_timerEvent.current) clearInterval(_timerEvent.current);
  const newTimerEvent = setInterval(() => {
    startTimer(deadline, setTimeRemaining);
  }, 1000);
  _timerEvent.current = newTimerEvent;
};

export { updateDeadline };
