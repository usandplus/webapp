// src/interfaces/components/Button.ts

export interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary'; // Add more variants as needed
}
