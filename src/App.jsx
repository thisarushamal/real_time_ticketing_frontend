import React, { useState, useCallback } from 'react';
import ConfigurationForm from './components/ConfigurationForm';
import TicketDisplay from './components/TicketDisplay';
import ControlPanel from './components/ControlPanel';
import LogDisplay from './components/LogDisplay';
import '../src/assets/CSS/App.css';

const App = () => {
    const [logs, setLogs] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const addLog = useCallback((message) => {
        setLogs((prevLogs) => [...prevLogs, message]);
    }, []); // Empty dependency array since it only uses setLogs which is stable

    return (
        <div className="app">
            <h1>Real-Time Ticketing System</h1>
            <div className="grid-container">
                <ConfigurationForm addLog={addLog} />
                <TicketDisplay addLog={addLog} isRunning={isRunning} />
            </div>
            <ControlPanel isRunning={isRunning} setIsRunning={setIsRunning} addLog={addLog} />
            <LogDisplay logs={logs} />
        </div>
    );
};

export default App;
