

export interface Task {
  TaskId: string;
  TaskTitleEN: string;
  TaskTitleAR?: string;
  TaskStatus: string;
  TaskLink: string;
  TaskSource: string;
  CreatedDate: string;
  TaskSourceSystemCode: string;
  ADUserName: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface TasksResponse {
  Tasks: Task[];
  pagination: Pagination;
  Message?: string;
  Success?: boolean;
}
