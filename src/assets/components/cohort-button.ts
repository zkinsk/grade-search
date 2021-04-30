export const cohortButton = ({ id, cohortName }) => {
  return $(`
<button class="btn btn-primary mx-1" data-id="${id}">${cohortName}</button>
  `);
};
