const getTimeRemaining = (deadline) => {
  const total = deadline - new Date();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  return {
    total, hours, minutes, seconds
  };
};

const startTimer = (deadline, setTimeRemaining) => {
  const { total, hours, minutes, seconds } = getTimeRemaining(deadline);
  if (total >= 0) {
    setTimeRemaining(
      (hours > 9 ? hours : '0' + hours) + ':' +
      (minutes > 9 ? minutes : '0' + minutes) + ':'
      + (seconds > 9 ? seconds : '0' + seconds)
    )
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
