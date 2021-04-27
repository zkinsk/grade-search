interface PlusObj {
  [key: string]: any;
}
export interface UserInfo extends PlusObj {
  id: number;
  userName: string;
}

export interface Course extends PlusObj {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface CourseRole extends PlusObj {
  courseRoleCode: string;
  name: string;
}

export interface Enrollment extends PlusObj {
  id: number;
  courseId: number;
  course: Course;
  courseRole: CourseRole;
}

interface MeInterface extends PlusObj {
  userInfo: UserInfo;
  Enrollments: Enrollment[];
}

export default MeInterface;
