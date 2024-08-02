import {Button, Card, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {updateCvInfo} from "../../redux/cvInfoSlice.js";
import {useDispatch} from "react-redux";

const Intro = ({formValues , onFormValuesChange}) => {

    const dispatch = useDispatch();


    // for Introduction
    const handleInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        onFormValuesChange((prevValues) => {
            return {
                ...prevValues,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
    };
    const handleEditInfo = () => {
        onFormValuesChange((prevValues) => {
            const updatedValues = {
                ...prevValues, isInfoEdit: true
            }
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        });
    }
    const handleSaveInfo = () => {
        onFormValuesChange((prevValues) => {
            const updatedValues = {
                ...prevValues, isInfoEdit: false
            }
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        });
    }

    return (
        <div>
            <Card variant="outlined" className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3">
                <h1>INTRODUCTION</h1>
                <p>All that makes you, you!</p>
                {formValues.isInfoEdit ?
                    <Card variant="outlined" className="tw-w-[100%] tw-p-5 sm:tw-w-[80%]">
                        <div className="tw-gap-3 tw-flex tw-justify-between">
                            <TextField name="firstName" label="First Name" variant="standard"
                                       value={formValues.firstName}
                                       onChange={handleInfoChange} fullWidth/>
                            <TextField name="middleName" label="Middle Name" variant="standard"
                                       value={formValues.middleName} onChange={handleInfoChange} fullWidth/>
                            <TextField name="lastName" label="Last Name" variant="standard"
                                       value={formValues.lastName}
                                       onChange={handleInfoChange} fullWidth/>
                        </div>
                        <div className="tw-gap-3  tw-flex tw-justify-between tw-mt-[20px]">
                            <TextField name="email" label="Email" variant="standard" value={formValues.email}
                                       onChange={handleInfoChange} fullWidth/>
                            <TextField name="website" label="Website" variant="standard"
                                       value={formValues.website}
                                       onChange={handleInfoChange} fullWidth/>
                        </div>
                        <div className="tw-gap-3 tw-flex tw-justify-between tw-mt-[20px]">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isNumberNeeded"
                                        checked={formValues.isNumberNeeded}
                                        onChange={handleInfoChange}
                                        color="primary"
                                    />
                                }
                                label="Do you want to add number?"
                            />
                        </div>
                        <div>
                            {formValues.isNumberNeeded ?
                                <TextField name="number" label="Number" type="number" variant="standard"
                                           value={formValues.number}
                                           onChange={handleInfoChange} fullWidth/> : null}
                        </div>
                        <div className="tw-gap-3 tw-flex tw-justify-between tw-mt-[20px]">
                            <TextField
                                name="aboutMe"
                                InputLabelProps={{shrink: true}}
                                label="About Me"
                                multiline
                                rows={3}
                                variant="standard"
                                value={formValues.aboutMe}
                                fullWidth
                                onChange={handleInfoChange}
                            />
                        </div>
                    </Card>

                    :
                    <Card className=" tw-m-1 tw-w-[100%] tw-p-5 sm:tw-w-[80%]">
                        <div className="tw-flex tw-justify-between">
                            <h3><b>Name:</b></h3>
                            <div>
                                <Edit className="pointer" onClick={handleEditInfo}/>
                                <Delete className="pointer" color={'warning'} onClick={handleSaveInfo}/>
                            </div>
                        </div>
                        <p>{formValues.firstName} {formValues.middleName} {formValues.lastName}</p>
                        <h3><b>Email:</b></h3>
                        <p>{formValues.email}</p>
                        <h3><b>website:</b></h3>
                        <p><a href={formValues.website}> {formValues.website} </a></p>
                        {formValues.isNumberNeeded ? <h3><b> Number: </b></h3> : null}
                        {formValues.isNumberNeeded ? <p>{formValues.number}</p> : null}
                        <h3><b>About Me:</b></h3>
                        <p>{formValues.aboutMe}</p>
                    </Card>
                }
                <div className="tw-mt-[20px]">
                    <Button variant="contained" color="secondary" fullWidth onClick={handleSaveInfo}>
                        Save
                    </Button>
                </div>
            </Card>
        </div>

    );
}

export default Intro;