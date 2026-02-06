import {type ReactNode} from "react";

type ButtonVariants = 'primary' | 'outlined' | 'disabled';

interface ButtonProps {
    children?: ReactNode;
    onClick: () => void;
    variant: ButtonVariants;
    className?: string;
    disabled?: boolean;
}

export default function Button({disabled, className, variant = 'primary', children, onClick}: Readonly<ButtonProps>) {

    const baseClasses =
        `${className} px-8 py-1 rounded-sm tracking-tight transition-colors?`;

    const variantClasses = (buttonVariant: string) => {
        switch (buttonVariant) {
            case "outlined":
                return "hover:cursor-pointer hover:text-black border dark:text-white border-gray-400 text-black hover:bg-gray-400 ";

            case "disabled":
                return "dark:bg-gray-600 bg-gray-200 text-gray-300 bg-opacity-25 dark:text-gray-500 hover:cursor";

            default:
                return "hover:cursor-pointer dark:bg-gray-400 bg-gray-600 text-white dark:text-black hover:bg-gray-500";
        }
    };

    return (
        <button
            disabled={disabled}
            className={`${baseClasses} ${variantClasses(variant)}`}
            onClick={onClick}>
            {children}
        </button>
    )
}