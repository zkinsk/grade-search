interface AnyObj {
  [key: string]: any;
}
export interface Category {
  code: string;
  name: string;
}

export interface CalendarAssignment extends AnyObj {
  id: number;
  assignmentDate: string;
  dueDate: string;
  title: string;
  required: boolean;
  category: Category;
}

interface CohortAssignments extends AnyObj {
  currentWeekAssignments: {
    [key: string]: any;
  };
  calendarAssignments: CalendarAssignment[];
}

export default CohortAssignments;
