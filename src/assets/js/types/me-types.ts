export interface UserInfo {
  id: number;
  userName: string;
}

export interface Course {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface CourseRole {
  courseRoleCode: string;
  name: string;
}

export interface Enrollment {
  id: number;
  courseId: number;
  course: Course;
  courseRolee: CourseRole;
}

interface MeInterface {
  userInfo: UserInfo;
  Enrollments: Enrollment[];
}

export default MeInterface;
