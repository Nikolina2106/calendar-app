import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {EventImpl} from '@fullcalendar/core/internal';
// eslint-disable-next-line import/no-extraneous-dependencies
import {useParams} from 'react-router-dom';
import CommitDataModal from './CommitDataModal';

const CalendarContainer = styled.div`
    display: flex;
    width: calc(100% - 2rem);
    height: calc(100vh - 2rem);
    padding: 1rem;
    justify-content: center;
    align-items: center;

    > div {
        width: 80rem;
        height: 50rem;
    }
`;

const StyledCalendar = styled(FullCalendar)`
    .fc-popover {
        width: 100px;
    }
`;

export default function Calendar(): JSX.Element {
    const {date} = useParams();

    const [data, setData] = useState<any[]>([]);
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventImpl>({} as EventImpl);

    useEffect(() => {
        axios
            .get(`https://api.github.com/repos/martymac/fpart/commits?sha=master`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, []);

    const calendarEvents = data.map((commit: any) => ({
        title: commit.commit.message,
        date: commit.commit.author.date,
    }));

    const handleEventClick = (info: any): void => {
        setEventModalOpen(true);
        const clickedEvent: any = data.find(
            (event: any) =>
                event.commit.message === info.event.title &&
                new Date(event.commit.author.date).toISOString() === info.event.start.toISOString()
        );
        setSelectedEvent(clickedEvent);
    };
    return (
        <>
            <CalendarContainer>
                <StyledCalendar
                    initialDate={date}
                    displayEventTime
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    selectable
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
                    eventClick={handleEventClick}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                    }}
                    showNonCurrentDates={false}
                    events={calendarEvents}
                    eventMaxStack={3}
                    eventTimeFormat={{hour: '2-digit', minute: '2-digit', hour12: false}}
                    dayMaxEvents={3}
                />
            </CalendarContainer>
            <CommitDataModal isOpen={eventModalOpen} setIsModalOpen={setEventModalOpen} commitData={selectedEvent} />
        </>
    );
}
