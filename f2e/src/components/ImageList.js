// @flow
import * as React from 'react';
import ImageItem from './ImageItem';
import { type Image, type OnImageDelete } from '../utils/type.flow';

const ImageList = ({
  taskId,
  images = [],
  onDelete,
}: {
  taskId: number,
  images: Array<Image>,
  onDelete: OnImageDelete,
}) =>
  images.map(({ imageId, url }: Image) => (
    <ImageItem
      key={imageId}
      taskId={taskId}
      image={{ imageId, url }}
      onDelete={onDelete}
      style={{ overflow: 'hidden' }}
    />
  ));

export default ImageList;
