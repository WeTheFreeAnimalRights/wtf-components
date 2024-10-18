import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useTranslations } from '../../hooks/useTranslations';
import { Button } from '../Button';

export const UploadInput = forwardRef(
    ({ currentImage, onSelect, ...props }, ref) => {
        const { t } = useTranslations();
        const [files, setFiles] = useState([]);
        const { getRootProps, getInputProps, open } = useDropzone({
            ...props,
            maxFiles: 1,
            accept: {
                'image/*': [],
            },
            onDrop: (acceptedFiles) => {
                const files = acceptedFiles.map((file) => ({
                    ...file,
                    preview: URL.createObjectURL(file),
                }));

                setFiles(files);
                if (typeof onSelect === 'function') {
                    onSelect(files);
                }
            },
        });

        useEffect(() => {
            // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
            return () =>
                files.forEach((file) => URL.revokeObjectURL(file.preview));
        }, []);

        const isThereImage = (files && files.length > 0) || currentImage;

        return (
            <div className="block">
                {isThereImage && (
                    <div className="bg-gray-50 rounded-lg dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-center mb-3 w-32 h-32 overflow-hidden">
                        {files && files.length > 0 ? (
                            files.map((file, index) => (
                                <img
                                    key={`file-${file.name}-${index}`}
                                    src={file.preview}
                                    alt=""
                                    className="w-full h-full object-cover rounded-lg"
                                    // Revoke data uri after image is loaded
                                    onLoad={() => {
                                        URL.revokeObjectURL(file.preview);
                                    }}
                                />
                            ))
                        ) : (
                            <img
                                src={currentImage}
                                alt=""
                                className="w-full h-full object-cover rounded-lg"
                            />
                        )}
                    </div>
                )}
                <div {...getRootProps({ className: '' })}>
                    <input ref={ref} {...getInputProps()} />
                    <Button
                        onClick={() => open()}
                        className="w-32"
                        variant="outline"
                        type="button"
                    >
                        {isThereImage ? t('change') : t('upload')}
                    </Button>
                </div>
            </div>
        );
    }
);

export { FormFieldUploadInput } from './FormFieldUploadInput';

UploadInput.propTypes = {
    /**
     * The current image to be shown
     */
    currentImage: PropTypes.string,

    /**
     * Function called when a file is selected
     */
    onSelect: PropTypes.func,
};
