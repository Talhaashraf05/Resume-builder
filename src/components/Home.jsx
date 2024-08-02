import {useEffect, useState} from "react";
import "././css/components.scss";
import {useSelector} from "react-redux";
import Intro from "./Information/intro.jsx";
import Social from "./Information/social.jsx";
import Education from "./Information/education.jsx";
import Experience from "./Information/experience.jsx";
import Skill from "./Information/Skill.jsx";
import Language from "./Information/language.jsx";
import Achievements from "./Information/achievements.jsx";

const Home = () => {
    const cvInfo = useSelector((state) => state.cvInfo.cvInfo[0]);
    const [formValues, setFormValues] = useState(cvInfo);
    const handleFormValuesChange = (newValues) => {
        setFormValues(newValues);
    };
    useEffect(() => {
        setFormValues(cvInfo);
    }, [cvInfo]);

    return (
        <div className="tw-mt-3 tw-flex tw-justify-center">
            <div className="tw-w-[90%] sm:!tw-w-[60%]">
                {/*Intro*/}
                <Intro formValues={formValues} onFormValuesChange={handleFormValuesChange}/>

                {/*Social*/}
                <Social formValues={formValues} onFormValuesChange={handleFormValuesChange}/>

                {/*Education*/}
                <Education formValues={formValues} onFormValuesChange={handleFormValuesChange}/>

                {/*Experience*/}
                <Experience formValues={formValues} onFormValuesChange={handleFormValuesChange}/>

                {/*Skills*/}
                <Skill formValues={formValues} onFormValuesChange={handleFormValuesChange}/>

                {/*Language*/}
                <Language formValues={formValues} onFormValuesChange={handleFormValuesChange}/>

                {/*Achievements*/}
                <Achievements formValues={formValues} onFormValuesChange={handleFormValuesChange}/>
            </div>
        </div>
    );
}

export default Home;
