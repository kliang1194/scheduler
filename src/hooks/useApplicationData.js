import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  function updateSpotsRemaining() {
    let spotsRemaining = 5;

    for (let day in state.days) {
      if (state.days[day].name === state.day) {
        for (let id of state.days[day].appointments) {
          if (state.appointments[id].interview !== null) {
            spotsRemaining--;
          }
        }
      }
    }
    return state.days.map((day) => {
      if (day.name !== state.day) {
        return day;
      } else {
        return {
          ...day,
          spots: spotsRemaining,
        };
      }
    });
  }

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
      });

      updateSpotsRemaining();
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
      });

      updateSpotsRemaining();
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
