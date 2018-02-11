// @flow
import { withStateHandlers, type HOC } from 'recompose';

export type WithDialogStateProps = {
  isDialogOpen: boolean,
  openDialog: () => void,
  closeDialog: () => void,
};

const withDialogState: HOC<any, WithDialogStateProps> = withStateHandlers(
  () => ({ isDialogOpen: false }),
  {
    openDialog: () => () => ({ isDialogOpen: true }),
    closeDialog: () => () => ({ isDialogOpen: false }),
  },
);

export default withDialogState;
