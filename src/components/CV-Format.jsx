import {useReactToPrint} from "react-to-print";
import {useRef} from "react";
import { useSelector} from "react-redux";
import {Button, Card} from "@mui/material";
import "../components/css/components.scss";

const CVFormat = () => {
    const cvInfo = useSelector((state) => state.cvInfo.cvInfo[0]);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const linkedInProfile = cvInfo.social.find(social => social.platform === 'LINKEDIN');
    console.log(linkedInProfile);

    return (
        <Card>
            <div ref={componentRef} className="tw-max-w-6xl tw-mx-auto tw-p-4  ">
                <header className="tw-text-center tw-mb-6">
                    <h1 className="tw-text-4xl ">{cvInfo.firstName} {cvInfo.middleName} {cvInfo.lastName}</h1>
                    {
                        <p className="tw-text-xl tw-inline">
                            <a href={cvInfo.website}>{cvInfo.website} | </a>
                        </p>
                    }
                <p className="tw-text-xl tw-inline">
                    <a href={`mailto:${cvInfo.email}`}>{cvInfo.email}</a>
                    </p>
                </header>

                <div className="tw-flex tw-flex-row">
                    <div className=" tw-w-[50%] tw-pr-3 tw-mr-3">
                        <section className="tw-mb-6">
                            <h2 className="tw-text-2xl tw-font-semibold tw-border-b tw-pb-2">Contact</h2>
                            <div className="tw-mt-2 ">
                                <div className="tw-mb-3">
                                    {
                                        cvInfo.isNumberNeeded ?
                                            <p className="">Phone: </p> : null
                                    }
                                    {
                                        cvInfo.isNumberNeeded ?
                                            <p className=""><a href={`tel:${cvInfo.number}`}>{cvInfo.number} </a></p> : null
                                    }
                                    <p>Email: </p>
                                    <p><a href={`mailto:${cvInfo.email}`}>{cvInfo.email} </a></p>

                                </div>
                            </div>
                        </section>

                        <section className="tw-mb-6">
                            <h2 className="tw-text-2xl tw-font-semibold tw-border-b tw-pb-2">Education</h2>
                            <div className="tw-mt-2 ">
                                {
                                    cvInfo.education.map((education, index) => (
                                        <div className="tw-mb-3" key={index}>
                                            <h2 className=" tw-font-[500]">{education.school}</h2>
                                            <p className="tw-italic !tw-text-[15px]">{education.degreeType} {education.major}</p>
                                            <p className="!tw-text-[14px]">{education.endDate} | {education.location}</p>
                                            <p className="!tw-text-[14px]">GPA: {education.gpa}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>

                        <section className="tw-mb-6">
                            <h2 className="tw-text-2xl tw-font-semibold tw-border-b tw-pb-2">Language</h2>
                            <ul className="tw-mt-2 tw-mr-5">
                                {
                                    cvInfo.languages.map((language, index) => (
                                        <li key={index} className="tw-mb-2 tw-flex tw-justify-between">
                                            <h1 className="tw-inline">{language.language}</h1>
                                            <p className="tw-inline">{language.proficiency}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>

                        <section className="tw-mb-6">
                            <h2 className="tw-text-2xl tw-font-semibold tw-border-b tw-pb-2">Skills</h2>
                            <div className="tw-mt-2">
                                {
                                    cvInfo.skills.map((skill, index) => (
                                        <div className="tw-mb-3" key={index}>
                                            <h2 className=" tw-font-[500]">{skill.category}</h2>
                                            <ul className="tw-list-disc tw-ml-5">
                                                {skill.skill.split(',').map((skillItem, idx) => (
                                                    <li key={idx}>{skillItem.trim()}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                    </div>

                    <div className="tw-w-[100%] tw-flex tw-flex-col tw-justify-between">
                        <div>
                            <section className="tw-mb-6">
                                <h2 className="tw-text-2xl tw-font-semibold tw-border-b tw-pb-2">Profile</h2>
                                <div className="tw-mt-2">
                                    <p>{cvInfo.aboutMe}</p>
                                </div>
                            </section>

                            <section className="tw-mb-6">
                                <h2 className="tw-text-2xl tw-font-semibold tw-border-b tw-pb-2">Work Experience</h2>
                                <div className="tw-mt-2">
                                    {
                                        cvInfo.workExperience.map((workExperience, index) => (
                                            <div key={index} className="tw-mb-3">
                                                <h3 className="tw-font-bold">{workExperience.company} | {workExperience.position}</h3>
                                                <p className="!tw-text-[14px]">{workExperience.startDate} - {workExperience.endDate} | {workExperience.location}</p>
                                                {/*<p>{workExperience.description}</p>*/}
                                                <div  dangerouslySetInnerHTML={{__html: workExperience.description}}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </section>
                        </div>

                        <div>
                            <section className="tw-mb-6">
                                <h2 className="tw-text-2xl tw-font-semibold tw-border-b tw-pb-2">Awards</h2>
                                <div className="tw-mt-2">
                                    {
                                        cvInfo.achievements.map((achievement, index) => (
                                            <div key={index} className="tw-mb-3">
                                                <h3 className="tw-font-bold">{achievement.title} | {achievement.date}</h3>
                                                <div dangerouslySetInnerHTML={{__html: achievement.description}}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </section>
                        </div>
                    </div>
                </div>


            </div>

            <div className="tw-mt-5 tw-mb-5 tw-flex tw-justify-center">
                <Button onClick={handlePrint} variant="contained"
                        color="secondary">Download as PDF
                </Button>
            </div>
        </Card>
    );
}

export default CVFormat;