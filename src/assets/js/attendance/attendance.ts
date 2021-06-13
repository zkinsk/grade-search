import { getAttendance } from '../api-calls';

import { getAttendanceButton } from '../selectors';

const useGetAttendance = (authObj: { token: null | string }, courseId = 3020) => {
  getAttendanceButton.on('click', async function () {
    console.log('Button clicked');
    const res = await getAttendance(courseId, authObj.token);
    const filteredResults = res.filter(
      ({ pending, sessionName }) =>
        !(
          pending ||
          sessionName.toLowerCase().includes('not required') ||
          sessionName.toLowerCase().includes('orientation event') ||
          sessionName.toLowerCase().includes('Career Paths')
        )
    );
    const sessions = new Set();
    filteredResults.forEach(({ sessionName }) => {
      sessions.add(sessionName);
    });
    console.log('Res: ', sessions);
  });

  return {};
};

export default useGetAttendance;
