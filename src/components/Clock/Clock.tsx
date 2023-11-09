import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => updateTime(), 1000);

    function updateTime() {
      setTime(new Date());
    }

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div>
      {time.toLocaleTimeString()}
    </div>
  );
};

export default Clock;
