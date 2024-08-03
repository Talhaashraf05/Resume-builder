import {Button, Card, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Close, Delete, Edit} from "@mui/icons-material";
import {deleteCvInfo, updateCvInfo} from "../../redux/cvInfoSlice.js";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {validateEducationField} from "../../composables/constants/rules.js";

const Education = ({formValues , onFormValuesChange}) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const validateAllEducationEntries = () => {
        const newErrors = {};
        formValues.education.forEach((education, index) => {
            Object.keys(education).forEach((key) => {
                if (key !== 'isEdit') {
                    const error = validateEducationField(key, education[key], education.isCurrent, education.startDate);
                    if (error) {
                        newErrors[index] = newErrors[index] || {};
                        newErrors[index][key] = error;
                    }
                }
            });
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
        if (validateAllEducationEntries()) {
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
                    isCurrent: false,
                    gpa: '',
                    location : '',
                }
            ]
        }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            const newIndex = formValues.education.length;
            delete newErrors[newIndex];
            return newErrors;
        });
        }
    };
    const handleDeleteEducation = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedEducation = [...prevValues.education];
            updatedEducation.splice(index, 1);
            const updatedValues = {
                ...prevValues,
                education: updatedEducation
            }
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        });
    };
    // const handleAddEducation = (index) => {
    //     onFormValuesChange((prevValues)=>{
    //         const updatedEducation = [...prevValues.education];
    //         updatedEducation[index] = {
    //             ...updatedEducation[index],
    //             isEdit: false,
    //         };
    //         const updatedValues = {
    //             ...prevValues,
    //             education: updatedEducation,
    //         };
    //         dispatch(updateCvInfo(updatedValues));
    //         return updatedValues;
    //     })
    // }
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

    const handleAddEducation = (index) => {
        const newErrors = {};
        const education = formValues.education[index];
        Object.keys(education).forEach((key) => {
            if (key !== 'isEdit') {
                const error = validateEducationField(key, education[key], education.isCurrent);
                if (error) {
                    newErrors[index] = newErrors[index] || {};
                    newErrors[index][key] = error;
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
        } else {
            onFormValuesChange((prevValues) => {
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
            });
        }
    };

    const handleEducationClick = (index, education) => {
        if (education.isEdit && validateAllEducationEntries()) {
            handleAddEducation(index);
        } else {
            handleDeleteEducation(index);
        }
    };

    return (
        <div>
            <Card variant="outlined" className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3">
                <h3 className="tw-font-[600] tw-mb-3">STEP - 3</h3>
                <h1>EDUCATION</h1>
                <p>Show off them degrees!</p>
                {formValues.education.map((education, index) => (
                    education.isEdit ?
                        <Card key={index} variant="outlined" className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-w-full tw-flex tw-justify-end">
                                <Close className='tw-font-black pointer'
                                       onClick={() => handleEducationClick(index, education)}/>
                            </div>
                            <div className="tw-gap-3 tw-flex tw-justify-between">
                                <TextField name="school" label="School Name" variant="standard"
                                           value={education.school}
                                           error={!!errors[index]?.school}
                                           helperText={errors[index]?.school}
                                           onChange={(e) => handleEducationChange(index, e)} fullWidth/>
                                <TextField name="major" label="Major" variant="standard"
                                           value={education.major}
                                           error={!!errors[index]?.major}
                                           helperText={errors[index]?.major}
                                           onChange={(e) => handleEducationChange(index, e)}
                                           fullWidth/>
                                <TextField name="degreeType" label="Degree Type" variant="standard"
                                           value={education.degreeType}
                                           error={!!errors[index]?.degreeType}
                                           helperText={errors[index]?.degreeType}
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
                                           error={!!errors[index]?.startDate}
                                           helperText={errors[index]?.startDate}
                                           onChange={(e) => handleEducationChange(index, e)} fullWidth/>
                                <TextField name="endDate" label="End Date" variant="standard" type="date"
                                           disabled={education.isCurrent}
                                           error={!!errors[index]?.endDate}
                                           helperText={errors[index]?.endDate}
                                           InputLabelProps={{shrink: true}}
                                           value={education.endDate}
                                           onChange={(e) => handleEducationChange(index, e)} fullWidth/>
                            </div>
                            <div className="tw-gap-3 tw-flex tw-justify-between tw-mt-[20px]">
                                <TextField
                                    name="gpa"
                                    label="Current GPA / Marks"
                                    variant="standard"
                                    fullWidth
                                    value={education.gpa}
                                    error={!!errors[index]?.gpa}
                                    helperText={errors[index]?.gpa}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                                <TextField
                                    name="location"
                                    label="Location"
                                    variant="standard"
                                    fullWidth
                                    value={education.location}
                                    error={!!errors[index]?.location}
                                    helperText={errors[index]?.location}
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
                        <Card key={index} className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
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