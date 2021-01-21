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