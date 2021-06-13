import { ReducedAssignments } from './calendar-assignments';

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

// export type ReducedStudentGrades = Pick<StudentAssignmentGrade, 'studentName'> & {
//   assignments: Array<Pick<StudentAssignmentGrade, 'assignmentTitle' | 'submitted' | 'grade'>>;
// };

type StudentNoName = Pick<StudentAssignmentGrade, 'assignmentTitle' | 'submitted' | 'grade'>;

export type StudentGrades = StudentNoName & ReducedAssignments;

export type MappedStudentsWithAssignments = Map<
  string,
  {
    grades: Array<StudentNoName & { assignmentDate: Date; dueDate: Date }>;
    attendance: {
      sessions: number;
      absent: number;
      unexcused: number;
      excused: number;
    };
  }
>;

export default StudentAssignmentGrade;
