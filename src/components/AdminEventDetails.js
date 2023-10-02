import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function AdminEventDetails() {

    const {eventId} = useParams();
    const [event, setEvent] = useState(null);
    const [name, setName] = useState("");
    const [attendees, setAttendees] = useState([]);
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch event details using axios or other method and update the state
        axios
            .get(`http://localhost:8080/events/get/${eventId}`)
            .then((response) => {
                setEvent(response.data);
                console.log(response.data)
            })
            .catch((error) => {
            });

        axios
            .get(`http://localhost:8080/events/attendees/${eventId}`)
            .then((response) => {
                setAttendees(response.data);
                console.log(response.data)
            })
            .catch((error) => {
            });

        axios
            .get(`http://localhost:8080/events/invites/${eventId}`)
            .then((response) => {
                setInvites(response.data);
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
                <div className="tables-container">
                    <div className="table-container">
                        <h2 className="table-heading">✉️ Invite Links ✉️</h2>
                        <table className="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Link</th>
                                <th>Plus One</th>
                            </tr>
                            </thead>
                            <tbody>
                            {invites.map((invite, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <a
                                            href={`http://localhost:3000/event/rsvp/${invite.id}`}
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent the link from navigating
                                                const link = e.target.getAttribute('href'); // Get the href attribute
                                                navigator.clipboard.writeText(link).then(() => {
                                                    // Clipboard successfully updated
                                                    alert('Link Copied!');
                                                }).catch((err) => {
                                                    // Handle clipboard write error
                                                    console.error('Uh Oh! Something Went Wrong While Copying!');
                                                });
                                            }}
                                        >
                                            Click To Copy
                                        </a>
                                    </td>
                                    <td>{invite.plusOne.toString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
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
                </div>
            )}
        </div>
    );
}

export default AdminEventDetails;