import './App.css'
import React, { useState } from 'react'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react' // must go before plugins
// calendar plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'


function App() {
  const [events, setEvents] = useState([])

  const createEvent = ( selectionInfo ) => {
    console.log("HERE")
    const start = selectionInfo.start
    const end = selectionInfo.end

    var abc = prompt('Enter Title')
    var allDay = !start.hasTime && !end.hasTime
    var newEvent = new Object()
    newEvent.title = abc
    newEvent.start = moment(start).format()
    newEvent.allDay = false
    console.log(newEvent)
    setEvents(events.push(newEvent))
  }

  const handleDateClick = ( arg ) => { // bind with an arrow function
    alert(arg.dateStr)
  }

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
        dateClick={handleDateClick}
        timezone="PDT"
        events={events}
      />
    </div>
  )
}

export default App