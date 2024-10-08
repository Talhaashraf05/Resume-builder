import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../themeContext.jsx';
import { FormControlLabel, styled, Switch } from '@mui/material';

const Navbar = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const linkClass = ({ isActive }) =>
    isActive
      ? 'tw-text-white tw-bg-black tw-hover:bg-gray-900 tw-hover:text-white tw-rounded-md tw-px-3 tw-py-2'
      : 'tw-text-white tw-hover:bg-gray-900 tw-hover:text-white tw-rounded-md tw-px-3 tw-py-2';

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#aab4be',
          ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      ...theme.applyStyles('dark', {
        backgroundColor: '#003892',
      }),
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#aab4be',
      borderRadius: 20 / 2,
      ...theme.applyStyles('dark', {
        backgroundColor: '#8796A5',
      }),
    },
  }));

  return (
    <>
      <nav className="tw-bg-cyan-200">
        <div className="tw-mx-auto tw-max-w-7xl tw-px-2 tw-sm:px-6 tw-lg:px-8">
          <div className="tw-flex tw-h-20 tw-items-center tw-justify-between">
            <div className="tw-w-[75%]  sm:tw-w-[25%]">
              <h1 className="tw-text-white tw-text-2xl tw-font-bold">
                <a href="/">CV Maker</a>
              </h1>
            </div>
            <div className="tw-hidden sm:tw-flex tw-flex-1 tw-items-center tw-justify-center tw-md:items-stretch tw-md:justify-start tw-w-[50%]">
              <div className="tw-md:ml-auto">
                <div className="tw-flex tw-space-x-2">
                  <NavLink to="/" className={linkClass}>
                    Home 😎
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="tw-w-[25%] tw-flex tw-justify-end">
              {/*<Button*/}
              {/*  variant="contained"*/}
              {/*  className={*/}
              {/*    mode === 'dark'*/}
              {/*      ? '!tw-bg-[#f0f8ff] !tw-text-black tw-w-[30px] sm:tw-w-[90px]'*/}
              {/*      : '!tw-bg-black !tw-text-[#f0f8ff] tw-w-[30px] sm:tw-w-[90px]'*/}
              {/*  }*/}
              {/*  onClick={toggleTheme}*/}
              {/*>*/}
              {/*  {mode === 'dark' ? <p>bright</p> : <p>dark</p>}*/}
              {/*</Button>*/}
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    checked={mode === 'dark'}
                    onChange={toggleTheme}
                  />
                }
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
