// @flow
import * as React from 'react';
import { compose } from 'recompose';
import withTopBarProgress, {
  type WithTopBarProgressdProps,
} from './utils/withTopBarProgress';
import withTasks, { type WithTasksProps } from './utils/withTasks';
import withDialogState, {
  type WithDialogStateProps,
} from './utils/withDialogState';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddButton from './components/AddButton';
import CreateFormDialog from './components/CreateFormDialog';
import * as API from './utils/API';

export class PureApp extends React.Component<
  WithTopBarProgressdProps & WithTasksProps & WithDialogStateProps,
> {
  async componentDidMount() {
    try {
      this.props.setLoading(true);
      const tasks = await API.queryTasks();
      this.props.setTasks({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      console.log({ error });
    } finally {
      this.props.setLoading(false);
    }
  }
  onTaskDelete = async (taskId: number) => {
    try {
      this.props.setLoading(true);
      await API.deleteTask(taskId);
      this.props.setTasks({ type: 'DELETE_TASK', payload: taskId });
    } catch (error) {
      console.log({ error });
    } finally {
      this.props.setLoading(false);
    }
  };
  onImageDelete = async ({
    imageId,
    taskId,
  }: {
    imageId: number,
    taskId: number,
  }) => {
    try {
      this.props.setLoading(true);
      await API.deleteImage(imageId);
      this.props.setTasks({
        type: 'DELETE_IMAGE',
        payload: { taskId, imageId },
      });
    } catch (error) {
      console.log({ error });
    } finally {
      this.props.setLoading(false);
    }
  };
  onSubmit = async (value: string) => {
    try {
      this.props.setLoading(true);
      const task = await API.createTask(value);
      this.props.setTasks({
        type: 'SET_TASK',
        payload: task,
      });
      this.props.closeDialog();
    } catch (error) {
      console.log({ error });
    } finally {
      this.props.setLoading(false);
    }
  };
  onImageChange = async ({
    file,
    taskId,
  }: {
    file: Object,
    taskId: number,
  }) => {
    try {
      this.props.setLoading(true);
      const { imageId, url } = await API.createImage(taskId, file);
      this.props.setTasks({
        type: 'SET_IMAGE',
        payload: { taskId, imageId, url },
      });
    } catch (error) {
      console.log({ error });
    } finally {
      this.props.setLoading(false);
    }
  };
  render() {
    const { isDialogOpen, openDialog, closeDialog, tasks } = this.props;
    const { onSubmit, onTaskDelete, onImageChange, onImageDelete } = this;

    return (
      <React.Fragment>
        <Header />
        <TaskList
          tasks={tasks}
          onDelete={onTaskDelete}
          onImageChange={onImageChange}
          onImageDelete={onImageDelete}
        />
        <AddButton onClick={openDialog} />
        <CreateFormDialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          onSubmit={onSubmit}
        />
      </React.Fragment>
    );
  }
}

const App: React.ComponentType<any> = compose(
  withTopBarProgress() /* Loading State */,
  withTasks /* Tasks State & Reducer */,
  withDialogState /* Dialog State */,
)(PureApp);

export default App;
