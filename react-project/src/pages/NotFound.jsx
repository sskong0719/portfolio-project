import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/NotFound.css';

class NotFound extends Component {
    render() {
        return (
            <>
                <div className='NotFound'>
                    404 Not Found
                    <Link to="/" className="link">Return Home</Link>
                </div>
            </>
        );
    }
}

export default NotFound;