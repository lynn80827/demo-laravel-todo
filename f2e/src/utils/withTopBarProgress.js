// @flow
import * as React from 'react';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import TopBarProgress from 'react-topbar-progress-indicator';
import { Portal } from 'react-portal';
import { type HOC } from 'recompose';

export type WithTopBarProgressdProps = {
  setLoading: (isLoading: boolean) => Promise<void> | void,
};

const CONFIG = {
  barColors: {
    '0': '#E8F5E9',
    '1.0': '#4CAF50',
  },
  shadowBlur: 5,
  barThickness: 4,
};

const withTopBarProgress = (
  config: Object = CONFIG,
): HOC<*, WithTopBarProgressdProps> => (
  BaseComponent: React.ComponentType<any>,
) => {
  const factory = React.createFactory(BaseComponent);
  TopBarProgress.config(config);

  class WithTopBarProgress extends React.Component<
    any,
    { isLoading: boolean },
  > {
    state = { isLoading: false };
    setLoading = isLoading => this.setState(() => ({ isLoading }));
    render() {
      const { isLoading } = this.state;
      const { setLoading } = this;

      return (
        <React.Fragment>
          {factory({ setLoading })}
          {isLoading && (
            <Portal>
              <TopBarProgress />
            </Portal>
          )}
        </React.Fragment>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withTopBarProgress'))(
      WithTopBarProgress,
    );
  }

  return WithTopBarProgress;
};

export default withTopBarProgress;
