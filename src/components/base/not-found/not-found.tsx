// router
import { useHistory } from 'react-router-dom';
// third-party libraries
import classNames from 'classnames';
// components
import { Button, Paragraph } from 'components/base';
// css
import styles from './not-found.module.css';

// PROPS
interface NotFoundProps {
  className?: string;
}

// COMPONENT
export const NotFound = (props: NotFoundProps) => {
  const { className } = props;

  const { push } = useHistory();

  // css
  const classes = classNames(
    styles['not-found'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      <Paragraph
        text="По Вашему запросу ничего не найдено"
        size="medium"
      />
      <Button
        text="На главную"
        onClick={() => push('/')}
      />
    </div>
  );
};
