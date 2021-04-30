import fs from 'fs';
import grades from '../src/hide/grades.js';

const sortedAssignments = JSON.parse(fs.readFileSync('./sorted-assignments.json', 'utf-8'));

// console.log(sortedAssignments);

grades.forEach((item) => {
  const index = sortedAssignments.findIndex((asmt) => asmt.assignmentTitle === item.assignmentTitle);
  if (index === -1) return;
  const { studentName, submitted, grade } = item;
  sortedAssignments[index].grades = sortedAssignments[index].grades ? sortedAssignments[index].grades : [];
  sortedAssignments[index].grades.push({ studentName, submitted, grade });
});

fs.writeFile('graded-assignments.json', JSON.stringify(sortedAssignments, null, 2), () => {
  console.log('done');
});
