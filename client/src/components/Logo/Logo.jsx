import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = (props) => (
    <Link to="/" className="logo" style={{ fontSize: props.fontSize }}>
        <div>
            <span className="logo__jobme">JobMe</span>
            <span className="logo__up">Up</span>
        </div>
    </Link>
);
