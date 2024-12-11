import React, { useEffect, useState } from 'react';
import { getStatus } from '../api';
import '../../src/assets/CSS/TicketDisplay.css';

const TicketDisplay = ({ addLog }) => {
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
        fetchStatus();
    }, [addLog]);

    return (
        <div className="ticket-display">
            <h3>Ticket Display</h3>
            <p>Available Tickets: {status.availableTickets}</p>
        </div>
    );
};

export default TicketDisplay;
