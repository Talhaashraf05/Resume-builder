import image2 from '../assets/images/cv.png';

const Banner = () => {
  return (
    <div className="tw-relative tw-w-full tw-h-[300px] sm:!tw-h-[500px]">
      <div className="tw-absolute tw-w-full tw-h-[300px] tw-bg-black tw-bg-opacity-50 sm:!tw-h-[500px]"></div>
      {/*<video*/}
      {/*  src={videoBg}*/}
      {/*  autoPlay*/}
      {/*  muted*/}
      {/*  loop*/}
      {/*  className="tw-w-full tw-h-full tw-object-cover"*/}
      {/*/>*/}
      <img
        src={image2}
        alt="background"
        className="tw-w-full tw-h-full tw-object-cover tw-object-center"
      />
      <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-text-white tw-text-4xl tw-text-center">
        Let’s craft a CV that truly
        <br /> stands out! 😉
      </div>
    </div>
  );
};

export default Banner;
