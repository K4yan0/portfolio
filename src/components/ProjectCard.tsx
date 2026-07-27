import React from 'react';
import { Tag } from './Tag';

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  url?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags = [], imageUrl, url }) => {
  const content = (
    <div className="group h-full flex flex-col bg-white border border-cohere-hairline rounded-lg overflow-hidden transition-all duration-300 hover:border-cohere-ink">
      {imageUrl && (
        <div className="w-full h-56 bg-cohere-stone overflow-hidden border-b border-cohere-hairline">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-display text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.32px] text-cohere-nearblack mb-4 group-hover:text-cohere-blue transition-colors">
          {title}
        </h3>
        <p className="font-body text-[16px] leading-[1.5] text-cohere-ink mb-12 flex-grow opacity-90">
          {description}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-cohere-borderlight">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} variant="tech" />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} className="block no-underline h-full">
        {content}
      </a>
    );
  }

  return <div className="h-full">{content}</div>;
};
