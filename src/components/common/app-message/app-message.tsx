// components
import { Container, Paragraph } from 'components/base';
// css
import styles from './app-message.module.css';

// PROPS
interface AppMessageProps {
  message: string;
}

// COMPONENT
export const AppMessage = (props: AppMessageProps) => {
  const { message } = props;

  // RENDER
  return (
    <Container>
      <div className={styles['app-message__inner']}>
        <Paragraph
          text={message}
          size="medium"
        />
      </div>
    </Container>
  );
};
