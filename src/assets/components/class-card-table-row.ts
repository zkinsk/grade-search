export const tableRow = ({ submitted, studentName, grade }) => {
  return /*html*/ `<tr class=${submitted ? '' : 'not-submitted'}>
  <td>${studentName}</td>
  <td>${grade}</td>
</tr>
  `;
};
