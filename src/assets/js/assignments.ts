import { sortedAssignments } from '../data/sorted-assignments';

import Grades, { MappedStudentsWithAssignments } from './types/grades';
import StudentAssignmentGrade from './types/grades';
import CohortAssignments, { MappedAssignments } from './types/calendar-assignments';

export const buildGrades = (grades: Grades[]) => {
  const assignments = sortedAssignments.map((item) => ({ ...item }));
  grades.forEach((item) => {
    const index = assignments.findIndex((assignment) => assignment.assignmentTitle === item.assignmentTitle);
    if (index === -1) return;
    const { studentName, submitted, grade } = item;
    assignments[index].grades = [...assignments[index].grades, { studentName, submitted, grade }];
  });
  return assignments;
};

const ntiOrNotGraded = (submitted: boolean) => {
  return submitted ? 'NG' : 'NTI';
};

export const buildStudentAssignmentGrades = (data: StudentAssignmentGrade[], currentAssignments: MappedAssignments) => {
  const studentMap: MappedStudentsWithAssignments = new Map();
  data.forEach((item) => {
    const assignment = currentAssignments.get(item.assignmentTitle);
    if (!assignment) return;
    const { studentName, grade, submitted, ...rest } = item;
    const { assignmentDate, dueDate } = assignment;
    const assignments = studentMap.get(studentName) || [];
    let mappedGrade = grade ?? ntiOrNotGraded(submitted);
    if (mappedGrade.toLowerCase() === 'incomplete') {
      mappedGrade = 'I';
    }
    studentMap.set(studentName, [...assignments, { ...rest, grade: mappedGrade, submitted, assignmentDate, dueDate }]);
  });

  for (let [_key, value] of studentMap) {
    value.sort((a, b) => a.assignmentDate.valueOf() - b.assignmentDate.valueOf());
  }
  return studentMap;
};

export const buildCurrentCalendarAssignmentList = (data: CohortAssignments) => {
  const now = new Date();
  return data.calendarAssignments.reduce((acc: string[], item) => {
    if (item.category.code === 'career' || new Date(item.assignmentDate) > now) return acc;
    return [...acc, item.title];
  }, []);
};

export const reduceCohortAssignments = (data: CohortAssignments): MappedAssignments => {
  const now = new Date();
  const output = new Map();

  data.calendarAssignments.forEach((item) => {
    if (item.category.code === 'career' || new Date(item.assignmentDate) > now) return;
    const { title, assignmentDate, dueDate, required, id } = item;
    output.set(item.title, {
      title,
      required,
      assignmentDate: new Date(assignmentDate),
      dueDate: new Date(dueDate),
      id,
    });
  });

  return output;
};
