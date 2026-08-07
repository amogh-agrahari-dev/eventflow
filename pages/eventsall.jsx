import React from 'react'

export default function EventsAll() {
    const [events, setEvents] = React.useState([]);
    const getEvents = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/events/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
            const data = await response.json();
            console.log(data)
            if (Array.isArray(data)) {
                setEvents(data);
            } else if (data && data.success && Array.isArray(data.events)) {
                setEvents(data.events);
            } else if (data && Array.isArray(data.data)) {
                setEvents(data.data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    React.useEffect(() => {
        getEvents();
        console.log(events);
        
    }, []);
  return (
    <div>
        {events.map((event) => (
            <div key={event.id} className="bg-gray-800 p-4 rounded mb-4">
                <h2 className="text-xl font-bold">{event.name}</h2>
                <p>{event.description}</p>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
            </div>
        ))}
    </div>
  )
}
