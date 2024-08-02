import {Button, Card, Chip, TextField} from "@mui/material";
import {Close, Delete, Edit} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {updateCvInfo} from "../../redux/cvInfoSlice.js";

const Skill = ({formValues , onFormValuesChange}) =>{
    const dispatch = useDispatch();
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
    }
    const handleDeleteSkill = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedSkills = [...prevValues.skills];
            updatedSkills.splice(index, 1);
            return { ...prevValues, skills: updatedSkills };
        });
    }
    const handleAddSkill = (index) => {
        onFormValuesChange((prevValues)=>{
            const updatedSkills = [...prevValues.skills];
            updatedSkills[index] = {
                ...updatedSkills[index],
                isEdit: false,
            };
            const updatedValues={
                ...prevValues,
                skills: updatedSkills,
            }
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        })
    }
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
    return (
        <div>
            <Card variant="outlined" className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3">
                <h1>Skills</h1>
                <p>Flex your skills!</p>
                {formValues.skills.map((skill, index) => (
                    skill.isEdit ?
                        <Card key={index} variant="outlined" className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-w-full tw-flex tw-justify-end">
                                <Close className='tw-font-black pointer'
                                       onClick={() => handleDeleteSkill(index)}/>
                            </div>
                            <div className="tw-gap-5 tw-flex tw-flex-col">
                                <TextField name="category" label="Skill Category" variant="standard"
                                           value={skill.category}
                                           onChange={(e) => handleSkillChange(index, e)} fullWidth/>
                                <TextField name="skill" label="Skills List" variant="standard"
                                           value={skill.skill}
                                           onChange={(e) => handleSkillChange(index, e)}
                                           fullWidth
                                           helperText="Please seprate the skills with comma 'Photography, Coin collection' "
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