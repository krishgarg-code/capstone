'use client';

import React from 'react';
import { useTransition } from '@/context/TransitionContext';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function TransitionLink({ href, children, className, onClick, ...props }: TransitionLinkProps) {
    const { startTransition } = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (onClick) onClick(e);
        startTransition(href);
    };

    return (
        <a href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </a>
    );
}
