import React from 'react';

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
}

interface RegularButtonProps extends BaseButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

type ButtonProps = LinkButtonProps | RegularButtonProps;

export default function Button(props: ButtonProps) {
    const { 
        children, 
        variant = "primary", 
        size = "md", 
        disabled = false,
        className = "",
    } = props;

    const baseStyles = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";
    
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

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
    
    // Type guard para saber si tiene href
    if ('href' in props) {
        return (
            <a
                href={props.href}
                className={classes}
            >
                {children}
            </a>
        );
    }
    
    return (
        <button
            type={props.type || 'button'}
            className={classes}
            onClick={props.onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
