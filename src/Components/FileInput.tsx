import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';

// Update props type to handle multiple files
interface FileInputProps {
  onFileSelect?: (file: File | File[]) => void; // Can pass a single file or an array of files
  name?: string;
  acceptedValues?: string;
  multiple?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect, multiple, name, acceptedValues }) => {
  // Use state to store either a single file or an array of files
  const [selectedFiles, setSelectedFiles] = useState<File | File[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (multiple) {
      // Handle multiple files
      const files = event.target.files ? Array.from(event.target.files) : null;
      setSelectedFiles(files);
      if (files && onFileSelect) {
        onFileSelect(files);
      }
    } else {
      // Handle a single file
      const file = event.target.files ? event.target.files[0] : null;
      setSelectedFiles(file);
      if (file && onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Function to render file names
  const renderFileNames = () => {
    if (!selectedFiles) {
      return 'Ninguna imagen seleccionada';
    } else if (Array.isArray(selectedFiles)) {
      // Join the names of all files when multiple files are selected
      return selectedFiles.map(file => file.name).join(', ');
    } else {
      // Show the name of the single selected file
      return selectedFiles.name;
    }
  };

  return (
    <div className="custom-file-input">
      <input
        multiple={multiple}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={fileInputRef}
        accept={acceptedValues}
      />
      <span>{name || renderFileNames()} </span>
      <Button onClick={handleButtonClick}>Seleccionar</Button>
    </div>
  );
};

export default FileInput;
