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

const buildTableRows = (grades) => {
  let result = '';
  grades.forEach((grade) => {
    result += /*html */ `
      <tr class=${grade.submitted ? '' : 'not-submitted'}>
        <td>${grade.studentName}</td>
        <td>${grade.grade}</td>
      </tr>
    `;
  });
  return result;
};

export const buildAssignmentCards = (assignmentRoot, data) => {
  data.forEach((item) => {
    console.log(item);
    const assignmentCard = /*html*/ `
    <div class="table-card">
      <h4>${item.assignmentTitle}</h4>
      <table class="w-100">
        <tr>
          <th>Student</th>
          <th>Grade</th>
        </tr>
        ${buildTableRows(item.grades)}
      </table>
    </div>
    `;
    assignmentRoot.append(assignmentCard);
  });
};
