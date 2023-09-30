import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function AdminEventDetails() {

    const {eventId} = useParams();
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
            <h2>Event Attendees</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {attendees.values}
                </ul>
            )}
        </div>
    );
}

export default AdminEventDetails;