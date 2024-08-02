import {Button, Card, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Close, Delete, Edit} from "@mui/icons-material";
import {deleteCvInfo, updateCvInfo} from "../../redux/cvInfoSlice.js";
import {useDispatch} from "react-redux";

const Education = ({formValues , onFormValuesChange}) => {
    const dispatch = useDispatch();

    // for Education
    const handleEducationChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedEducation = [...formValues.education];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [name]: type === 'checkbox' ? checked : value,
        };
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            education: updatedEducation,
        }));
    };
    const addEducation = () => {
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            education: [
                ...prevValues.education,
                {
                    school: '',
                    major: '',
                    degreeType: '',
                    startDate: '',
                    endDate: '',
                    isEdit: true,
                    description: '',
                }
            ]
        }));
    };
    const handleDeleteEducation = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedEducation = [...prevValues.education];
            updatedEducation.splice(index, 1);
            const updatedValues = {
                ...prevValues,
                education: updatedEducation
            }
            dispatch(deleteCvInfo(updatedValues));
            return updatedValues;
        });
    };
    const handleAddEducation = (index) => {
        onFormValuesChange((prevValues)=>{
            const updatedEducation = [...prevValues.education];
            updatedEducation[index] = {
                ...updatedEducation[index],
                isEdit: false,
            };
            const updatedValues = {
                ...prevValues,
                education: updatedEducation,
            };
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        })
    }
    const handleEditEducation = (index) => {
        onFormValuesChange((prevValues)=>{
            const updatedEducation = [...prevValues.education];
            updatedEducation[index] = {
                ...updatedEducation[index],
                isEdit: true,
            };
            return {...prevValues, education: updatedEducation};
        })
    }
    return (
        <div>
            <Card variant="outlined" className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3">
                <h1>EDUCATION</h1>
                <p>Show off them degrees!</p>
                {formValues.education.map((education, index) => (
                    education.isEdit ?
                        <Card key={index} variant="outlined" className="tw-w-[80%] tw-p-5 tw-m-1">
                            <div className="tw-w-full tw-flex tw-justify-end">
                                <Close className='tw-font-black pointer'
                                       onClick={() => handleDeleteEducation(index)}/>
                            </div>
                            <div className="tw-gap-3 tw-flex tw-justify-between">
                                <TextField name="school" label="School Name" variant="standard"
                                           value={education.school}
                                           onChange={(e) => handleEducationChange(index, e)} fullWidth/>
                                <TextField name="major" label="Major" variant="standard"
                                           value={education.major}
                                           onChange={(e) => handleEducationChange(index, e)}
                                           fullWidth/>
                                <TextField name="degreeType" label="Degree Type" variant="standard"
                                           value={education.degreeType}
                                           onChange={(e) => handleEducationChange(index, e)} fullWidth/>
                            </div>
                            <div className="tw-mt-[20px]">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="isCurrent"
                                            checked={education.isCurrent}
                                            onChange={(e) => handleEducationChange(index, e)}
                                            color="primary"
                                        />
                                    }
                                    label="I am currently studying"
                                />
                            </div>
                            <div className="tw-gap-3  tw-flex tw-justify-between tw-mt-[20px]">
                                <TextField name="startDate" label="Start Date" variant="standard" type="date"
                                           InputLabelProps={{shrink: true}}

                                           value={education.startDate}
                                           onChange={(e) => handleEducationChange(index, e)} fullWidth/>
                                <TextField name="endDate" label="End Date" variant="standard" type="date"
                                           disabled={education.isCurrent}
                                           InputLabelProps={{shrink: true}}
                                           value={education.endDate}
                                           onChange={(e) => handleEducationChange(index, e)} fullWidth/>
                            </div>
                            <div className="tw-gap-3 tw-flex tw-justify-between tw-mt-[20px]">
                                <TextField
                                    name="gpa"
                                    label="Current GPA"
                                    variant="standard"
                                    fullWidth
                                    value={education.gpa}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                                <TextField
                                    name="location"
                                    label="Location"
                                    variant="standard"
                                    fullWidth
                                    value={education.location}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                            </div>
                            <div className="tw-mt-5 tw-flex tw-justify-end">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleAddEducation(index)}
                                >
                                    Add
                                </Button>
                            </div>
                        </Card>
                        :
                        <Card key={index} className="tw-w-[80%] tw-p-5 tw-m-1">
                            <div className="tw-flex tw-justify-between">
                                <h3 className="tw-font-[500]">{education.school} | {education.location}</h3>
                                <div>
                                    <Edit className="pointer" onClick={() => handleEditEducation(index)}/>
                                    <Delete className="pointer" color={'warning'}
                                            onClick={() => handleDeleteEducation(index)}/>
                                </div>
                            </div>
                            <p>{education.degreeType}, {education.major}</p>
                            <p>
                                {education.isCurrent ? 'Currently Studying 📚' : education.endDate}
                            </p>
                            <p className="tw-font-[500]">GPA: {education.gpa}</p>
                        </Card>
                ))}
                <div className="tw-mt-[20px]">
                    <Button variant="contained" color="secondary" fullWidth onClick={addEducation}>
                        Add Education
                    </Button>
                </div>
            </Card>
        </div>

    );
}

export default Education;