import { getAttendance } from '../api-calls';

import { getAttendanceButton } from '../selectors';

const useGetAttendance = (authObj: { token: null | string }, courseId = 3020) => {
  getAttendanceButton.on('click', async function () {
    const res = await getAttendance(courseId, authObj.token);
    const filteredResults = res.filter(
      ({ pending, sessionName }) =>
        !(
          pending ||
          sessionName.toLowerCase().includes('not required') ||
          sessionName.toLowerCase().includes('orientation event') ||
          sessionName.toLowerCase().includes('career paths')
        )
    );
    const studentAttendance = new Map();

    filteredResults.forEach(({ studentName, present, excused }) => {
      const cs = studentAttendance.get(studentName);
      if (!cs) {
        studentAttendance.set(studentName, {
          sessions: 1,
          absent: present ? 0 : 1,
          excused: excused !== null && excused === false ? 1 : 0,
          unexcused: excused ? 1 : 0,
        });
        return;
      }
      studentAttendance.set(studentName, {
        sessions: cs.sessions + 1,
        absent: present ? cs.absent : cs.absent + 1,
        unexcused: excused !== null && excused === false ? cs.unexcused + 1 : cs.unexcused,
        excused: excused ? cs.excused + 1 : cs.excused,
      });
    });

    console.log('map: ', studentAttendance);

    for (const [name, obj] of studentAttendance) {
      const span = document.createElement('span');
      const hr = document.createElement('div');
      span.innerText = ` A:${obj.absent} / U:${obj.unexcused} / T:${obj.sessions}`;
      document.querySelector(`[data-student-name="${name.toLowerCase()}"]`)?.append(hr, span);
    }
  });

  return {};
};

export default useGetAttendance;
