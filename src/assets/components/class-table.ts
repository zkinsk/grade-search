import { MappedAssignments } from '../js/types/calendar-assignments';
import { MappedStudentsWithAssignments } from '../js/types/grades';

const assignmentTitles = (assignments: MappedAssignments) => {
  const headers = [];
  for (const [key] of assignments) {
    headers.push(`<th scope="col" class="table-header-rotate"><div><span class="pl-2">${key}</span></div></th>`);
  }
  return headers.join('');
};

const studentGrades = (students: MappedStudentsWithAssignments) => {
  const studentRow = [];
  for (const [name, value] of students) {
    studentRow.push(`
    <tr class="grade-table-row">
    <td>${name}</td>
    ${value.map(({ grade }) => `<td ${grade === 'NTI' ? 'class="NTI"' : ''}>${grade}</td>`).join('')}
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
  <table class="table table-striped table-bordered grade-table">
    <thead class="grade-table-header thead-light">
      <tr>
        <th scope="col">Student</th>
        ${assignmentTitles(assignments)}
      </tr>
    </thead>
    <tbody class="grade-table-body">
      ${studentGrades(students)}
    </tbody>
  </table>
  `;
};
