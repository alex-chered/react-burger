// third-party libraries
import classNames from 'classnames';
// components
import { Paragraph, ParagraphDigits } from 'components/base';
// utils
import { formatNumber } from 'utils';
// css
import styles from './feed-total.module.css';

// PROPS
interface FeedDashboardTotalProps {
  text: string;
  total: number;
  className?: string;
}

// COMPONENT
export const FeedTotal = (props: FeedDashboardTotalProps) => {
  const { text, total, className } = props;

  // css
  const classes = classNames(
    styles['feed-total'],
    className
  );

  // RENDER
  return (
    <div className={classes}>
      {/* Caption */}
      <Paragraph
        text={text}
        size="medium"
      />
      {/* Value */}
      <ParagraphDigits
        size="large"
        text={formatNumber(total)}
        shadowed
      />
    </div>
  );
};
