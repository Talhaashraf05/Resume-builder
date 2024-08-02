import {createSlice} from "@reduxjs/toolkit";

export const cvInfoSlice = createSlice({
  name: "cvInfo",
    initialState: {
        cvInfo: [
            {
                id: 1,
                firstName: 'Talha',
                middleName: 'Bin',
                lastName: 'Ashraf',
                email: 'talhaashraf@gmail.com',
                website: 'www.talhasite.com',
                isNumberNeeded: true,
                number: 1234567890,
                aboutMe: 'Experienced Full-Stack developer with a strong foundation in front-end technologies, specializing in Vue.js and JavaScript frame- works, adept at creating immersive, responsive user interfaces. Skilled in Nest.js for backend development, proficient with SQL and NoSQL databases, integrating frontend finesse with robust functionality. Passionate about innovation and user-centric design, committed to delivering impactful digital experiences that merge technical excellence with user satisfaction.',
                isInfoEdit: true,
                social: [
                    {
                        platform: 'MEDIUM',
                        link: 'https://www.linkedin.com/in/johndoe',
                        isEdit: false,
                    },
                    {
                        platform: 'GitHub',
                        link: 'https://github.com/johndoe',
                        isEdit: false,
                    }
                ],
                education: [
                    {
                        school: 'Stanford University',
                        major: 'Computer Science',
                        degreeType: 'BSc',
                        startDate: '2015-09-01',
                        endDate: '2019-06-15',
                        isEdit: false,
                        isCurrent: false,
                        gpa: '3.4/4.0',
                        location : 'Stanford, CA',
                    },
                    {
                        school: 'Stanford University',
                        major: 'Computer Science',
                        degreeType: 'MSc',
                        startDate: '2019-09-01',
                        endDate: '2021-06-15',
                        isEdit: false,
                        isCurrent: false,
                        gpa: '3.1/4.0',
                        location : 'Stanford, CA',
                    }
                ],
                workExperience: [
                    {
                        company: 'Google',
                        location: 'Mountain View, CA',
                        position: 'Software Engineer',
                        startDate: '2019-07-01',
                        endDate: '2023-08-01',
                        isCurrent: true,
                        isEdit: false,
                        description: 'Worked on various projects including Google Search and Google Maps.',
                    },
                    {
                        company: 'Facebook',
                        location: 'Menlo Park, CA',
                        position: 'Frontend Developer',
                        startDate: '2017-06-01',
                        endDate: '2019-06-30',
                        isCurrent: false,
                        isEdit: false,
                        description: 'Worked on the News Feed team, improving performance and user experience.',
                    },
                    {
                        company: 'Amazon',
                        location: 'Seattle, WA',
                        position: 'Backend Developer',
                        startDate: '2015-08-01',
                        endDate: '2017-05-31',
                        isCurrent: false,
                        isEdit: false,
                        description: 'Contributed to the development of scalable cloud solutions and APIs.',
                    }
                ],
                skills: [
                    {
                        category: 'Programming Languages',
                        skill: 'JavaScript, Python, Java, C++',
                        isEdit: false,
                    },
                    {
                        category: 'Tools & Platforms',
                        skill: 'Git, GitHub, Jira, Confluence',
                        isEdit: false,
                    }
                ],
                languages:[
                    {
                        language: 'English',
                        proficiency: 'Native'
                    },
                    {
                        language:  'Spanish',
                        proficiency: 'Native'
                    },
                    {
                        language: 'French',
                        proficiency: 'Intermediate'
                    }
                ],
                achievements: [
                    {
                        title: 'Web Developer of the Year',
                        date: '2020-12-01',
                        description: 'Awarded for outstanding contributions to web development.',
                        isEdit: false,
                    },
                    {
                        title: 'Hackathon Winner',
                        date: '2019-08-15',
                        description: 'First place in the annual coding competition.',
                        isEdit: false,
                    }
                ],
            }
            ],
    },
    reducers: {
        addCvInfo: (state, action) => {
            state.cvInfo.push(action.payload);
        },
        deleteCvInfo: (state, action) => {
            console.log(action.payload);
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



