import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  href, 
  variant = 'primary', 
  className = '',
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center font-body text-[14px] transition-all duration-200";
  
  let variantStyles = "";
  if (variant === 'primary') {
    // 32px pill shape as per DESIGN.md
    variantStyles = "bg-cohere-nearblack text-white rounded-pill px-6 py-[12px] font-medium hover:bg-black active:scale-95";
  } else if (variant === 'secondary') {
    // Underlined secondary action
    variantStyles = "bg-transparent text-cohere-ink underline underline-offset-4 decoration-cohere-hairline hover:decoration-cohere-ink hover:text-cohere-blue";
  } else if (variant === 'outline') {
    // 30px pill outline
    variantStyles = "bg-transparent text-cohere-ink border border-cohere-hairline rounded-[30px] px-5 py-[10px] hover:border-cohere-ink hover:bg-cohere-canvas";
  }

  const combinedStyles = `${baseStyles} ${variantStyles} ${className}`;

  if (href) {
    return <a href={href} className={combinedStyles}>{children}</a>;
  }
  
  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
};
