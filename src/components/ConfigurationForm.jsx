import React, { useState } from 'react';
import { updateConfig } from '../../src/api';
import '../../src/assets/CSS/ConfigurationForm.css';

const ConfigurationForm = ({ addLog }) => {
    const [totalTickets, setTotalTickets] = useState('');
    const [releaseRate, setReleaseRate] = useState('');
    const [retrievalRate, setRetrievalRate] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateInputs = () => {
        if (!totalTickets || !releaseRate || !retrievalRate || !maxCapacity) {
            addLog('Error: All fields are required');
            return false;
        }
        if (Number(totalTickets) <= 0 || Number(releaseRate) <= 0 || 
            Number(retrievalRate) <= 0 || Number(maxCapacity) <= 0) {
            addLog('Error: All values must be positive numbers');
            return false;
        }
        if (Number(totalTickets) > Number(maxCapacity)) {
            addLog('Error: Total tickets cannot exceed max capacity');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateInputs()) return;

        const newConfig = {
            totalTickets: Number(totalTickets),
            ticketReleaseRate: Number(releaseRate),
            customerRetrievalRate: Number(retrievalRate),
            maxTicketCapacity: Number(maxCapacity),
        };

        setIsSubmitting(true);
        try {
            const response = await updateConfig(newConfig);
            addLog('Configuration updated successfully');
            // Clear form after successful submission
            setTotalTickets('');
            setReleaseRate('');
            setRetrievalRate('');
            setMaxCapacity('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update configuration';
            addLog(`Error: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="configuration-form" onSubmit={handleSubmit}>
            <h3>Configuration Form</h3>
            <div>
                <label>Total Tickets:</label>
                <input 
                    type="number" 
                    value={totalTickets} 
                    onChange={(e) => setTotalTickets(e.target.value)}
                    min="1"
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label>Release Rate (tickets/min):</label>
                <input 
                    type="number" 
                    value={releaseRate} 
                    onChange={(e) => setReleaseRate(e.target.value)}
                    min="1"
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label>Retrieval Rate (tickets/min):</label>
                <input 
                    type="number" 
                    value={retrievalRate} 
                    onChange={(e) => setRetrievalRate(e.target.value)}
                    min="1"
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label>Max Capacity:</label>
                <input 
                    type="number" 
                    value={maxCapacity} 
                    onChange={(e) => setMaxCapacity(e.target.value)}
                    min="1"
                    required
                    disabled={isSubmitting}
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Configuration'}
            </button>
        </form>
    );
};

export default ConfigurationForm;
