import React from 'react';
import { startSystem, stopSystem } from '../api';
import '../assets/CSS/ControlPanel.css';

const ControlPanel = ({ isRunning, setIsRunning, addLog }) => {
    const handleStart = async () => {
        try {
            const response = await startSystem();
            if (response.data.success) {
                setIsRunning(true);
                addLog('System started.');
            }
        } catch (error) {
            console.error('Error starting system:', error);
            addLog('Failed to start system.');
        }
    };

    const handleStop = async () => {
        try {
            const response = await stopSystem();
            if (response.data.success) {
                setIsRunning(false);
                addLog('System stopped.');
            }
        } catch (error) {
            console.error('Error stopping system:', error);
            addLog('Failed to stop system.');
        }
    };

    return (
        <div className="control-panel">
            <button onClick={handleStart} disabled={isRunning}>
                Start System
            </button>
            <button onClick={handleStop} disabled={!isRunning}>
                Stop System
            </button>
        </div>
    );
};

export default ControlPanel;
