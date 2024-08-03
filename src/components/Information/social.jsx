import {Button, Card, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Close, Delete, Edit} from "@mui/icons-material";
import {SocialLinksEnum} from "../../global/enums/social.links.ts";
import {updateCvInfo} from "../../redux/cvInfoSlice.js";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {validateSocialField} from "../../composables/constants/rules.js";

const Social = ({formValues , onFormValuesChange}) => {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});


   const validateAllSocialLinks = () => {
        const newErrors = {};
        formValues.social.forEach((social, index) => {
            Object.keys(social).forEach((key) => {
                if (key !== 'isEdit') {
                    const error = validateSocialField(key, social[key]);
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

    // for Social
    const handleSocialChange = (index, e) => {
        const {name, value, type, checked} = e.target;
        const updatedSocial = [...formValues.social];
        updatedSocial[index] = {
            ...updatedSocial[index],
            [name]: type === 'checkbox' ? checked : value,
        };
        onFormValuesChange((prevValues) =>( {
            ...prevValues,
            social: updatedSocial,
        }));
    }
    const addSocial = () => {
       if ( validateAllSocialLinks()) {
           onFormValuesChange((prevValues) => ({
               ...prevValues,
               social: [
                   ...prevValues.social,
                   {
                       platform: '',
                       link: '',
                       isEdit: true,
                   }
               ]
           }));
           setErrors((prevErrors) => {
               const newErrors = {...prevErrors};
               const newIndex = formValues.social.length; // index of the newly added social link
               delete newErrors[newIndex];
               return newErrors;
           });
       }
    }
    const handleDeleteSocial = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedSocial = [...prevValues.social];
            updatedSocial.splice(index, 1);
            const updatedValues = {
                ...prevValues,
                social: updatedSocial,
            }
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        });
    }

    const handleAddSocial = (index) => {
        const newErrors = {};
        const social = formValues.social[index];
        Object.keys(social).forEach((key) => {
            if (key !== 'isEdit') {
                const error = validateSocialField(key, social[key]);
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
                const updatedSocial = [...prevValues.social];
                updatedSocial[index] = {
                    ...updatedSocial[index],
                    isEdit: false,
                };
                const updatedValues = {
                    ...prevValues,
                    social: updatedSocial,
                };
                dispatch(updateCvInfo(updatedValues));
                return updatedValues;
            });
        }
    };

    const handleEditSocial = (index) => {
        onFormValuesChange((prevValues)=>{
            const updatedSocial = [...prevValues.social];
            updatedSocial[index] = {
                ...updatedSocial[index],
                isEdit: true,
            };
            return {...prevValues, social: updatedSocial};
        })
    }

    const handleSocialClick = (index, social) => {
        if (social.isEdit && validateAllSocialLinks()) {
            handleAddSocial(index);
        } else {
            handleDeleteSocial(index);
        }
    };


    return (
        <div>
            <Card variant="outlined" className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3">
                <h3 className="tw-font-[600] tw-mb-3">STEP - 2</h3>
                <h1>SOCIAL</h1>
                <p>Give online connectivity a chance!</p>
                {formValues.social.map((social, index) => (
                    social.isEdit ?
                        <Card key={index} variant="outlined" className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-w-full tw-flex tw-justify-end">
                                <Close className='tw-font-black pointer'
                                       onClick={() => handleSocialClick(index, social)}/>
                            </div>
                            <div className="tw-gap-3 tw-flex tw-justify-between">
                                <FormControl className="tw-w-1/3">
                                    <InputLabel id="platform-id">Platform</InputLabel>
                                    <Select
                                        name="platform"
                                        lableId="platform-id"
                                        variant="standard"
                                        onChange={(e) => handleSocialChange(index, e)}
                                        value={social.platform}
                                        error={!!errors[index]?.platform}
                                    >
                                        {
                                            Object.values(SocialLinksEnum).map((link, index) => (
                                                <MenuItem key={index} value={link}>
                                                    {link.charAt(0).toUpperCase() + link.slice(1)}
                                                </MenuItem>))
                                        }
                                    </Select>
                                </FormControl>

                                <TextField name="link" label="Link" variant="standard"
                                           value={social.link}
                                           onChange={(e) => handleSocialChange(index, e)}
                                           fullWidth
                                           error={!!errors[index]?.link}
                                           helperText={errors[index]?.link}
                                />

                            </div>

                            <div className="tw-mt-5 tw-flex tw-justify-end">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleAddSocial(index)}
                                >
                                    Add
                                </Button>
                            </div>
                        </Card>
                        :
                        <Card key={index} className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%]">
                            <div className="tw-flex tw-justify-between">
                                <h1>{social.platform.toUpperCase()}</h1>
                                <div>
                                    <Edit className="pointer" onClick={() => handleEditSocial(index)}/>
                                    <Delete className="pointer" color={'warning'}
                                            onClick={() => handleDeleteSocial(index)}/>
                                </div>
                            </div>
                            <p><a href={social.link} target="_blank">{social.link}</a></p>
                        </Card>
                ))}
                <div className="tw-mt-[20px]">
                    <Button variant="contained" color="secondary" fullWidth onClick={addSocial}>
                        Add Social
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Social;