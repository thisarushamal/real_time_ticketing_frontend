import React from 'react';
import '../../src/assets/CSS/ControlPanel.css';

const ControlPanel = ({ isRunning, setIsRunning, addLog }) => {
    const handleStart = () => {
        setIsRunning(true);
        addLog('System started.');
    };

    const handleStop = () => {
        setIsRunning(false);
        addLog('System stopped.');
    };

    return (
        <div className="control-panel">
            <button onClick={handleStart} disabled={isRunning}>
                Start
            </button>
            <button onClick={handleStop} disabled={!isRunning}>
                Stop
            </button>
        </div>
    );
};

export default ControlPanel;
