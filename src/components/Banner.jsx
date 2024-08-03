import videoBg from "../assets/video/hamster.mp4"

const Banner = () => {
    return (
        // <>
        // {/*// <div>*/}
        // {/*//     className="tw-h-[400px] tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-flex tw-items-center tw-justify-center tw-bg-[#FAE7E8]">*/}
        // {/*//     /!*style={{backgroundImage: 'url("/src/assets/Hamster.jpg")'}}*!/*/}
        // {/*//     <h1 className="tw-text-4xl tw-text-center tw-mb-4 tw-mt-8 ">Hello there 👋🏻</h1>*/}
        // {/*// </div>*/}
        // <div className="tw-absolute tw-w-full tw-h-[500px] tw-bg-black tw-bg-opacity-50">
        // </div>
        // <div>
        //     <video src={videoBg} autoPlay muted loop className="tw-w-full tw-h-[500px] tw-object-cover"/>
        // </div>
        // </>

        <div className="tw-relative tw-w-full tw-h-[300px] sm:!tw-h-[500px]">
            <div className="tw-absolute tw-w-full tw-h-[300px] tw-bg-black tw-bg-opacity-50 sm:!tw-h-[500px]">
            </div>
            <video src={videoBg} autoPlay muted loop className="tw-w-full tw-h-full tw-object-cover"/>
            <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-text-white tw-text-4xl">
                Hello there 👋🏻
            </div>
        </div>
    );
}

export default Banner;