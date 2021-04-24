import { sortedAssignments } from '../data/sorted-assignments.js';

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
