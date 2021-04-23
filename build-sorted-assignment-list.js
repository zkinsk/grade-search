import fs from 'fs';
import { grades, excludes } from './grades.js';

const uniqueCodingAssignments = new Set(
  grades.map((grade) => grade.assignmentTitle).filter((item) => !excludes.includes(item.split(' ')[0]))
);

const assignments = [...uniqueCodingAssignments]
  .map((item) => ({
    assignmentTitle: item,
    sortOrder: parseInt(item),
  }))
  .sort((a, b) => a.sortOrder - b.sortOrder);

fs.writeFile('assignments.json', JSON.stringify(assignments, null, 2), () => {
  console.log('Done');
});
