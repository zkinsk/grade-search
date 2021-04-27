import { sortedAssignments } from '../data/sorted-assignments';
import { tableRow } from '../components/class-card-table-row';
import { assignmentCard } from '../components/class-cards';

import Grades, { SortedAssignment, AdaptedGrades } from './types/grades';
import StudentAssignmentGrade from './types/grades';

export const buildGrades = (grades: Grades[]) => {
  const assignments = [...sortedAssignments];
  grades.forEach((item) => {
    const index = assignments.findIndex((asmt) => asmt.assignmentTitle === item.assignmentTitle);
    if (index === -1) return;
    const { studentName, submitted, grade } = item;
    assignments[index].grades = assignments[index].grades ? assignments[index].grades : [];
    assignments[index].grades.push({ studentName, submitted, grade });
  });

  return assignments;
};

export const buildStudentAssignmentGrades = () => {};

export const buildCurrentCalendarAssignmentList = () => {
  const now = new Date();
};

const buildTableRows = (grades: AdaptedGrades[]) => {
  return grades.map((grade) => tableRow(grade)).join('');
};

export const buildAssignmentCards = (assignmentRoot: JQuery, data: SortedAssignment[]) => {
  assignmentRoot.empty();
  data.forEach(({ assignmentTitle: title, grades }) => {
    const card = assignmentCard({
      title: title,
      grades: buildTableRows(grades),
    });
    assignmentRoot.append(card);
  });
};
