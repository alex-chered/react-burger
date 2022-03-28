// router
import { Link } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph } from 'components/base';
// css
import styles from './link-panel.module.css';

// PROPS
interface LinkPanelElementProps {
  question: string;
  linkText: string;
  to: string;
  className?: string;
}

// COMPONENT
export const LinkPanelElement = (props: LinkPanelElementProps) => {
  const {
    className = '',
    question,
    linkText,
    to
  } = props;

  // css
  const classes = classNames(
    styles['link-panel__element'],
    className
  );

  // RENDER
  return (
    <div className={classes}>

      {/* Question */}
      <Paragraph
        className={styles['link-panel__question']}
        text={question}
      />

      {/* Link */}
      <Link to={to}>
        <Paragraph
          className={styles['link-panel__link']}
          text={linkText}
        />
      </Link>

    </div>
  );
};
