import { getAttendance } from '../api-calls';
import { RawAttendanceObj } from '../types/attendance';
import { MappedStudentsWithAssignments } from '../types/grades';

const useGetAttendance = (authObj: { token: null | string }) => {
  const filterAcademicSessions = (rawSessions: RawAttendanceObj[]): RawAttendanceObj[] => {
    return rawSessions.filter(
      ({ pending, sessionName }) =>
        !(
          pending ||
          sessionName.toLowerCase().includes('not required') ||
          sessionName.toLowerCase().includes('orientation event') ||
          sessionName.toLowerCase().includes('career paths')
        )
    );
  };

  const mapStudentAttendance = (rawAttendance: RawAttendanceObj[], data: MappedStudentsWithAssignments) => {
    rawAttendance.forEach(({ studentName, present, excused }) => {
      const { grades, attendance } = data.get(studentName) || {
        grades: [],
        attendance: {
          sessions: 0,
          absent: 0,
          unexcused: 0,
          excused: 0,
        },
      };

      data.set(studentName, {
        grades,
        attendance: {
          sessions: attendance.sessions + 1,
          absent: present ? attendance.absent : attendance.absent + 1,
          unexcused: excused !== null && excused === false ? attendance.unexcused + 1 : attendance.unexcused,
          excused: excused ? attendance.excused + 1 : attendance.excused,
        },
      });
    });
    return data;
  };

  const getStudentAttendance = async (courseId: number) => {
    try {
      const res = await getAttendance(courseId, authObj.token);
      return filterAcademicSessions(res);
    } catch (err) {
      console.log('There was a problem', err);
      throw new Error('problem');
    }
  };

  return { getStudentAttendance, mapStudentAttendance };
};

export default useGetAttendance;
