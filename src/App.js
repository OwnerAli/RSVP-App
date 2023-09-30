import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventForm from "./components/EventForm";
import EventDetails from "./components/EventDetails";
import AdminEventDetails from "./components/AdminEventDetails";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<EventForm />} />
                    <Route path="/event/rsvp/:inviteId" element={<EventDetails />} />
                    <Route path="/event/:eventId" element={<AdminEventDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

