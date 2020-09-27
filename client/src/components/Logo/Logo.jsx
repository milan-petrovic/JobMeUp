import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => (
    <Link to="/" className="logo">
        <div>
            <span className="logo__jobme">JobMe</span>
            <span className="logo__up">Up</span>
        </div>
    </Link>
);