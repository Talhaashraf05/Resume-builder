import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/mainLayout.jsx";
import HomePage from "./pages/homePage.jsx";
import {useContext, useEffect} from "react";
import {ThemeContext} from "../themeContext.jsx";
import CvPage from "./pages/cvPage.jsx";


function App() {
    const { mode } = useContext(ThemeContext);

    useEffect(() => {
        document.body.style.backgroundColor = mode === 'light' ? '#ffffff' : '#000000';
    }, [mode]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />} >
                {/*For home page*/}
                <Route index   element={<HomePage />}  />
                {/*For nav page*/}
                <Route path='/cv' element={<CvPage />}  />
            </Route>
        )
    )

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )

}

export default App
