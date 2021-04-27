import { sortedAssignments } from '../data/sorted-assignments';
import { tableRow } from '../components/class-card-table-row';
import { assignmentCard } from '../components/class-cards';

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

export const buildCurrentCalendarAssignmentList = () => {
  const now = new Date();
};

const buildTableRows = (grades) => {
  return grades.map((grade) => tableRow(grade)).join('');
};

export const buildAssignmentCards = (assignmentRoot, data) => {
  assignmentRoot.empty();
  data.forEach(({ assignmentTitle: title, grades }) => {
    const card = assignmentCard({
      title: title,
      grades: buildTableRows(grades),
    });
    assignmentRoot.append(card);
  });
};
