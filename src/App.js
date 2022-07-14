import logo from './logo.svg'
import './App.css'
import React from 'react'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react' // must go before plugins
// calendar plugins
import timeGridPlugin from '@fullcalendar/timegrid'


function App() {
  const createEvent = (start, end, jsEvent, view) => {
    var abc = prompt('Enter Title')
    var allDay = !start.hasTime && !end.hasTime
    var newEvent = new Object()
    newEvent.title = abc
    newEvent.start = moment(start).format()
    newEvent.allDay = false
    //$('#calendar').fullCalendar('renderEvent', newEvent)
  }

  /*
  const start = moment().subtract(5, 'hours').format('MMMM Do YYYY, h:mm:ss a')
  const end = moment().add(2, 'hours').format('MMMM Do YYYY, h:mm:ss a')
  */
  const start = moment().subtract(5, 'hours').toDate()
  const end = moment().add(2, 'hours').toDate()

  return (
    <div className="App">
      <FullCalendar
        plugins={[ timeGridPlugin ]}
        initialView='timeGridWeek'
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        select={createEvent}
        timezone="PDT"
        events={[
          {
            id: 'a',
            title: 'my event',
            start: start,
            end: end,
          }
        ]}
      />
    </div>
  )
}

export default App
