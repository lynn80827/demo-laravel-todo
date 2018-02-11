// @flow
import * as R from 'ramda';
import { withReducer, type HOC } from 'recompose';
import { type Tasks, type Image, type Task } from './type.flow';

type SetTasksAction =
  | { type: 'SET_TASKS', payload: Tasks }
  | { type: 'SET_TASK', payload: Task }
  | { type: 'DELETE_TASK', payload: number }
  | { type: 'DELETE_IMAGE', payload: { taskId: number, imageId: number } }
  | {
      type: 'SET_IMAGE',
      payload: { taskId: number, imageId: number, url: string },
    };

export type WithTasksProps = {
  tasks: Tasks,
  setTasks: SetTasksAction => Tasks,
};

const withTasks: HOC<*, WithTasksProps> = withReducer(
  'tasks',
  'setTasks',
  (state, { type, payload }) => {
    switch (type) {
      case 'SET_TASKS':
        return payload;
      case 'SET_TASK':
        return [payload, ...state];
      case 'DELETE_TASK':
        return state.filter(task => task.taskId !== payload);
      case 'DELETE_IMAGE': {
        const { taskId, imageId } = payload;
        const index = R.findIndex(R.propEq('taskId', taskId))(state);
        const lens = (R: any).lensPath([index, 'images']);

        return (R: any).over(
          lens,
          R.filter((image: Image) => image.imageId !== imageId),
        )(state);
      }
      case 'SET_IMAGE': {
        const { taskId, imageId, url } = payload;
        const index = R.findIndex(R.propEq('taskId', taskId))(state);
        const lens = (R: any).lensPath([index, 'images']);
        return (R: any).over(lens, R.prepend({ imageId, url }))(state);
      }
      default:
        return state;
    }
  },
  [],
);

export default withTasks;
