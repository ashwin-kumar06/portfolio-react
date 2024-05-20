import React, { useEffect } from 'react';
import loadingBot from '../logos/loadingBot.gif';
import { useNavigate } from 'react-router-dom';

const ProgressBar = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(intervalId);
          setTimeout(() => {
            navigate('/home');
          }, 3000); // Delay the navigation by 3 seconds (3000ms)
          return 100;
        } else {
          return prevProgress + 1;
        }
      });
    }, 60);
  
    return () => clearInterval(intervalId);
  }, [navigate]); // Increase the interval time to 100ms
  

  return (
    <div className="">
      <div id="progressive">
        <div>
          <img src={loadingBot} style={{ width: 300 }} alt="Loading..." />
        </div>
        <div className="progress" id="shadow">
          <div
            className="progress-bar progress-bar-danger six-sec-ease-in-out"
            role="progressbar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;