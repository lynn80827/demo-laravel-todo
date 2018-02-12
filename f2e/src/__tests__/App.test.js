// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App, { PureApp } from '../App';

it('should render <App> correctly', () => {
  const wrapper = mount(<App />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should render <PureApp> without tasks', () => {
  const wrapper = mount(
    <PureApp
      isDialogOpen={false}
      openDialog={() => {}}
      closeDialog={() => {}}
      tasks={[]}
      setTasks={() => []}
      setLoading={() => {}}
    />,
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should render <PureApp> with tasks', () => {
  const wrapper = mount(
    <PureApp
      isDialogOpen={false}
      openDialog={() => {}}
      closeDialog={() => {}}
      tasks={[
        {
          taskId: 1,
          content: 'content',
          images: [{ imageId: 1, url: 'image/url/1' }],
          createdAt: 123,
        },
      ]}
      setTasks={() => []}
      setLoading={() => {}}
    />,
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
