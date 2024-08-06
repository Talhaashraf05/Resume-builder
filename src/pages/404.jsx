import Hamster from '/hamster.png';
import { useContext } from 'react';
import { ThemeContext } from '../../themeContext.jsx';

const Error = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <>
      <card className="tw-flex tw-justify-center tw-items-center tw-h-[100vh] tw-flex-col tw-gap-4 tw-bg-cyan-200">
        <img src={Hamster} className="tw-w-[140px]" alt={'Logo'} />
        <h1>404 - Page Not Found 😔</h1>
      </card>
    </>
  );
};

export default Error;
