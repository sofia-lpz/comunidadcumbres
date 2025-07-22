import React from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    options?: Option[];
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    name?: string;
}

export default function Select({ 
    label, 
    options = [], 
    value, 
    onChange, 
    error,
    placeholder = "Seleccionar opción",
    required = false,
    className = "",
    ...props 
}: SelectProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CDA52A] focus:border-[#CDA52A] transition-colors text-gray-900 bg-white ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
