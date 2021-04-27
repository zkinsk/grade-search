export const assignmentCard = ({ title, grades }) => {
  return /*html*/ `
<div class="table-card">
  <thead>
    <h4>${title}</h4>
    <table class="w-100">
      <tr>
        <th>Student</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      ${grades}
    </tbody>
    </table>
</div>
  `;
};
