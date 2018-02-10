// @flow
import * as React from 'react';
import * as R from 'ramda';
import Card, { CardHeader } from 'material-ui/Card';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import randomcolor from 'randomcolor';
import ImageDropzone from './ImageDropzone';
import {
  type Task,
  type OnImageChange,
  type OnImageDelete,
  type OnTaskDelete,
} from '../utils/type.flow';

class TaskItem extends React.Component<{
  task: Task,
  onDelete: OnTaskDelete,
  onImageChange: OnImageChange,
  onImageDelete: OnImageDelete,
}> {
  onDelete = () => {
    const { task: { taskId }, onDelete } = this.props;
    onDelete(taskId);
  };
  render() {
    const {
      task: { taskId, content, createdAt, images },
      onImageChange,
      onImageDelete,
      ...otherProps
    } = this.props;
    const { onDelete } = this;

    return (
      <Card {...R.omit(['onDelete'])(otherProps)}>
        <CardHeader
          avatar={
            <Avatar
              style={{
                backgroundColor: randomcolor({
                  luminosity: 'dark',
                  seed: taskId,
                }),
              }}
            >
              {content[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          }
          title={content}
          subheader={new Date(createdAt * 1000).toString()}
        />
        <ImageDropzone
          taskId={taskId}
          images={images}
          onChange={onImageChange}
          onDelete={onImageDelete}
        />
      </Card>
    );
  }
}

export default TaskItem;
