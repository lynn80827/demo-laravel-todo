// @flow
export type Image = {
  imageId: number,
  url: string,
};
export type Task = {
  taskId: number,
  content: string,
  images: Array<Image>,
  createdAt: number,
};
export type Tasks = Array<Task>;

// Task
export type OnTaskDelete = (taskId: number) => Promise<void> | void;

// Image
export type OnImageDelete = ({ imageId: number, taskId: number }) => Promise<
  void,
> | void;
export type OnImageChange = ({ taskId: number, file: Object }) => Promise<
  void,
> | void;
