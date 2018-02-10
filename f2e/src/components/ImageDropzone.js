// @flow
import * as React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dnd-dropzone';
import InputFiles from 'react-input-files';
import AddIcon from 'material-ui-icons/Add';
import ImageList from './ImageList';
import {
  type Image,
  type OnImageChange,
  type OnImageDelete,
} from '../utils/type.flow';

export const HEIGHT = 150;

const Container: React.ComponentType<{
  isOver: boolean,
  canDrop: boolean,
}> = styled.div`
  display: flex;
  border: 2px ${props => (props.isOver ? 'solid' : 'dashed')}
    ${props => (props.canDrop ? 'skyblue' : 'transparent')};
  transition: all ease-in-out 0.2s;
  padding: 16px;
`;

const ImageWrapper: React.ComponentType<any> = styled.div`
  display: flex;
  overflow: auto;

  > * + * {
    margin-left: 8px;
  }
`;

const CreateImage: React.ComponentType<any> = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${HEIGHT}px;
  width: ${HEIGHT}px;
  cursor: pointer;
  background-color: #fafafa;
  box-sizing: border-box;
  color: gray;

  &:hover svg {
    transform: scale(1.5);
    transition: all ease-in-out 0.2s;
  }
`;

class ImageDropzone extends React.Component<{
  taskId: number,
  images: Array<Image>,
  onDelete: OnImageDelete,
  onChange: OnImageChange,
}> {
  onChange = (files: Array<Object>) => {
    const { taskId, onChange } = this.props;
    onChange({ taskId, file: files[0] });
  };
  render() {
    const { taskId, images, onDelete } = this.props;
    const { onChange } = this;

    return (
      <Dropzone
        onDrop={onChange}
        render={({ canDrop, isOver }) => (
          <Container canDrop={canDrop} isOver={isOver}>
            <ImageWrapper>
              {/* Create Button */}
              <InputFiles onChange={onChange}>
                <CreateImage>
                  <AddIcon />
                </CreateImage>
              </InputFiles>

              {/* List */}
              <ImageList taskId={taskId} images={images} onDelete={onDelete} />
            </ImageWrapper>
          </Container>
        )}
      />
    );
  }
}

export default ImageDropzone;
