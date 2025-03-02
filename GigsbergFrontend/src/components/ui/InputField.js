import React from "react";


export const InputField = ({ type = 'text', placeholder, value, onChange, label, error }) => (
    <div>
        {label && <label>{label}</label>}
        <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);