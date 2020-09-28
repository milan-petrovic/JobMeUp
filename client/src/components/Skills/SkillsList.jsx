import React from 'react';

export const SkillsList = ({ skills }) => {
    return (
        <div className="skills-container">
            {skills.map((skill, index) => {
                return <SkillItem name={skill.name} key={index} />;
            })}
        </div>
    );
};

const SkillItem = ({ name }) => {
    return <li className="skill-item">{name}</li>;
};
