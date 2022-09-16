
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
import About from './pages/Home/About';
import { isDayLater, setSession } from './components/Utility/sessionHandling';

function App() {
    useEffect( () => {
        if (window.localStorage.getItem("session") == null){
            setSession()
        } 
        else {
            if (isDayLater() ) {
                setSession()
            }
        }
        
        
    }, [])


    return (
        <Router>
                    <Layout>
                        <>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="*" element={<HomePage />} />
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
