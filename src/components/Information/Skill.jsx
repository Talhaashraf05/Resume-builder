import {Button, Card, Chip, TextField} from "@mui/material";
import {Close, Delete, Edit} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {updateCvInfo} from "../../redux/cvInfoSlice.js";
import {validateSkillField} from "../../composables/constants/rules.js";
import {useState} from "react";

const Skill = ({formValues , onFormValuesChange}) =>{
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({}); // State to store validation errors


    const validateAllSkillsEntries = () => {
        const newErrors = {};
        formValues.skills.forEach((skill, index) => {
            Object.keys(skill).forEach((key) => {
                const error = validateSkillField(key, skill[key]);
                if (error) {
                    newErrors[index] = newErrors[index] || {};
                    newErrors[index][key] = error;
                }
            });
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // for Skill
    const handleSkillChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedSkills = [...formValues.skills];
        updatedSkills[index] = {
            ...updatedSkills[index],
            [name]: type === 'checkbox' ? checked : value,
        };
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            skills: updatedSkills,
        }));

    }
    const addSkill = () => {
        if (validateAllSkillsEntries()) {
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            skills: [
                ...prevValues.skills,
                {
                    category: '',
                    skills: '',
                    isEdit: true,
                }
            ]
        }));

        setErrors((prevErrors) => {
            const newErrors = {...prevErrors};
            const newIndex = formValues.skills.length; // index of the newly added entry
            delete newErrors[newIndex];
            return newErrors;
        });
    }
    }
    const handleDeleteSkill = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedSkills = [...prevValues.skills];
            updatedSkills.splice(index, 1);
            const updatedValues = {
                ...prevValues,
                skills: updatedSkills,
            }
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        });
    }
    const handleAddSkill = (index) => {
        const newErrors = {};
        const skill = formValues.skills[index];
        Object.keys(skill).forEach((key) => {
            const error = validateSkillField(key, skill[key]);
            if (error) {
                newErrors[index] = newErrors[index] || {};
                newErrors[index][key] = error;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
        } else {
            onFormValuesChange((prevValues) => {
                const updatedSkills = [...prevValues.skills];
                updatedSkills[index] = {
                    ...updatedSkills[index],
                    isEdit: false,
                };
                const updatedValues = {
                    ...prevValues,
                    skills: updatedSkills,
                };
                dispatch(updateCvInfo(updatedValues));
                return updatedValues;
            });
        }
    };
    const handleEditSkill = (index) => {
        onFormValuesChange((prevValues)=>{
            const updatedSkills = [...prevValues.skills];
            updatedSkills[index] = {
                ...updatedSkills[index],
                isEdit: true,
            };
            return {...prevValues, skills: updatedSkills};
        })
    }

    const handleSkillClick = (index, skill) => {
        if (skill.isEdit && validateAllSkillsEntries()) {
            handleAddSkill(index);
        } else {
            handleDeleteSkill(index);
        }
    };
    return (
        <div>
            <Card variant="outlined" className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3">
                <h3 className="tw-font-[600] tw-mb-3">STEP - 5</h3>
                <h1>Skills</h1>
                <p>Flex your skills!</p>
                {formValues.skills.map((skill, index) => (
                    skill.isEdit ?
                        <Card key={index} variant="outlined" className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-w-full tw-flex tw-justify-end">
                                <Close className='tw-font-black pointer'
                                       onClick={() => handleSkillClick(index, skill)}/>
                            </div>
                            <div className="tw-gap-5 tw-flex tw-flex-col">
                                <TextField name="category" label="Skill Category" variant="standard"
                                           value={skill.category}
                                           error={!!errors[index]?.category}
                                           helperText={errors[index]?.category}
                                           onChange={(e) => handleSkillChange(index, e)} fullWidth/>
                                <TextField name="skill" label="Skills List" variant="standard"
                                           value={skill.skill}
                                           onChange={(e) => handleSkillChange(index, e)}
                                           fullWidth
                                           helperText="Please separate the skills with comma 'Photography, Coin collection'"
                                           error={!!errors[index]?.skill}
                                />
                            </div>
                            <div className="tw-mt-5 tw-flex tw-justify-end">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleAddSkill(index)}
                                >
                                    Add
                                </Button>
                            </div>
                        </Card>
                        :
                        <Card key={index} className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-flex tw-justify-between">
                                <h3><b>{skill.category}</b></h3>
                                <div>
                                    <Edit className="pointer" onClick={() => handleEditSkill(index)}/>
                                    <Delete className="pointer" color={'warning'}
                                            onClick={() => handleDeleteSkill(index)}/>
                                </div>
                            </div>
                            <p className="tw-text-[13px] tw-inline"><b>Skills:</b></p>
                            <p className="tw-inline">
                                {skill.skill.split(',').map((skillItem, idx) => (
                                    <Chip className="tw-ml-3" key={idx} label={skillItem.trim()}
                                          variant="outlined"/>))}
                            </p>
                        </Card>
                ))}
                <div className="tw-mt-[20px]">
                    <Button variant="contained" color="secondary" fullWidth onClick={addSkill}>
                        Add Skill
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Skill;