// src/components/ui/Card.tsx
import React from 'react';
import styles from './Card.module.css';

/* ---------- helpers ---------- */
type DivProps = React.HTMLAttributes<HTMLDivElement>;

/* ---------- shell ---------- */
export const Card: React.FC<DivProps> = ({children, className = '', ...rest}) => (
    <div className={`${styles.card} ${className}`} {...rest}>
        {children}
    </div>
);

/* ---------- sections ---------- */
export const CardHeader: React.FC<DivProps> = ({
                                                   children,
                                                   className = '',
                                                   ...rest
                                               }) => (
    <header className={`${styles.header} ${className}`} {...rest}>
        {children}
    </header>
);

export const CardTitle: React.FC<DivProps> = ({
                                                  children,
                                                  className = '',
                                                  ...rest
                                              }) => (
    <h3 className={`${styles.title} ${className}`} {...rest}>
        {children}
    </h3>
);

export const CardContent: React.FC<DivProps> = ({
                                                    children,
                                                    className = '',
                                                    ...rest
                                                }) => (
    <div className={`${styles.content} ${className}`} {...rest}>
        {children}
    </div>
);
