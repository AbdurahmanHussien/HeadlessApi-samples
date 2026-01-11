export interface LiferayUser {
  id: number;
  name: string;
  emailAddress: string;
  jobTitle?: string;
}

export interface UserResponse {
  items: LiferayUser[];
  page: number;
  totalCount: number;
}
