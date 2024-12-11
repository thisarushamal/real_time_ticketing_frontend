import React, { useState } from 'react';
import { updateConfig } from '../api';
import '../../src/assets/CSS/ConfigurationForm.css';

const ConfigurationForm = ({ addLog }) => {
    const [totalTickets, setTotalTickets] = useState('');
    const [releaseRate, setReleaseRate] = useState('');
    const [retrievalRate, setRetrievalRate] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');

    const handleSubmit = async () => {
        if (Number(totalTickets) > Number(maxCapacity)) {
            addLog('Error: Total tickets cannot exceed max capacity.');
            return;
        }

        const newConfig = {
            totalTickets: Number(totalTickets),
            ticketReleaseRate: Number(releaseRate),
            customerRetrievalRate: Number(retrievalRate),
            maxTicketCapacity: Number(maxCapacity),
        };

        try {
            const { data } = await updateConfig(newConfig);
            addLog(data.message);
        } catch (error) {
            addLog('Failed to update configuration: ' + error.response.data.message);
        }
    };

    return (
        <div className="configuration-form">
            <h3>Configuration Form</h3>
            <div>
                <label>Total Tickets:</label>
                <input type="number" value={totalTickets} onChange={(e) => setTotalTickets(e.target.value)} />
            </div>
            <div>
                <label>Release Rate:</label>
                <input type="number" value={releaseRate} onChange={(e) => setReleaseRate(e.target.value)} />
            </div>
            <div>
                <label>Retrieval Rate:</label>
                <input type="number" value={retrievalRate} onChange={(e) => setRetrievalRate(e.target.value)} />
            </div>
            <div>
                <label>Max Capacity:</label>
                <input type="number" value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Save Configuration</button>
        </div>
    );
};

export default ConfigurationForm;
