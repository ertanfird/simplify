import React from 'react';

export default function Switch({ type, onChange, checked, children }) {
    return (
        <div className='switch__wrapper'>
            <input
                type="checkbox"
                className='switch'
                name="switch"
                onChange={onChange}
                checked={checked}
            />
            <label
                htmlFor="switch"
                className={`switch__label switch__label-${type}`} 
            >
                {children && <span>{children}</span>}
            </label>
        </div>
    )
};
