import React, {useState, useEffect} from "react";
import axios from "axios";


export default function useApplicationData() {
 
  const [state, setState] = useState({
   day: "Monday",
   days: [],
   appointments: {},
   interviewers: {}
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

  return axios.put(`/api/appointments/${id}`, appointment)
  .then(() => {
    setState({
      ...state,
      appointments
    });
  })
}

function cancelInterview(id) {
  return axios.delete(`/api/appointments/${id}`)
  .then(() => {
    setState({
      ...state
    });
  })
}

return {state, setDay, bookInterview, cancelInterview}

}; 