import './App.css'
import React, { useState, useEffect, useRef } from 'react'
//import moment from 'moment'
//import momenttz from 'moment-timezone'
import moment from 'moment-timezone'
import FullCalendar from '@fullcalendar/react' // must go before plugins
// calendar plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// From: https://thewebdev.info/2021/05/24/how-to-listen-for-key-press-for-document-in-react-js/#:~:text=js-,To%20listen%20for%20keypresses%20on%20the%20whole%20document%20in%20React,document%20in%20the%20useEffect%20hook.&text=We%20create%20the%20useEventListener%20hook,eventName%20is%20the%20event%20name.
const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

function App() {
  const [events, setEvents] = useState([])
  const ENTER_KEYS = ["13", "Enter"];

  const createEvent = ( selectionInfo ) => {
    const start = selectionInfo.start
    const end = selectionInfo.end

    //var abc = prompt('Enter Title')
    var allDay = selectionInfo.allDay
    var newEvent = new Object()
    //newEvent.title = abc
    newEvent.start = moment(start).format()
    newEvent.end = moment(end).format()
    newEvent.allDay = allDay;
    const newEvents = events.concat([newEvent])
    setEvents(newEvents)
  }

  const handler = ({ key }) => {
    if (ENTER_KEYS.includes(String(key))) {
      events.forEach((event) => {
        const start = moment(event.start).format("ddd (M/D): H:mma")
        const end = moment(event.end).format("H:mma zz")
        //const timezone = moment.tz.Zone.abbr
        const timezone = moment().tz(moment.tz.guess()).format('z');
        const range = `${start}-${end} ${timezone}`
        console.log(range)
      })
    }
  };

  useEventListener("keydown", handler);


  return (
    <div className="App">
      <FullCalendar
        plugins={[ timeGridPlugin, interactionPlugin ]}
        initialView='timeGridWeek'
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        selectable={true}
        editable={true}
        eventResizableFromStart={true}
        select={createEvent}
        timezone="PDT"
        events={events}
      />
    </div>
  )
}

export default App