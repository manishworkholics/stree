import React, { useState } from 'react'

const AutoCompleteInput = ({ label, value, onChange, suggestionList, onSelect, placeholder }) => {
    const [showSuggestions, setShowSuggestions] = useState([]);

    const handleFocus = () => {
        setShowSuggestions(suggestionList); // show all suggestions on focus
    };

    const handleBlur = () => {
        setTimeout(() => setShowSuggestions([]), 100); // hide after click
    };

    return (
        <div style={{ position: "relative" }}>
            <label className='mb-1'>{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value); // update parent state
                    if (e.target.value) {
                        const filtered = suggestionList.filter((item) =>
                            item.toLowerCase().includes(e.target.value.toLowerCase())
                        );
                        setShowSuggestions(filtered);
                    } else {
                        setShowSuggestions(suggestionList);
                    }
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
            />
            {showSuggestions.length > 0 && (
                <ul style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #ccc",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    maxHeight: "150px",
                    overflowY: "auto",
                    zIndex: 1000
                }}>
                    {showSuggestions.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                onSelect(item);
                                setShowSuggestions([]);
                            }}
                            style={{ padding: "8px", cursor: "pointer" }}
                            onMouseDown={(e) => e.preventDefault()} // prevent blur
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};



export default AutoCompleteInput;