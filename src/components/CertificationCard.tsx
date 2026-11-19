import React from 'react';
import { Tag } from './Tag';

export interface CertificationCardProps {
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  description: string;
  tags?: string[];
  status?: string;
  badgeUrl?: string;
  issuedByPrefix?: string;
  verifyText?: string;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  verificationUrl,
  description,
  tags = [],
  status = "Verified",
  badgeUrl,
  issuedByPrefix = "Issued by",
  verifyText = "Verify Credential"
}) => {
  return (
    <div className="group flex flex-col bg-white border border-cohere-hairline rounded-lg p-6 md:p-8 transition-all duration-300 hover:border-cohere-ink">
      {/* Header with Badge Image on Left and Title/Issuer on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
        {/* Badge / Logo on the left */}
        <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-md border border-cohere-hairline bg-cohere-stone/40 flex items-center justify-center overflow-hidden p-2">
          {badgeUrl ? (
            <img 
              src={badgeUrl} 
              alt={`${issuer} badge`} 
              className="w-full h-full object-contain"
            />
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-8 h-8 text-cohere-slate"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          )}
        </div>

        {/* Right side of the badge: Title + "Issued by {issuer} • {issueDate}" */}
        <div className="flex-grow space-y-1.5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-[22px] md:text-[26px] leading-[1.2] tracking-[-0.32px] text-cohere-nearblack group-hover:text-cohere-blue transition-colors">
              {title}
            </h3>
            {status && (
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {status}
              </span>
            )}
          </div>
          
          <div className="font-mono text-[13px] text-cohere-slate flex flex-wrap items-center gap-x-2">
            <span>{issuedByPrefix} {issuer}</span>
            <span>•</span>
            <span>{issueDate}</span>
            {expiryDate && (
              <>
                <span className="text-cohere-hairline">•</span>
                <span className="text-cohere-muted">{expiryDate}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Description / Competencies */}
      <p className="font-body text-[15px] leading-[1.6] text-cohere-ink opacity-90 mb-6 flex-grow">
        {description}
      </p>

      {/* Optional Skill Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} variant="tech" />
          ))}
        </div>
      )}

      {/* Footer Link / Verification */}
      <div className="mt-auto pt-5 border-t border-cohere-borderlight flex items-center justify-between">
        {verificationUrl ? (
          <a
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] text-cohere-blue hover:text-cohere-nearblack inline-flex items-center gap-1.5 font-medium transition-colors"
          >
            {verifyText} <span className="transition-transform group-hover:translate-x-0.5">↗</span>
          </a>
        ) : (
          <span className="font-mono text-[12px] text-cohere-muted">
            Official Credential
          </span>
        )}
        {credentialId ? (
          <span className="font-mono text-[12px] text-cohere-muted">
            ID: {credentialId}
          </span>
        ) : (
          <span className="font-mono text-[11px] text-cohere-muted uppercase tracking-wider">
            Accredited
          </span>
        )}
      </div>
    </div>
  );
};
