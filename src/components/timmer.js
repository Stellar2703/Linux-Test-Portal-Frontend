import React, { useState, useEffect } from "react";
import { FaStopwatch } from "react-icons/fa"; // Import FontAwesome stopwatch icon

function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    return {
      hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((difference / (1000 * 60)) % 60), 0),
      seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval
  }, [targetDate]);

  const padTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="flex items-center bg-gray-100 text-black px-3 py-1.5 rounded-md space-x-6">
      {/* Icon */}
      <div className="text-blue-800 text-2xl">
        <FaStopwatch />
      </div>

      {/* "Time Left" Label */}
      <div className="text-  text-gray-800">Time Left:</div>

      {/* Time and Labels */}
      <div className="flex flex-col items-center">
        {/* Time */}
        <div className="flex text-lg font-mono font-semibold space-x-2">
          <span>{padTime(timeLeft.hours)}</span>:
          <span>{padTime(timeLeft.minutes)}</span>:
          <span>{padTime(timeLeft.seconds)}</span>
        </div>
        {/* Labels */}
        <div className="text-xs text-gray-900 flex space-x-4">
          <span>Hrs</span>
          <span>Min</span>
          <span>Sec</span>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
