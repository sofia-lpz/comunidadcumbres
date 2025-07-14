export default function Input({ 
    label, 
    type = "text", 
    placeholder, 
    value, 
    onChange, 
    error,
    required = false,
    className = "",
    ...props 
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[#222222] mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CDA52A] focus:border-[#CDA52A] transition-colors ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}