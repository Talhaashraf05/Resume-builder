import {useDispatch} from "react-redux";
import {Button, Card, Chip, MenuItem, Select, TextField} from "@mui/material";
import {Close, Delete, Edit} from "@mui/icons-material";
import {updateCvInfo} from "../../redux/cvInfoSlice.js";

const Language = ({formValues , onFormValuesChange}) => {
    const dispatch = useDispatch();

    const handleLanguageChange = (index, e) => {
        console.log(e.target);
        const { name, value, type, checked } = e.target;
        const updatedLanguages = [...formValues.languages];
        updatedLanguages[index] = {
            ...updatedLanguages[index],
            [name]: type === 'checkbox' ? checked : value,
        };
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            languages: updatedLanguages,
        }));
    }

    const addLanguage = () => {
        onFormValuesChange((prevValues) => ({
            ...prevValues,
            languages: [
                ...prevValues.languages,
                {
                    language: '',
                    proficiency: '',
                    isEdit: true,
                }
            ]
        }));
    }

    const handleDeleteLanguage = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedLanguages = [...prevValues.languages];
            updatedLanguages.splice(index, 1);
            return { ...prevValues, languages: updatedLanguages };
        });
    }

    const handleAddLanguage = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedLanguages = [...prevValues.languages];
            updatedLanguages[index] = {
                ...updatedLanguages[index],
                isEdit: false,
            };
            const updatedValues = {
                ...prevValues,
                languages: updatedLanguages,
            }
            dispatch(updateCvInfo(updatedValues));
            return updatedValues;
        })
    }

    const handleEditLanguage = (index) => {
        onFormValuesChange((prevValues) => {
            const updatedLanguages = [...prevValues.languages];
            updatedLanguages[index] = {
                ...updatedLanguages[index],
                isEdit: true,
            };
            return { ...prevValues, languages: updatedLanguages };
        });
    }

    return (
        <div>
            <Card variant="outlined" className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3">
                <h1>Languages</h1>
                <p>Showcase your linguistic abilities!</p>
                {formValues.languages.map((language, index) => (
                    language.isEdit ?
                        <Card key={index} variant="outlined" className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-w-full tw-flex tw-justify-end">
                                <Close className='tw-font-black pointer'
                                       onClick={() => handleDeleteLanguage(index)}/>
                            </div>
                            <div className="tw-gap-5 tw-flex tw-flex-row">
                                <TextField name="language" label="Languages" variant="standard"
                                           value={language.language}
                                           onChange={(e) => handleLanguageChange(index, e)} fullWidth/>
                                {/*<TextField  label="Proficiency" variant="standard"*/}
                                {/*           value={language.proficiency}*/}
                                {/*           onChange={(e) => handleLanguageChange(index, e)}*/}
                                {/*           fullWidth*/}
                                {/*/>*/}
                                <Select
                                    name="proficiency"
                                    labelId="demo-simple-select-label"
                                    variant="standard"
                                    InputLabelProps={{shrink: true}}
                                    fullWidth
                                    id="proficiency"
                                    value={language.proficiency}
                                    label="Proficiency"
                                    onChange={(e) => handleLanguageChange(index, e)}
                                >
                                    <MenuItem value={'Beginner'}>Beginner</MenuItem>
                                    <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                                    <MenuItem value={'Advanced'}>Advanced</MenuItem>
                                    <MenuItem value={'Native'}>Native</MenuItem>
                                </Select>
                            </div>
                            <div className="tw-mt-5 tw-flex tw-justify-end">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleAddLanguage(index)}
                                >
                                    Add
                                </Button>
                            </div>
                        </Card>
                        :
                        <Card key={index} className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] ">
                            <div className="tw-flex tw-justify-between">
                                <h3 className="tw-font-[600]">{language.language}</h3>
                                <div>
                                    <Edit className="pointer" onClick={() => handleEditLanguage(index)}/>
                                    <Delete className="pointer" color={'warning'}
                                            onClick={() => handleDeleteLanguage(index)}/>
                                </div>
                            </div>
                            <p className="tw-text-[13px] tw-inline">{language.proficiency}</p>
                        </Card>
                ))}
                <div className="tw-mt-[20px]">
                    <Button variant="contained" color="secondary" fullWidth onClick={addLanguage}>
                        Add Language
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Language;