import { FC, useState } from 'react';

const Warning: FC = () => {
  const [warningWindow, setWarningWindow] = useState(false);

  onkeydown = (e) => {
    if ((e.ctrlKey && e.keyCode == 'R'.charCodeAt(0)) || e.key == 'F5') {
      e.preventDefault();
      setWarningWindow(true);
    }
  };

  const onClickYes = () => {
    window.location.assign('/');
  };

  const onClickNo = () => {
    setWarningWindow(false);
  };

  return warningWindow ? (
    <div className="modal modal--warning">
      <div className="modal__subtitle">Do you want to leave the game?</div>
      <div className="btn-wrapper">
        <button className="ok" onClick={() => onClickYes()}>
          Yes
        </button>
        <button className="ok" onClick={() => onClickNo()}>
          No
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Warning;
