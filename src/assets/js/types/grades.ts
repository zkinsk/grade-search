interface StudentAssignmentGrade {
  assignmentTitle: string;
  studentName: string;
  submitted: boolean;
  grade: string | null;
}

export type AdaptedGrades = Pick<StudentAssignmentGrade, 'grade' | 'submitted' | 'studentName'>;

export interface SortedAssignment {
  assignmentTitle: string;
  sortOrder: number;
  grades: AdaptedGrades[];
}

export default StudentAssignmentGrade;
