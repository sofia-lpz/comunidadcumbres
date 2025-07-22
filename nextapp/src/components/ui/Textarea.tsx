import React from 'react';

interface TextareaProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    rows?: number;
    required?: boolean;
    className?: string;
    name?: string;
}

export default function Textarea({ 
    label, 
    placeholder, 
    value, 
    onChange, 
    error,
    rows = 4,
    required = false,
    className = "",
    ...props 
}: TextareaProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CDA52A] focus:border-[#CDA52A] transition-colors text-gray-900 placeholder-gray-400 bg-white resize-vertical ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
