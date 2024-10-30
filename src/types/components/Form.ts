// src/interfaces/components/Form.ts

export interface FormProps {
    onSubmit: (data: FormData) => void; // Function to handle form submission
    children: React.ReactNode;
}

export interface FormData {
    [key: string]: any; // Allows flexibility for different form fields
}
