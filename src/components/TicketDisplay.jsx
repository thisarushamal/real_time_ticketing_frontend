import React, { useEffect, useState } from 'react';
import { getStatus } from '../api';
import '../../src/assets/CSS/TicketDisplay.css';

const TicketDisplay = ({ addLog, isRunning }) => {
    const [status, setStatus] = useState({ availableTickets: 0, tickets: [] });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const { data } = await getStatus();
                setStatus(data);
                addLog(`Ticket Status Updated: ${data.availableTickets} tickets available.`);
            } catch (error) {
                addLog('Failed to fetch ticket status.');
            }
        };

        let intervalId;
        if (isRunning) {
            fetchStatus(); // Initial fetch
            intervalId = setInterval(fetchStatus, 1000); // Fetch every 1 second
        }

        // Cleanup function to clear interval when component unmounts or isRunning changes
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, addLog]); // Dependencies include isRunning to restart interval when it changes

    return (
        <div className="ticket-display">
            <h3>Ticket Display</h3>
            <p>Available Tickets: {status.availableTickets}</p>
        </div>
    );
};

export default TicketDisplay;
