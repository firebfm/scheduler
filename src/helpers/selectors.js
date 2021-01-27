export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  let appointmentsArr = [];

  // filteredDay is either empty or an array of object
  const filteredDay = state.days.filter(obj => obj.name === day);

  if (Array.isArray(filteredDay) && filteredDay.length > 0) {
    appointmentsArr = [...filteredDay[0].appointments];
  }

  if (appointmentsArr.length <= 0) {
    return [];
  } 

  for (let num of appointmentsArr) {
    if (state.appointments[num]) {
      filteredAppointments.push(state.appointments[num])
    }
  }

  return filteredAppointments;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((eachDay) => {
    return eachDay.name === day;
  })

  if (filteredDays.length === 0) {
    return [];
  }

  const result = filteredDays[0].interviewers.map((interviewerId) => {
    return state.interviewers[interviewerId]
  })

  return result;
}

export function getInterview(state, interview) {
  let result = null;

  if (interview) {
    result = {};
    result.student = interview.student;
    // interview.interviewer is an id number
    result.interviewer = state.interviewers[interview.interviewer]
  }
  return result
}