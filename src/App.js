import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventForm from "./components/EventForm";
import InvititationPage from "./components/InvititationPage";
import AdminEventDetails from "./components/AdminEventDetails";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<EventForm />} />
                    <Route path="/event/rsvp/:inviteId" element={<InvititationPage />} />
                    <Route path="/event/:eventId" element={<AdminEventDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

