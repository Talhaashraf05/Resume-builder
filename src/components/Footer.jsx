import { Instagram, Language, LinkedIn } from '@mui/icons-material';
import { useContext } from 'react';
import { ThemeContext } from '../../themeContext.jsx';
import Hamster from '/hamster.png';
import './css/components.scss';

const Footer = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <footer className="tw-h-[300px] tw-mt-5">
      <div className="tw-bg-cyan-200 tw-text-white tw-flex tw-justify-center tw-items-center tw-h-full tw-flex-col tw-gap-4 sm:tw-flex-row">
        <div
          className="tw-w-full tw-flex tw-justify-center tw-items-center tw-gap-5  sm:tw-w-1/3"
          style={{ color: mode === 'dark' ? 'black' : 'white' }}
        >
          <h1>&copy; 2024 Talha Ashraf. All rights reserved.</h1>
        </div>
        <div className="tw-w-1/3 tw-flex tw-justify-center tw-items-center tw-gap-5 sm:tw-w-1/3">
          <img src={Hamster} className="tw-w-[140px]" alt={'Logo'} />
        </div>

        <div className="tw-w-1/3 tw-flex tw-justify-center tw-items-center tw-gap-5 sm:tw-w-1/3">
          <a
            href="https://www.instagram.com/talha.getpid/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram
              className="pointer"
              style={{ color: mode === 'dark' ? 'black' : 'white' }}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/talhaashraf45/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn
              className="pointer"
              style={{ color: mode === 'dark' ? 'black' : 'white' }}
            />
          </a>
          <a
            href="https://talhas.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Language
              className="pointer"
              style={{ color: mode === 'dark' ? 'black' : 'white' }}
            />
          </a>
        </div>
      </div>
      <div className="tw-flex tw-justify-center tw-items-center tw-h-[50px]">
        {mode === 'dark' ? (
          <h1 style={{ color: 'white' }}>
            Made with ❤️ by{' '}
            <a href="https://talhas.netlify.app/">Talha Ashraf</a>
          </h1>
        ) : (
          <h1>
            Made with ❤️ by{' '}
            <a href="https://talhas.netlify.app/">Talha Ashraf</a>
          </h1>
        )}
      </div>
    </footer>
  );
};

export default Footer;
