import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../themeContext.jsx';
import { Button } from '@mui/material';

const Navbar = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const linkClass = ({ isActive }) =>
    isActive
      ? 'tw-text-white tw-bg-black tw-hover:bg-gray-900 tw-hover:text-white tw-rounded-md tw-px-3 tw-py-2'
      : 'tw-text-white tw-hover:bg-gray-900 tw-hover:text-white tw-rounded-md tw-px-3 tw-py-2';

  return (
    <>
      <nav className="tw-bg-[#E2CBE1] tw-border-b tw-border-[#FAE7E8]">
        <div className="tw-mx-auto tw-max-w-7xl tw-px-2 tw-sm:px-6 tw-lg:px-8">
          <div className="tw-flex tw-h-20 tw-items-center tw-justify-between">
            <div>
              <h1 className="tw-text-white tw-text-2xl tw-font-bold">
                CV Maker
              </h1>
            </div>
            <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center tw-md:items-stretch tw-md:justify-start">
              {/*<a className="flex flex-shrink-0 items-center mr-4" href="/">*/}
              {/*    <img*/}
              {/*        className="h-10 w-auto"*/}
              {/*        src={logo}*/}
              {/*        alt="React Jobs"*/}
              {/*    />*/}
              {/*    <span className="hidden md:block text-white text-2xl font-bold ml-2"> React Jobs </span*/}
              {/*    >*/}
              {/*</a>*/}
              <div className="tw-md:ml-auto">
                <div className="tw-flex tw-space-x-2">
                  <NavLink to="/" className={linkClass}>
                    Home 😶‍🌫️
                  </NavLink>
                  <NavLink to="/cv" className={linkClass}>
                    CV PAGE
                  </NavLink>
                </div>
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                className={
                  mode === 'dark'
                    ? '!tw-bg-[#f0f8ff] !tw-text-black tw-w-[30px] sm:tw-w-[90px]'
                    : '!tw-bg-black !tw-text-[#f0f8ff] tw-w-[30px] sm:tw-w-[90px]'
                }
                onClick={toggleTheme}
              >
                {mode === 'dark' ? <p>dark</p> : <p>bright</p>}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
