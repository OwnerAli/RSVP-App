import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function AdminEventDetails() {

    const {eventId} = useParams();
    const [name, setName] = useState("");
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch event details using axios or other method and update the state
        axios
            .get(`http://localhost:8080/events/attendees/${eventId}`)
            .then((response) => {
                setAttendees(response.data);
                setLoading(false);
                console.log(response.data)
            })
            .catch((error) => {
            });
    }, [eventId]);

    return (
        <div>
            <div className="logo-container">
                <a href="">
                    <h1 className="logo">Event Space</h1>
                    <h2 className="sub-logo">RSVPing Made Simple 🎉</h2>
                </a>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="table-container">
                    <h2 className="table-heading">🙋 RSVP List 🙋</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Address</th>
                            <th>Attending</th>
                        </tr>
                        </thead>
                        <tbody>
                        {attendees.map((attendee, index) => (
                            <tr key={index}>
                                <td>{attendee.name}</td>
                                <td>{attendee.number}</td>
                                <td>{attendee.address}</td>
                                <td>{attendee.attending}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminEventDetails;