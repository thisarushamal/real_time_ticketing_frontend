import React, { useEffect, useState, useRef } from 'react';
import { getStatus } from '../api';
import '../../src/assets/CSS/TicketDisplay.css';

const TicketDisplay = ({ addLog, isRunning }) => {
    const [status, setStatus] = useState({ availableTickets: 0, tickets: [] });
    const lastUpdateTime = useRef(0);

    useEffect(() => {
        const fetchStatus = async () => {
            const now = Date.now();
            // Ensure at least 1000ms has passed since the last update
            if (now - lastUpdateTime.current < 1000) {
                return;
            }

            try {
                const { data } = await getStatus();
                setStatus(data);
                addLog(`Ticket Status Updated: ${data.availableTickets} tickets available.`);
                lastUpdateTime.current = now;
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
    }, [isRunning]); // Only depend on isRunning state

    return (
        <div className="ticket-display">
            <h3>Ticket Display</h3>
            <p>Available Tickets: {status.availableTickets}</p>
        </div>
    );
};

export default TicketDisplay;
