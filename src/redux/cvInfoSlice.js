import {createSlice} from "@reduxjs/toolkit";

export const cvInfoSlice = createSlice({
  name: "cvInfo",
    initialState: {
        cvInfo: [
            {
                id: 1,
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                website: '',
                isNumberNeeded: false,
                number: 0,
                aboutMe: '',
                isInfoEdit: true,
                social: [
                    {
                        platform: '',
                        link: '',
                        isEdit: true,
                    },
                ],
                education: [
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
                    },
                ],
                workExperience: [
                    {
                        company: '',
                        location: '',
                        position: '',
                        startDate: '',
                        endDate: '',
                        isCurrent: false,
                        isEdit: true,
                        description: '',
                    },
                ],
                skills: [
                    {
                        category: '',
                        skill: '',
                        isEdit: true,
                    },
                ],
                languages:[
                    {
                        language: '',
                        proficiency: '',
                        isEdit: true,
                    },
                ],
                achievements: [
                    {
                        title: '',
                        date: '',
                        description: '',
                        isEdit: true,
                    },
                ],
            }
            ],
    },
    reducers: {
        addCvInfo: (state, action) => {
            state.cvInfo.push(action.payload);
        },
        deleteCvInfo: (state, action) => {
            state.cvInfo = state.cvInfo.filter((cvInfo) => cvInfo.id !== action.payload.id);
        },
        updateCvInfo (state, action) {
            const index = state.cvInfo.findIndex((cvInfo) => cvInfo.id === action.payload.id);
            if (index !== -1) {
                state.cvInfo[index] = action.payload;
            }
        }
    }
})

export const {addCvInfo, deleteCvInfo, updateCvInfo} = cvInfoSlice.actions;
export default cvInfoSlice.reducer;



