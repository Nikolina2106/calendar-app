import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 50rem;
  height: 20rem;
  padding: 1rem;
`

const Calendar = styled(FullCalendar)`
  .fc-day fc-day-sat fc-day-disabled fc-daygrid-day {
    visibility: hidden;
  }
`
const graphqlQuery = `
  query {
    repository(owner: "Nikolina2106", name: "calendar-app") {
      ref(qualifiedName: "refs/heads/main") {
        target {
          ... on Commit {
            history(first: 100) {
              nodes {
                committedDate
                message
              }
            }
          }
        }
      }
    }
  }
`;

function App() {
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`https://api.github.com/repos/Nikolina2106/calendar-app/commits`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }, []);
    console.log(data);

    return (
        <CalendarContainer>
            <Calendar
                displayEventTime={true}
                schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                selectable={true}
                initialView="dayGridMonth"
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    resourceTimeGridPlugin
                ]}
                eventClick={event => {
                    console.log('aaa');
                }}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                showNonCurrentDates={false}
            />
        </CalendarContainer>
    );
}

export default App;