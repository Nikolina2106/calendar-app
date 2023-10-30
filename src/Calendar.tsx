import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {EventClickArg} from '@fullcalendar/core';
import CommitDataModal from './CommitDataModal';
import {ICommit} from './domain/ICommit';
import {IResponseData} from './domain/IResponseData';
import {DateTimeFormat, formatDateTime} from './util/dateTime.utils';

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
        .fc-popover {
            width: 30rem;
        }
    }
`;

export default function Calendar(): React.JSX.Element {
    const {date} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<IResponseData[]>([] as IResponseData[]);
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<ICommit>({} as ICommit);

    useEffect(() => {
        const monthFromURL = date ? new Date(date) : new Date();
        const year = monthFromURL.getFullYear();
        const month = monthFromURL.getMonth() + 1;
        axios
            .get(
                `https://api.github.com/repos/martymac/fpart/commits?sha=refs/heads/fpart-longopts&since=${year}-${month}` +
                    `-01T00:00:00Z&until=${year}-${month + 1}-01T00:00:00Z`,
                {
                    headers: {
                        Authorization: `token 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`,
                    },
                }
            )
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, [date, navigate]);

    const calendarEvents = data.map((item: IResponseData) => ({
        title: item.commit.message,
        date: item.commit.author.date,
    }));

    const handleEventClick = (info: EventClickArg): void => {
        setEventModalOpen(true);
        const clickedEvent: ICommit = data.find(
            (item: IResponseData) =>
                item.commit.message === info.event.title &&
                new Date(item.commit.author.date).toISOString() === (info.event.start && info.event.start.toISOString())
        )?.commit as ICommit;
        setSelectedEvent(clickedEvent);
    };

    const handleDateChange = (newDate: string): void => {
        navigate(`/${formatDateTime(newDate, DateTimeFormat.YEAR_MONTH_DAY)}`);
    };

    return (
        <>
            <CalendarContainer>
                <FullCalendar
                    initialDate={date}
                    displayEventTime
                    selectable
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    headerToolbar={{
                        left: 'title',
                        right: 'prev,next today',
                    }}
                    showNonCurrentDates={false}
                    events={calendarEvents}
                    eventMaxStack={3}
                    eventTimeFormat={{hour: '2-digit', minute: '2-digit', hour12: false}}
                    dayMaxEvents={3}
                    datesSet={(arg) => handleDateChange(arg.view.currentStart.toISOString())}
                    eventClick={handleEventClick}
                />
            </CalendarContainer>

            <CommitDataModal
                isOpen={eventModalOpen}
                setIsModalOpen={setEventModalOpen}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
            />
        </>
    );
}
