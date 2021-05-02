export const cohortButton = ({ id, cohortName, courseId }: { id: number; cohortName: string; courseId: number }) => {
  return $(`
<button class="btn btn-primary mx-1" data-id="${id}" data-course-id="${courseId}">${cohortName}</button>
  `);
};
