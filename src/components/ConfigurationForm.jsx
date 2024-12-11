import React, { useState } from 'react';
import { updateConfig } from '../api';
import '../assets/CSS/ConfigurationForm.css';

const ConfigurationForm = ({ addLog }) => {
    const [config, setConfig] = useState({
        totalTickets: '',
        ticketReleaseRate: '',
        customerRetrievalRate: '',
        maxTicketCapacity: ''
    });
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        if (!value) return `${name} is required`;
        if (isNaN(value) || Number(value) <= 0) return `${name} must be a positive number`;
        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        Object.entries(config).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) newErrors[key] = error;
        });

        if (Number(config.totalTickets) > Number(config.maxTicketCapacity)) {
            newErrors.totalTickets = 'Total tickets cannot exceed maximum capacity';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            addLog('Please fix the validation errors');
            return;
        }

        try {
            const response = await updateConfig({
                totalTickets: Number(config.totalTickets),
                ticketReleaseRate: Number(config.ticketReleaseRate),
                customerRetrievalRate: Number(config.customerRetrievalRate),
                maxTicketCapacity: Number(config.maxTicketCapacity)
            });

            if (response.data.success) {
                addLog('Configuration updated successfully');
                // Clear form
                setConfig({
                    totalTickets: '',
                    ticketReleaseRate: '',
                    customerRetrievalRate: '',
                    maxTicketCapacity: ''
                });
            }
        } catch (error) {
            addLog('Failed to update configuration');
            console.error('Configuration update error:', error);
        }
    };

    return (
        <div className="configuration-form">
            <h3>System Configuration</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Total Number of Tickets:</label>
                    <input
                        type="number"
                        name="totalTickets"
                        value={config.totalTickets}
                        onChange={handleChange}
                        placeholder="Enter total tickets"
                    />
                    {errors.totalTickets && <span className="error">{errors.totalTickets}</span>}
                </div>

                <div className="form-group">
                    <label>Ticket Release Rate:</label>
                    <input
                        type="number"
                        name="ticketReleaseRate"
                        value={config.ticketReleaseRate}
                        onChange={handleChange}
                        placeholder="Enter release rate"
                    />
                    {errors.ticketReleaseRate && <span className="error">{errors.ticketReleaseRate}</span>}
                </div>

                <div className="form-group">
                    <label>Customer Retrieval Rate:</label>
                    <input
                        type="number"
                        name="customerRetrievalRate"
                        value={config.customerRetrievalRate}
                        onChange={handleChange}
                        placeholder="Enter retrieval rate"
                    />
                    {errors.customerRetrievalRate && <span className="error">{errors.customerRetrievalRate}</span>}
                </div>

                <div className="form-group">
                    <label>Maximum Ticket Capacity:</label>
                    <input
                        type="number"
                        name="maxTicketCapacity"
                        value={config.maxTicketCapacity}
                        onChange={handleChange}
                        placeholder="Enter max capacity"
                    />
                    {errors.maxTicketCapacity && <span className="error">{errors.maxTicketCapacity}</span>}
                </div>

                <button type="submit">Update Configuration</button>
            </form>
        </div>
    );
};

export default ConfigurationForm;
