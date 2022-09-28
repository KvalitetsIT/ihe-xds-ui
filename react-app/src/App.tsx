
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/Home';
import Layout from './components/Layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { StrictMode, useEffect, useMemo, useState } from 'react';
import Loading from './components/loading';
import UploadCertificateForm from './feature/CredentialAPI/UploadForm/UploadCertificateForm';
import {  handleSession, getSession } from './components/Utility/sessionHandling';
import About from './pages/About/About';

function App() {
    const [session, setSession] = useState("");
    useEffect( () => {

        if (window.sessionStorage.getItem("session") == null){
            handleSession()
            setSession(getSession())
        } 
       
        
    }, [])


    return (
        <Router>
                    <Layout>
                        <>
                            <Routes>
                                <Route path="/" element={<HomePage session={session}/>} />
                                <Route path="*" element={<HomePage session={session}/>} />
                                <Route path="/upload-certifacte" element={<UploadCertificateForm />} />
                                <Route path="/about" element={<About />} />

                            </Routes>

                            <ToastContainer closeButton={true} position="bottom-right" />
                        </>
                    </Layout>
          
          
        </Router >
    )
}

const AppWrapper = () => {
    return (
       
                <StrictMode>
                    <App />
                </StrictMode>
          
       
    )
}


export default AppWrapper;
