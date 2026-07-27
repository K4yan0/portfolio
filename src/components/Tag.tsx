import React from 'react';

interface TagProps {
  label: string;
  variant?: 'blog' | 'tech';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'tech', className = '' }) => {
  let baseStyles = "inline-flex items-center justify-center transition-colors duration-200 whitespace-nowrap";
  
  if (variant === 'blog') {
    // Large coral taxonomy chip (active-like hover state)
    baseStyles += " font-body text-[14px] border border-cohere-coral text-cohere-coral rounded-sm px-4 py-2 hover:bg-cohere-coral hover:text-white";
  } else {
    // Standard tech stack chip (mono, tiny)
    baseStyles += " font-mono uppercase text-[11px] tracking-wider border border-cohere-hairline text-cohere-slate rounded-sm px-3 py-1.5 hover:border-cohere-ink hover:text-cohere-ink bg-white";
  }

  return (
    <span className={`${baseStyles} ${className}`}>
      {label}
    </span>
  );
};
