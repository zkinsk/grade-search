import { MappedAssignments } from '../js/types/calendar-assignments';
import { MappedStudentsWithAssignments } from '../js/types/grades';

const assignmentTitles = (assignments: MappedAssignments) => {
  const headers = [];
  for (const [key, { required }] of assignments) {
    headers.push(
      `<th scope="col" class="table-header-rotate ${
        required ? '' : 'not-required'
      }"><div><span class="pl-2">${key}</span></div></th>`
    );
  }
  return headers.join('');
};

const studentGrades = (students: MappedStudentsWithAssignments) => {
  const studentRow = [];
  for (const [name, value] of students) {
    studentRow.push(`
    <tr class="grade-table-row">
    <td data-student-name="${name.toLowerCase()}">${name}<div>A:${value.attendance.absent} / U:${
      value.attendance.unexcused
    } / T:${value.attendance.sessions}</div></td>
    ${value.grades.map(({ grade }) => `<td ${grade === 'NTI' ? 'class="NTI"' : ''}>${grade}</td>`).join('')}
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
  <table class="table table-striped table-bordered table-dark grade-table table-sm">
    <thead class="grade-table-header thead-dark">
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
