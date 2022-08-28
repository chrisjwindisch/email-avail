import './App.css'
import 'react-notifications/lib/notifications.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import React, { useState, useEffect, useRef } from 'react'
//import moment from 'moment'
//import momenttz from 'moment-timezone'
import moment from 'moment-timezone'
import FullCalendar from '@fullcalendar/react' // must go before plugins
// calendar plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'
import { Autocomplete, Box, Button, Modal, TextField, Typography } from '@mui/material'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { api } from './Config'

// From: https://thewebdev.info/2021/05/24/how-to-listen-for-key-press-for-document-in-react-js/#:~:text=js-,To%20listen%20for%20keypresses%20on%20the%20whole%20document%20in%20React,document%20in%20the%20useEffect%20hook.&text=We%20create%20the%20useEventListener%20hook,eventName%20is%20the%20event%20name.
const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event)
    element.addEventListener(eventName, eventListener)
    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

function App() {
  const [events, setEvents] = useState([])
  const [timezone, setTimezone] = useState(moment.tz.guess())
  const [showFeatureModal, setShowFeatureModal] = useState(false)
  const emailInput = useRef(null)
  const ENTER_KEYS = ['13', 'Enter']

  const defaultValues = {
    email: '',
    message: '',
  }

  const [formValues, setFormValues] = useState(defaultValues)

  const createEvent = (selectionInfo) => {
    const start = selectionInfo.start
    const end = selectionInfo.end

    //var abc = prompt('Enter Title')
    var allDay = selectionInfo.allDay
    var newEvent = new Object()
    //newEvent.title = abc
    newEvent.start = moment(start).format()
    newEvent.end = moment(end).format()
    newEvent.allDay = allDay
    const newEvents = events.concat([newEvent])
    setEvents(newEvents)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handler = ({ key }) => {
    // Don't use enter to copy availability data if the feature modal is open
    // because the person is probably just doing new lines in the message
    if (!showFeatureModal && ENTER_KEYS.includes(String(key))) {
      // collect by date in 2D array
      let byDate = {}
      events.forEach((event) => {
        const key = moment(event.start).format('MM/DD')
        if (!(key in byDate)) byDate[key] = []
        byDate[key].push(event)
      })

      // sort events by start time
      Object.values(byDate).forEach((eventArray) => {
        eventArray.sort((a, b) => b.start - a.start)
      })

      // format line for each day
      let availabilities = []
      Object.values(byDate).forEach((eventArray) => {
        let line = ''
        eventArray.forEach(function (event, idx, array) {
          const start = moment(event.start).format('h:mma')
          const end = moment(event.end).format('h:mma zz')
          // If its the first event of the day
          if (idx === 0) {
            const dayStart = moment(event.start).format('ddd (M/D): ')
            line = dayStart
          }

          line += `${start}-${end}`
          // if it's not the last event, comma separate
          if (idx !== array.length - 1) {
            line = line.trimEnd() + `, `
          }

          // If its the last event of the day
          if (idx === array.length - 1) {
            const tz = moment().tz(timezone).zoneAbbr()
            line = line.trimEnd() + ` ${tz}`
          }
        })
        availabilities.push(line)
      })

      let availabilityText = ''
      availabilities.forEach(function (day, idx, array) {
        // if it's not the last day, new line separate
        if (idx !== array.length - 1) {
          availabilityText += `${day}\n`
        } else {
          availabilityText += `${day}`
        }
      })

      // Copy the availabilities to the clipboard
      navigator.clipboard.writeText(availabilityText)
      NotificationManager.success('Availabilities copied to clipboard', 'Copied!')
    }
  }

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  useEventListener('keydown', handler)
  const timezones = moment.tz.names()

  const onChangeTimezone = (event, value) => {
    console.log('setTimezone', event)
    setTimezone(value)
  }

  const onSubmitFeatureRequest = async () => {
    setShowFeatureModal(false)
    const response = await fetch(api('requestFeature'), {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
    const res = await response.json()
    if (res.success == true) {
      NotificationManager.success('Feature Requeset Submitted', 'Thank You!')
    } else {
      NotificationManager.error('Error submitting feature request, please try again.', 'Error')
    }
  }

  return (
    <div
      className="App"
      style={{
        margin: 10,
      }}>
      <h1>Select your availabilities and hit enter to copy to clipboard</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <div style={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}>
          <Link
            to="#"
            style={{
              margin: 10,
            }}
            onClick={() => {
              setShowFeatureModal(true)
              setTimeout(() => {
                emailInput.current.focus()
              }, 100)
            }}>
            Request a feature
          </Link>
          <Autocomplete
            disablePortal
            options={timezones}
            sx={{ width: 300, marginBottom: 2 }}
            renderInput={(params) => <TextField {...params} label="Timezone" />}
            onChange={onChangeTimezone}
            defaultValue={timezone}
          />
        </Box>
      </div>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
        initialView="timeGridWeek"
        scrollTime="07:00:00"
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        selectable={true}
        editable={true}
        eventResizableFromStart={true}
        select={createEvent}
        timeZone={timezone}
        events={events}
      />
      <NotificationContainer />
      <Modal
        open={showFeatureModal}
        onClose={() => {
          setShowFeatureModal(false)
        }}
        autoFocus={false}
        disableEnforceFocus
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalBoxStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: 5 }}>
            <span className="request-feature-title">Request a feature</span>
            <IconButton
              onClick={() => setShowFeatureModal(false)}
              sx={{ p: 0 }}
              className="close-icon-wrapper">
              <CloseIcon sx={{ p: 0 }} className="close-icon" />
            </IconButton>
          </Typography>
          <TextField
            id="email-textfield"
            style={{
              width: '100%',
            }}
            rows={4}
            variant="outlined"
            placeholder="example@gmail.com"
            label="Your email - we'll let you know when the feature is ready"
            autoFocus
            margin="normal"
            inputRef={emailInput}
            name="email"
            onChange={handleInputChange}
          />
          <TextField
            id="feature-request-message-textfield"
            multiline
            style={{
              width: '100%',
            }}
            rows={4}
            label="Message"
            placeholder="It would be awesome if you add a feature to..."
            required
            name="message"
            onChange={handleInputChange}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              marginTop: 2,
            }}>
            <Button onClick={onSubmitFeatureRequest}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default App
