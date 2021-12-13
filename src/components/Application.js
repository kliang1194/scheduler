import React, {useState, useEffect} from "react";

import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
 const [state, setState] = useState({
   day: "Monday",
   days: [],
   appointments: {},
   interviewers: {}
 });

 const dailyAppointments = getAppointmentsForDay(state, state.day);
 const setDay = day => setState({ ...state, day });

 function bookInterview(id, interview) {
  console.log(id, interview);

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  setState({
    ...state,
    appointments
  });
}
 const appointmentArray = dailyAppointments.map((appointment) => {
   const interview = getInterview(state, appointment.interview);
  const interviewersForDay = getInterviewersForDay(state, state.day);
   return (
    <Appointment
    key = {appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers={interviewersForDay}
    bookInterview = {bookInterview}
    />
  );
});


  useEffect(() => {
    Promise.all([axios.get('/api/days'), axios.get('/api/appointments'), axios.get('/api/interviewers')])
    .then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    })
  }, []);



  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
       {appointmentArray}
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
