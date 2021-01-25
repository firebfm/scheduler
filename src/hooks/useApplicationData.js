import { useState, useEffect } from 'react';
import axios from 'axios';

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
    return axios.put(`/api/appointments/${id}`, appointment).then(res => {
      const days = calculateSpots(state.days, appointments);

      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`).then(res => {
      const days = calculateSpots(state.days, appointments);

      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  function calculateSpots(days, appointments) {
    const result = days.map((day) => ({
      ...day,
      spots: day.appointments
        .map((id) => {
          return appointments[id]
        })
        .filter((appointment) => {
          return appointment.interview === null
        })
        .length
    }));
    return result;
  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    .catch(error => console.log(error))
  }, [])

  return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;