// @flow
import * as React from 'react';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';

const AddButton = (props?: Object) => (
  <Button
    variant="fab"
    color="secondary"
    style={{ position: 'fixed', bottom: 24, right: 24 }}
    {...props}
  >
    <AddIcon />
  </Button>
);

export default AddButton;
