import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// redux
import { Provider } from 'react-redux';
// router
import { BrowserRouter as Router } from 'react-router-dom';
// components
import { Preloader } from 'components/common';
import { ToastsContainer } from 'components/toasts';
import {
  MainLayout,
  MobileLayout
} from 'layouts';
// store
import { store } from 'store';
// routes
import { Routes } from 'routes';
// hooks
import { useWindowSize } from 'hooks/common';
// css
import './index.css';
// yandex css
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';

const App = (): JSX.Element => {
  useWindowSize();

  // RENDER
  return (
    <Preloader>
      <ToastsContainer />

      <MainLayout>
        <Routes />
      </MainLayout>

      <MobileLayout>
        <Routes />
      </MobileLayout>

    </Preloader>
  );
};

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
