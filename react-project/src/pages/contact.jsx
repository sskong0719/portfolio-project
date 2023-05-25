import React, { useState } from 'react';
import './styles/contact.css';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        fetch('/submit-contact-form', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server if needed
                console.log(data)
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="body">
            <div className="contact-box">
                <div className="header">
                    Get In Touch
                </div>
                <div className="not-header">
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
                        <form onSubmit={handleSubmit}>
                            <label className="info-title">Name</label>
                            <input
                                className={`info ${name !== '' ? 'typed' : ''}`}
                                type="text"
                                name="name"
                                placeholder="Enter Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label className="info-title">Email</label>
                            <input
                                className={`info ${email !== '' ? 'typed' : ''}`}
                                type="text"
                                name="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <br />

                            <label className="info-title">Message</label>
                            <textarea
                                className={`message ${message !== '' ? 'typed' : ''}`}
                                name="message"
                                placeholder="Enter Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>

                            <button className="submit" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
