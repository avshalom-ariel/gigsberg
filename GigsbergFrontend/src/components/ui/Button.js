// Button.js
import React from 'react';
import PropTypes from 'prop-types'; // Optional, for type checking

// Define the Button component
const Button = ({ onClick, label, styleType, disabled }) => {
    // Define the button styles based on styleType prop
    const buttonStyles = {
        primary: { backgroundColor: '#007bff', color: '#fff' },
        secondary: { backgroundColor: '#6c757d', color: '#fff' },
        danger: { backgroundColor: '#dc3545', color: '#fff' },
        // Add more styles as needed
    };

    // Set a default style if no styleType is provided
    const buttonStyle = buttonStyles[styleType] || buttonStyles.primary;

    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            disabled={disabled} // Disable button if prop is true
            className="button" // Optional: Add your CSS class if you have external styles
        >
            {label} {/* The text on the button */}
        </button>
    );
};

// Optional: Set default props for the component
Button.defaultProps = {
    label: 'Click Me',
    styleType: 'primary',
    disabled: false,
};

// Optional: Prop types for validation (if you want to ensure the correct types)
Button.propTypes = {
    onClick: PropTypes.func.isRequired, // onClick should be a function
    label: PropTypes.string,
    styleType: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    disabled: PropTypes.bool,
};

export default Button;
