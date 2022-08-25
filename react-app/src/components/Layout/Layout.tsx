import { useContext } from 'react';
import { useSelector } from 'react-redux';


import { RootState } from '../../redux/store';
import Footer from './Footer/Footer';
import Header from './Header/Header';

type LayoutProps = {
    children: JSX.Element
}


const Layout = (props: LayoutProps) => {
    return (
        <>
            <div>
                <Header />
            </div>
            <main>{props.children}</main>
           <Footer />
        </>
    )
}

export default Layout;