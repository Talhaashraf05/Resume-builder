import {FacebookRounded, Instagram, LinkedIn, X} from "@mui/icons-material";
import {useContext} from "react";
import {ThemeContext} from "../../themeContext.jsx";
import Hamster from "/hamster.png";
import "./css/components.scss"

const Footer = () => {
    const {mode} = useContext(ThemeContext);
    return (
        <footer className="tw-h-[300px] tw-mt-5">
            <div className="tw-bg-[#E2CBE1] tw-text-white tw-flex tw-justify-center tw-items-center tw-h-full tw-flex-col tw-gap-4 sm:tw-flex-row">
                <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-gap-5  sm:tw-w-1/3">
                    <h1>
                        &copy; 2024 Talha Ashraf. All rights reserved.
                    </h1>
                </div>
                <div className="tw-w-1/3 tw-flex tw-justify-center tw-items-center tw-gap-5 sm:tw-w-1/3">
                    <img src={Hamster} className="tw-w-[140px]" alt={"Logo"}/>
                </div>
                <div className="tw-w-1/3 tw-flex tw-justify-center tw-items-center tw-gap-5 sm:tw-w-1/3">
                    <FacebookRounded className="pointer"/>
                    <Instagram className="pointer"/>
                    <LinkedIn className="pointer"/>
                    <X className="pointer"/>
                </div>
            </div>
            <div className="tw-flex tw-justify-center tw-items-center tw-h-[50px]">
                {
                    mode === 'dark' ? <h1 style={{color:"white"}}>Made with ❤️ by Talha Ashraf</h1> : <h1>  Made with ❤️ by Talha Ashraf </h1>
                }
            </div>
        </footer>
    );
}

export default Footer;