import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/mainLayout.jsx';
import HomePage from './pages/homePage.jsx';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../themeContext.jsx';
import CvPage from './pages/cvPage.jsx';
import Error from './pages/404.jsx';
import ErrorLayout from './layouts/errorLayout.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor =
      mode === 'light' ? '#ffffff' : '#000000';
  }, [mode]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/*For main layout*/}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/cv" element={<CvPage />} />
        </Route>
        {/*For error page*/}
        <Route path="*" element={<ErrorLayout />}>
          <Route path="*" element={<Error />} />
        </Route>
      </>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
