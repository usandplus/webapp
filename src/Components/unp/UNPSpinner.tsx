import { Spinner } from "react-bootstrap"

interface UNPSpinnerProps {
    fullScreen?: boolean; // Use the InputType union
    variant?: string;
    className?: string;
    label?: string; // Ensure label is part of the props
}

const UNPSpinner: React.FC<UNPSpinnerProps> = ({ fullScreen, variant, label, className }) => {
    const fullscreenClass = 'd-flex justify-content-center align-items-center vh-100'
    const nonFullscreenClass = ''
    const fixedClassName =
        fullScreen
            ? fullscreenClass
            : nonFullscreenClass
    return (
        <div className={`${className} ${fixedClassName}`}>
            <Spinner title={label} animation="border" variant={variant || 'primary'} />
        </div>
    )
};

export default UNPSpinner;
