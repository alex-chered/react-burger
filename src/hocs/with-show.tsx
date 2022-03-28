/* eslint-disable react/jsx-props-no-spreading */

import { ComponentType, FC } from 'react';

// PROPS
export interface WithShowProps {
  show?: boolean
}

// HOC
export const withShow = <P extends WithShowProps>(
  WrappedComponent: ComponentType<P>
): FC<P> => (props: P) => {
    const { show = true, ...otherProps } = props;

    if (!show) {
      return null;
    }

    return <WrappedComponent {...otherProps as P} />;
  };
