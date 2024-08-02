import {Button, Card, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Close, Delete, Edit} from "@mui/icons-material";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {updateCvInfo} from "../../redux/cvInfoSlice.js";
import {useDispatch} from "react-redux";

const Experience = ({formValues , onFormValuesChange}) => {
    const dispatch = useDispatch();
    const toolbarOptions = [['bold', 'italic'], [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }]];
    const quillModules ={
        toolbar: toolbarOptions
    }

    // for Experience
    const handleWorkExperienceChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedExperience = [...formValues.workExperience];
        updatedExperience[index] = {
            ...updatedExperience[index],
            [name]: type === 'checkbox' ? checked : value,
        };
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            workExperience: updatedExperience,
        }));
    };
    const handleWorkExperienceChangeQuill = (index, name, value) => {
        const updatedExperience = [...formValues.workExperience];
        updatedExperience[index] = {
            ...updatedExperience[index],
            [name]: value,
        };
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            workExperience: updatedExperience,
        }));
    };
    const addWorkExperience = () => {
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            workExperience: [
                ...prevValues.workExperience,
                {
                    company: '',
                    location: '',
                    position: '',
                    experience: '',
                    startDate: '',
                    endDate: '',
                    isEdit: true,
                    description: '',
                }
            ]
        }));
    };
    const handleDeleteWorkExperience = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedWorkExperience = [...prevValues.workExperience];
            updatedWorkExperience.splice(index, 1);
            return { ...prevValues, workExperience: updatedWorkExperience };
        });
    };
    const handleAddWorkExperience = (index) => {
        onFormValuesChange((prevValues)=>{
            const updatedWorkExperience = [...prevValues.workExperience];
            updatedWorkExperience[index] = {
                ...updatedWorkExperience[index],
                isEdit: false,
            };
            const updatedValues = {
                ...prevValues,
                workExperience: updatedWorkExperience,
            }
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        })

    }
    const handleEditWorkExperience = (index) => {
        onFormValuesChange((prevValues)=>{
            const updatedWorkExperience = [...prevValues.workExperience];
            updatedWorkExperience[index] = {
                ...updatedWorkExperience[index],
                isEdit: true,
            };
            return {...prevValues, workExperience: updatedWorkExperience};
        })
    }
    return (
        <div>
            <Card variant="outlined" className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3">
                <h1>WORK EXPERIENCE</h1>
                <p>Flaunt that expertise!</p>
                {formValues.workExperience.map((workExperience, index) => (
                    workExperience.isEdit ?
                        <Card key={index} variant="outlined" className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-w-full tw-flex tw-justify-end">
                                <Close className='tw-font-black pointer'
                                       onClick={() => handleDeleteWorkExperience(index)}/>
                            </div>
                            <div className="tw-gap-3 tw-flex tw-justify-between">
                                <TextField name="company" label="Company Name" variant="standard"
                                           value={workExperience.company}
                                           onChange={(e) => handleWorkExperienceChange(index, e)} fullWidth/>
                                <TextField name="location" label="Location" variant="standard"
                                           value={workExperience.location}
                                           onChange={(e) => handleWorkExperienceChange(index, e)}
                                           fullWidth/>

                            </div>
                            <div className="tw-gap-3  tw-flex tw-justify-between tw-mt-[20px]">
                                <TextField name="position" label="Position" variant="standard"
                                           value={workExperience.position}
                                           onChange={(e) => handleWorkExperienceChange(index, e)} fullWidth/>
                            </div>
                            <div className="tw-mt-[20px]">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="isCurrent"
                                            checked={workExperience.isCurrent}
                                            onChange={(e) => handleWorkExperienceChange(index, e)}
                                            color="primary"
                                        />
                                    }
                                    label="I currently work here"
                                />
                            </div>
                            <div className="tw-gap-3  tw-flex tw-justify-between tw-mt-[20px]">
                                <TextField name="startDate" label="Start Date" type="date" variant="standard"
                                           InputLabelProps={{shrink: true}}
                                           value={workExperience.startDate}
                                           onChange={(e) => handleWorkExperienceChange(index, e)} fullWidth/>
                                <TextField name="endDate" label="End Date" type="date" variant="standard"
                                           disabled={workExperience.isCurrent}
                                           InputLabelProps={{shrink: true}}
                                           value={workExperience.endDate}
                                           onChange={(e) => handleWorkExperienceChange(index, e)} fullWidth/>
                            </div>

                            <div className="tw-gap-3 tw-flex tw-justify-between tw-mt-[20px] ">
                                <div style={{height: '100px', width: '100%'}}>

                                    {/*<TextField*/}
                                    {/*    name="description"*/}
                                    {/*    label="Relevant Description"*/}
                                    {/*    multiline*/}
                                    {/*    rows={3}*/}
                                    {/*    variant="standard"*/}
                                    {/*    value={workExperience.description}*/}
                                    {/*    fullWidth*/}
                                    {/*    onChange={(e) => handleWorkExperienceChange(index, e)}*/}
                                    {/*/>*/}

                                    <ReactQuill className="tw-w-full" modules={quillModules} theme='snow'
                                                value={workExperience.description}
                                                onChange={(value) => handleWorkExperienceChangeQuill(index, 'description', value)}/>
                                </div>
                            </div>
                            <div className=" tw-flex tw-justify-end">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleAddWorkExperience(index)}
                                >
                                    Add
                                </Button>
                            </div>
                        </Card>
                        :
                        <Card key={index} className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-flex tw-justify-between">
                                <h3 className="tw-font-[500]">{workExperience.position}</h3>
                                <div>
                                    <Edit className="pointer" onClick={() => handleEditWorkExperience(index)}/>
                                    <Delete className="pointer" color={'warning'}
                                            onClick={() => handleDeleteWorkExperience(index)}/>
                                </div>
                            </div>
                            <p>{workExperience.company}, {workExperience.location}</p>
                            {
                                workExperience.isCurrent ? <p>{workExperience.startDate} - Present</p> :
                                    <p> {workExperience.startDate} - {workExperience.endDate}</p>
                            }
                            <p className="tw-font-[500]">Description: </p>
                            <div dangerouslySetInnerHTML={{__html: workExperience.description}}/>
                        </Card>
                ))}
                <div className="tw-mt-[20px]">
                    <Button variant="contained" color="secondary" fullWidth onClick={addWorkExperience}>
                        Add Work Experience
                    </Button>
                </div>
            </Card>
        </div>

    );
}

export default Experience;