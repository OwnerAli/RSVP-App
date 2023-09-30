import React, {Component} from "react";
import axios from "axios";
import "../App.css"

class EventForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            address: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // Create an event object with the form data
        const newEvent = {
            title: this.state.title,
            description: this.state.description,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            address: this.state.address, // Include the address
        };

        this.setState({
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            address: "",
        })

        axios
            .post("http://localhost:8080/events/create", newEvent, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("Event created:", response.data);
                // Handle success, such as redirecting to the event details page
            })
            .catch((error) => {
                console.error("Error creating event:", error);
            });
    }

    render() {
        return (
            <div>
                <a href="">
                    <h1 className="logo">Event Space</h1>
                    <h2 className="sub-logo">RSVPing Made Simple 🎉</h2>
                </a>
                <div className="content-container">
                    <h1 className="title">✨ Create Event ✨</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="text-input">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="text-input">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="text-input">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="text-input">
                            <label>Start Time</label>
                            <input
                                type="datetime-local"
                                name="startTime"
                                value={this.state.startTime}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="text-input">
                            <label>End Time</label>
                            <input
                                type="datetime-local"
                                name="endTime"
                                value={this.state.endTime}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="button">
                            <button type="submit" className="clickable-button">Create Event</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EventForm;