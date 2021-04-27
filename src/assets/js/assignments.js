import { sortedAssignments } from '../data/sorted-assignments.js';
import { tableRow } from '../components/class-card-table-row.js';
import { assignmentCard } from '../components/class-cards.js';

export const buildGrades = (grades) => {
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

export const buildCurrentCalendarAssignmentList = () => {};

const buildTableRows = (grades) => {
  return grades.map((grade) => tableRow(grade)).join('');
};

export const buildAssignmentCards = (assignmentRoot, data) => {
  data.forEach(({ assignmentTitle: title, grades }) => {
    const card = assignmentCard({
      title: title,
      grades: buildTableRows(grades),
    });
    assignmentRoot.append(card);
  });
};
