/* eslint react/no-did-mount-set-state: 0 */
// @flow
import * as React from 'react';
import * as R from 'ramda';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TopBarProgress from 'react-topbar-progress-indicator';
import TaskList from './components/TaskList';
import AddButton from './components/AddButton';
import CreateFormDialog from './components/CreateFormDialog';
import * as API from './utils/API';
import { type Tasks, type Image } from './utils/type.flow';

TopBarProgress.config({
  barColors: {
    '0': '#E8F5E9',
    '1.0': '#4CAF50',
  },
  shadowBlur: 5,
  barThickness: 4,
});

class App extends React.Component<
  {},
  { tasks: Tasks, isOpen: boolean, isLoading: boolean },
> {
  state = { tasks: [], isOpen: false, isLoading: false };
  async componentDidMount() {
    try {
      this.onLoadingStart();
      const tasks = await API.queryTasks();
      this.setState(() => ({ tasks }));
    } catch (error) {
      console.log({ error });
    } finally {
      this.onLoadingEnd();
    }
  }
  onLoadingStart = () => this.setState(() => ({ isLoading: true }));
  onLoadingEnd = () => this.setState(() => ({ isLoading: false }));
  onTaskDelete = async (taskId: number) => {
    try {
      this.onLoadingStart();
      await API.deleteTask(taskId);
      this.setState(({ tasks }) => ({
        tasks: tasks.filter(task => task.taskId !== taskId),
      }));
    } catch (error) {
      console.log({ error });
    } finally {
      this.onLoadingEnd();
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
      this.onLoadingStart();
      await API.deleteImage(imageId);
      this.setState(({ tasks }) => {
        const index = R.findIndex(R.propEq('taskId', taskId))(tasks);
        const lens = (R: any).lensPath([index, 'images']);
        return {
          tasks: (R: any).over(
            lens,
            R.filter((image: Image) => image.imageId !== imageId),
          )(tasks),
        };
      });
    } catch (error) {
      console.log({ error });
    } finally {
      this.onLoadingEnd();
    }
  };
  onSubmit = async (value: string) => {
    try {
      this.onLoadingStart();
      const task = await API.createTask(value);
      this.setState(({ tasks }) => ({
        tasks: [task, ...tasks],
        isOpen: false,
      }));
      console.log(task);
    } catch (error) {
      console.log({ error });
    } finally {
      this.onLoadingEnd();
    }
  };
  onAddClick = () => this.setState(() => ({ isOpen: true }));
  onClose = () => this.setState(() => ({ isOpen: false }));
  onFileChange = async ({ file, taskId }: { file: Object, taskId: number }) => {
    try {
      this.onLoadingStart();
      const { imageId, url } = await API.createImage(taskId, file);
      this.setState(({ tasks }) => {
        const index = R.findIndex(R.propEq('taskId', taskId))(tasks);
        const lens = (R: any).lensPath([index, 'images']);
        return {
          tasks: (R: any).over(lens, R.prepend({ imageId, url }))(tasks),
        };
      });
    } catch (error) {
      console.log({ error });
    } finally {
      this.onLoadingEnd();
    }
  };
  render() {
    const { tasks, isOpen, isLoading } = this.state;
    const {
      onSubmit,
      onTaskDelete,
      onClose,
      onAddClick,
      onFileChange,
      onImageDelete,
    } = this;

    return (
      <div>
        {/* Loading progress */}
        {isLoading && <TopBarProgress />}

        {/* Header */}
        <AppBar position="sticky">
          <Toolbar>Task Management</Toolbar>
        </AppBar>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onDelete={onTaskDelete}
          onImageChange={onFileChange}
          onImageDelete={onImageDelete}
        />

        {/* Create Task & Dialog */}
        <AddButton onClick={onAddClick} />
        <CreateFormDialog
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}

export default App;
