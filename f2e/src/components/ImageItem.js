// @flow
import * as React from 'react';
import styled from 'styled-components';
import ClearIcon from 'material-ui-icons/Clear';
import ImageZoom from 'react-medium-image-zoom';
import Tween from 'rc-tween-one';
import { HEIGHT } from './ImageDropzone';
import { type Image, type OnImageDelete } from '../utils/type.flow';

const Container = styled.div`
  position: relative;
`;

class ImageItem extends React.Component<
  {
    image: Image,
    taskId: number,
    onDelete: OnImageDelete,
  },
  {
    isHover: boolean,
  },
> {
  state = { isHover: false };
  onDelete = () => {
    const { image: { imageId }, taskId, onDelete } = this.props;
    onDelete({ imageId, taskId });
  };
  onMouseOver = () => this.setState(() => ({ isHover: true }));
  onMouseLeave = () => this.setState(() => ({ isHover: false }));
  render() {
    const { image: { url }, ...otherProps } = this.props;
    const { isHover } = this.state;
    const { onDelete, onMouseOver, onMouseLeave } = this;

    return (
      <Container
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onfocus={onMouseOver}
        onBlur={onMouseLeave}
        onClick={onMouseLeave}
        {...otherProps}
      >
        <ImageZoom
          image={{
            src: url,
            style: {
              height: HEIGHT,
              objectFit: 'cover',
              objectPosition: 'left center',
            },
          }}
          zoomImage={{ src: url }}
        />

        {isHover && (
          <Tween
            style={{ opacity: 0 }}
            animation={{ opacity: 1 }}
            component={false}
          >
            <ClearIcon
              onClick={onDelete}
              style={{
                position: 'absolute',
                transform: 'translateX(-100%)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                color: 'white',
                cursor: 'pointer',
              }}
            />
          </Tween>
        )}
      </Container>
    );
  }
}

export default ImageItem;
