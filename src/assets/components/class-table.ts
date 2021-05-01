import { MappedAssignments } from '../js/types/calendar-assignments';
import { MappedStudentsWithAssignments } from '../js/types/grades';

const assignmentTitles = (assignments: MappedAssignments) => {
  const headers = [];
  for (const [key] of assignments) {
    headers.push(`<th class="table-header-rotate"><div><span>${key}</span></div></th>`);
  }
  return headers.join('');
};

const studentGrades = (students: MappedStudentsWithAssignments) => {
  const studentRow = [];
  for (const [key, value] of students) {
    studentRow.push(`
    <tr>
    <td>${key}</td>
    ${value.map((grade) => `<td>${grade.grade}</td>`).join('')}
    </tr>
    `);
  }
  return studentRow.join('');
};

export const classTable = ({
  assignments,
  students,
}: {
  assignments: MappedAssignments;
  students: MappedStudentsWithAssignments;
}) => {
  return /*html*/ `
<div class="table-card">
<table class="w-100">
  <thead class="grade-table">
      <tr>
        <th>Student</th>
        ${assignmentTitles(assignments)}
      </tr>
    </thead>
    <tbody>
      ${studentGrades(students)}
    </tbody>
    </table>
</div>
  `;
};
