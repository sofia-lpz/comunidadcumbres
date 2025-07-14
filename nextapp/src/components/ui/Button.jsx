export default function Button({ 
    children, 
    variant = "primary", 
    size = "md", 
    onClick, 
    disabled = false,
    className = "",
    ...props 
}) {
    const baseStyles = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
        primary: "bg-[#CDA52A] hover:bg-[#B3A369] text-white focus:ring-[#CDA52A]",
        secondary: "bg-[#5D84C4] hover:bg-[#4A6BA3] text-white focus:ring-[#5D84C4]",
        outline: "border-2 border-[#CDA52A] text-[#CDA52A] hover:bg-[#CDA52A] hover:text-white",
        ghost: "text-[#5D84C4] hover:bg-[#D9D3A7] hover:text-[#222222]"
    };
    
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };
    
    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}