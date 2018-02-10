// @flow
import * as React from 'react';
import QueueAnim from 'rc-queue-anim';
import TaskItem from './TaskItem';
import {
  type Task,
  type Tasks,
  type OnImageChange,
  type OnImageDelete,
  type OnTaskDelete,
} from '../utils/type.flow';

const TaskList = ({
  tasks = [],
  onDelete,
  onImageDelete,
  onImageChange,
}: {
  tasks: Tasks,
  onDelete: OnTaskDelete,
  onImageDelete: OnImageDelete,
  onImageChange: OnImageChange,
}) => (
  <QueueAnim style={{ padding: 16 }}>
    {tasks.map((task: Task) => (
      <TaskItem
        key={task.taskId}
        task={task}
        onDelete={onDelete}
        onImageDelete={onImageDelete}
        onImageChange={onImageChange}
        style={{ marginTop: 12 }}
      />
    ))}
  </QueueAnim>
);

export default TaskList;
