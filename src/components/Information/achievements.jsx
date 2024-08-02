import {useDispatch} from "react-redux";
import {Button, Card, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Close, Delete, Edit} from "@mui/icons-material";
import ReactQuill from "react-quill";
import {updateCvInfo} from "../../redux/cvInfoSlice.js";

const Achievements = ({formValues , onFormValuesChange}) => {
    const dispatch = useDispatch();
    const toolbarOptions = [['bold', 'italic'], [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }]];
    const quillModules ={
        toolbar: toolbarOptions
    }

    const handleAchievementChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedAchievements = [...formValues.achievements];
        updatedAchievements[index] = {
            ...updatedAchievements[index],
            [name]: type === 'checkbox' ? checked : value,
        };
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            achievements: updatedAchievements,
        }));
    }
    const handleAchievementChangeQuill = (index, name, value) => {
        const updatedAchievements = [...formValues.achievements];
        updatedAchievements[index] = {
            ...updatedAchievements[index],
            [name]: value,
        };
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            achievements: updatedAchievements,
        }));
    }
    const addAchievement = () => {
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            achievements: [
                ...prevValues.achievements,
                {
                    title: '',
                    description: '',
                    isEdit: true,
                }
            ]
        }));
    }

    const handleDeleteAchievement = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedAchievements = [...prevValues.achievements];
            updatedAchievements.splice(index, 1);
            return { ...prevValues, achievements: updatedAchievements };
        });
    }

    const handleAddAchievement = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedAchievements = [...prevValues.achievements];
            updatedAchievements[index] = {
                ...updatedAchievements[index],
                isEdit: false,
            };
            const updatedValues = {
                ...prevValues,
                achievements: updatedAchievements,
            }
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        })
    }

    const handleEditAchievement = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedAchievements = [...prevValues.achievements];
            updatedAchievements[index] = {
                ...updatedAchievements[index],
                isEdit: true,
            };
            return { ...prevValues, achievements: updatedAchievements };
        });
    }

    return (
        <div>
            <Card variant="outlined" className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3">
                <h1>Achievement</h1>
                <p>Showcase your triumphs!</p>
                {formValues.achievements.map((achievement, index) => (
                    achievement.isEdit ?
                        <Card key={index} variant="outlined" className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-w-full tw-flex tw-justify-end">
                                <Close className='tw-font-black pointer'
                                       onClick={() => handleDeleteAchievement(index)}/>
                            </div>
                            <div className="tw-gap-3 tw-flex tw-justify-between">
                                <TextField name="title" label="Title" variant="standard"
                                           value={achievement.title}
                                           onChange={(e) => handleAchievementChange(index, e)} fullWidth/>
                                <TextField name="date" label="Location" variant="standard"
                                           value={achievement.date}
                                           type={'date'}
                                           InputLabelProps={{shrink: true}}
                                           onChange={(e) => handleAchievementChange(index, e)}
                                           fullWidth/>

                            </div>

                            <div className="tw-gap-3 tw-flex tw-justify-between tw-mt-[20px] ">
                                <div style={{height: '100px', width: '100%'}}>
                                    <ReactQuill className="tw-w-full" modules={quillModules} theme='snow'
                                                value={achievement.description}
                                                onChange={(value) => handleAchievementChangeQuill(index, 'description', value)}/>
                                </div>
                            </div>
                            <div className=" tw-flex tw-justify-end">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleAddAchievement(index)}
                                >
                                    Add
                                </Button>
                            </div>
                        </Card>
                        :
                        <Card key={index} className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-flex tw-justify-between">
                                <h3 className="tw-font-[500]">{achievement.title}</h3>
                                <div>
                                    <Edit className="pointer" onClick={() => handleEditAchievement(index)}/>
                                    <Delete className="pointer" color={'warning'}
                                            onClick={() => handleDeleteAchievement(index)}/>
                                </div>
                            </div>
                            <p>{achievement.date}</p>
                            <p className="tw-font-[500]">Description: </p>
                            <div dangerouslySetInnerHTML={{__html: achievement.description}}/>
                        </Card>
                ))}
                <div className="tw-mt-[20px]">
                    <Button variant="contained" color="secondary" fullWidth onClick={addAchievement}>
                        Add Work Experience
                    </Button>
                </div>
            </Card>
        </div>

    );
}
export default Achievements;