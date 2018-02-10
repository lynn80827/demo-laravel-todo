// @flow
import * as React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class CreateFormDialog extends React.Component<
  {
    isOpen: boolean,
    onClose: Function,
    onSubmit: (value: string) => Promise<void> | void,
  },
  { value: string },
> {
  state = { value: '' };
  onChange = (e: SyntheticInputEvent<typeof TextField>) => {
    const { value } = e.target;
    this.setState(() => ({ value }));
  };
  onSubmit = () => {
    this.props.onSubmit(this.state.value);
    this.setState(() => ({ value: '' }));
  };
  onKeyPress = (e: SyntheticEvent<typeof Dialog>) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };
  render() {
    const { isOpen, onClose } = this.props;
    const { value } = this.state;
    const { onChange, onSubmit, onKeyPress } = this;

    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        onKeyPress={onKeyPress}
      >
        <DialogTitle id="form-dialog-title">Create Task</DialogTitle>
        <DialogContent>
          <DialogContentText>建立一個待辦事項，例如「帳單」</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Task content"
            type="text"
            fullWidth
            value={value}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreateFormDialog;
