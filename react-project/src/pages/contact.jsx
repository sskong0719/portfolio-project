import React, { useState, useEffect } from 'react';
import './styles/contact.css';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [nameTyped, setNameTyped] = useState(false);
    const [emailTyped, setEmailTyped] = useState(false);
    const [messageTyped, setMessageTyped] = useState(false);
    useEffect(() => {
        document.body.classList.remove('popup-open');
    }, []);
    //TODO: ADD HEADER
    return (
        <div className="body">
            <div className="contact-box">

                <div className="header"><h1>Get In Touch</h1>
                </div>

                <div className="description">
                    Feel free to contact me with any job opportunities!
                    <br />
                    <br />
                    Fill out the form or email me, and I'll respond promptly within 24-48 hours.
                    <br />
                    <br />
                    Looking forward to connecting with you!
                </div>
                <div className="form">
                    <form action="/submit-contact" method="post" encType="multipart/form-data">
                        <label className="info-title">
                            Name
                        </label>
                        <input
                            className={`info ${nameTyped ? 'typed' : ''}`}
                            type="text"
                            name="name"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameTyped(e.target.value !== '');
                            }}
                        />
                        <label className="info-title">
                            Email
                        </label>
                        <input
                            className={`info ${emailTyped ? 'typed' : ''}`}
                            type="text"
                            name="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailTyped(e.target.value !== '');
                            }}
                        />
                        <br />
                        <label className="info-title">
                            Message
                        </label>
                        <textarea
                            className={`message ${messageTyped ? 'typed' : ''}`}
                            name="message"
                            placeholder="Enter Your Message"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                setMessageTyped(e.target.value !== '');
                            }}
                        ></textarea>
                        <button className="submit" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
