import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "../EventDetails.css"

function EventDetails() {

    const {inviteId} = useParams();
    const [formattedTimeStamp, setFormattedTimeStamp] = useState(null);
    const [eventId, setEventId] = useState(null);
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        number: "",
        address: "",
        attending: "",
        plusOne: false,
    });

    useEffect(() => {
        // Fetch event details using axios or other method and update the state
        axios
            .get(`http://localhost:8080/invite/${inviteId}`)
            .then((response) => {
                setEvent(response.data);
                setEventId(response.data.id);

                const options = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // Use 12-hour time format
                };

                setFormattedTimeStamp(new Date(response.data.startTime).toLocaleString("en-US", options));

            })
            .catch((error) => {
                setError(error);
            });
    }, [inviteId]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        setSubmitted(true);
        event.preventDefault();

        const rsvp = {
            name: formData.name,
            number: formData.number,
            address: formData.address,
            plusOne: formData.plusOne
        };

        axios
            .post(`http://localhost:8080/events/invite/accept/${eventId}`, rsvp, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("We're excited to have you!", response.data);
            })
            .catch((error) => {
                console.error("Error creating event:", error);
            });

        setFormData({
            name: "",
            number: "",
            address: "",
            attending: "",
            plusOne: false,
        });
    };

    return (
        <div className="event-details-container">
            {event ? (
                <div className="event-details">
                    <h1 className="event-title">🥳 {event.title.toUpperCase()} 🥳</h1>
                    <h2 className="event-description">{event.description}</h2>
                </div>
            ) : (
                <p>Invalid or expired invite!</p>
            )}

            <form onSubmit={handleSubmit} className="event-form">
                <label className="name-label">
                    <input
                        type="text"
                        name="name"
                        className="name-input"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                    />
                </label>
                <label className="number-label">
                <input
                    type="text"
                    name="number"
                    className="number-input"
                    value={formData.number}
                    onChange={handleInputChange}
                    placeholder="Your Number"
                />
                </label>
                <label className="address-label">
                <input
                    type="text"
                    name="address"
                    className="address-input"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Your Address"
                />
                </label>
                <div className="attending-container">
                    <label className="attending-label">Will You Be Attending?</label>
                    <label className="radio-container">
                        <input type="radio" name="attending" value="true" className="radio-input" />
                        <span className="radio-button"></span>
                        <span className="radio-label">Yes</span>
                    </label>
                    <label className="radio-container">
                        <input type="radio" name="attending" value="no" className="radio-input" />
                        <span className="radio-button"></span>
                        <span className="radio-label">No</span>
                    </label>
                </div>
                {formData.attending === "true" ? (
                    <div>
                        <label>Plus 1 Adult?</label>
                        <label>
                            <input
                                type="radio"
                                name="plusOne"
                                value="true"
                                onChange={handleInputChange}
                                required
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="plusOne"
                                value="no"
                                onChange={handleInputChange}
                                required
                            />
                            No
                        </label>
                    </div>
                ) : (
                    <p></p>
                )}
                <div className="button">
                    <button className="clickable-button" type="submit">RSVP</button>
                </div>
            </form>
        </div>
    );
}

export default EventDetails;