import { AdaptedGrades } from '../js/types/grades';

type TableRow = (arg0: AdaptedGrades) => string;

export const tableRow: TableRow = ({ submitted, studentName, grade }) => {
  return /*html*/ `<tr class=${submitted ? '' : 'not-submitted'}>
  <td data-student-name="${studentName.toLowerCase()}">${studentName}</td>
  <td>${grade}</td>
</tr>
  `;
};
