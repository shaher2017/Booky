import React from 'react';
import './footer.css'; 
import logo from "../navbar/booky.png";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab);

const Footer = () => {
    return (
        <footer className="footer" style={{backgroundColor:"rgb(52, 67, 92)",fontFamily: 'Roboto, sans-serif'}}>
        <div className="footer-content">
            <div className="footer-logo">
                <img src={logo} alt="Your Logo" />
                <h1 style={{fontFamily: 'Garamond',}}>Shaher Booky</h1>
            </div>
            <div className="footer-social">
                <a href="https://github.com/shaher2017?tab=repositories"><FontAwesomeIcon icon={['fab', 'github']} /></a>
                <a href="https://linkedin.com/in/shaher-emad-211852223"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a>
                <p>&copy; 2023 Shaher Fund</p>
            <p>Selling Books, Spreading Knowledge</p>
            </div>
            <div className="footer-links">
                <a href="/">Home</a>
                <a href="/aboutus">About</a>
                <a href="/">Books</a>
            </div>
        </div>
    </footer>
    );
}

export default Footer;
