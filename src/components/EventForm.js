import React, {Component} from "react";
import axios from "axios";
import "../App.css"

import footerImage from "../images/discord.png"
import {Navigate} from "react-router-dom";

class EventForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            address: "",
            eventCreated: false,
            eventId: ""
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
        const newEvent = {
            title: this.state.title,
            description: this.state.description,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            address: this.state.address,
        };

        this.setState({
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
                this.setState({
                    eventCreated: true,
                    eventId: response.data.id
                })
            })
            .catch((error) => {
                console.error("Error creating event:", error);
            });
    }

    render() {
        if (this.state.eventCreated) return <Navigate to={`/event/${this.state.eventId}`}/>;
        return (
            <div>
                <header className="header">
                    <div className="logo-container">
                        <a href="">
                            <h1 className="logo">Event Space</h1>
                            <h2 className="sub-logo">RSVPing Made Simple 🎉</h2>
                        </a>
                    </div>
                </header>
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
                <footer>
                    <a href="">
                        <img src={footerImage} alt="Footer Image" className="social-logo"/>
                    </a>
                </footer>
            </div>
        );
    }
}

export default EventForm;