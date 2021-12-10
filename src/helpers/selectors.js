export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter((d) => d.name === day);

  let appointments = [];
  if (filteredAppointments.length) {
    appointments = filteredAppointments[0].appointments.map(
      (x) => state.appointments[x]
    );
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerData = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: interviewerData
  }
};

export function getInterviewersForDay(state, day) {
  const filteredInterviewers = state.days.filter((d) => d.name === day);
  let interviewers = [];
  if (filteredInterviewers.length) {
    interviewers = filteredInterviewers[0].interviewers.map(   
      (x) => state.interviewers[x]
    );
  }
  return interviewers;
}