// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-topbar-progress-indicator');
jest.mock('react-dnd-dropzone', () => 'mock-react-dnd-dropzone');
jest.mock('react-input-files', () => 'mock-react-input-files');
jest.mock('react-medium-image-zoom', () => 'mock-react-medium-image-zoom');
jest.mock('rc-queue-anim', () => 'mock-rc-queue-anim');

// Material
jest.mock('material-ui-icons/Add', () => 'mock-material-ui-icons-Add');
jest.mock('material-ui-icons/Clear', () => 'mock-material-ui-icons-Clear');
jest.mock('material-ui-icons/Delete', () => 'mock-material-ui-icons-Delete');
jest.mock('material-ui/Button', () => 'mock-material-ui-Button');
jest.mock('material-ui/AppBar', () => 'mock-material-ui-AppBar');
jest.mock('material-ui/Toolbar', () => 'mock-material-ui-Toolbar');
jest.mock('material-ui/IconButton', () => 'mock-material-ui-IconButton');
jest.mock('material-ui/Avatar', () => 'mock-material-ui-Avatar');
