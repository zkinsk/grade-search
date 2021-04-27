export interface Category {
  code: string;
  name: string;
}

interface CalendarAssignment {
  id: number;
  assignmentDate: Date;
  dueDate: Date;
  title: string;
  required: boolean;
  category: Category;
}

export default CalendarAssignment;
