import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

// PROPS
interface FooterPortalProps {
  children: ReactNode;
  className?: string;
}

// COMPONENT
export const FooterPortal = (props: FooterPortalProps) => {
  const { children } = props;

  // Get the element where modal windows will be rendered
  const footerElement = document.getElementById('footer');

  // If there is no the required "div",
  // return nothing
  if (!footerElement) {
    return null;
  }

  // RENDER
  return ReactDOM.createPortal(
    children,
    footerElement
  );
};
