import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useTranslations } from '../../hooks/useTranslations';
import { Button } from '../Button';

export const UploadInput = forwardRef(
    ({ currentImage, defaultImage, onSelect, onRemove, ...props }, ref) => {
        const { t } = useTranslations();
        const [files, setFiles] = useState([]);
        const [displayImage, setDisplayImage] = useState([]);
        const { getRootProps, getInputProps, open } = useDropzone({
            ...props,
            maxFiles: 1,
            accept: {
                'image/*': [],
            },
            onDrop: (acceptedFiles) => {
                // Get the first file and attach preview
                const firstFile = acceptedFiles.find(Boolean);
                const file = {
                    file: firstFile,
                    preview: URL.createObjectURL(firstFile),
                };

                // Set the files and call the change event
                setFiles([file]);

                // Set the display image
                setDisplayImage(file.preview);

                // Call the onselect
                if (typeof onSelect === 'function') {
                    onSelect(file);
                }
            },
        });

        useEffect(() => {
            // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
            return () =>
                files.forEach((file) => URL.revokeObjectURL(file.preview));
        }, []);

        useEffect(() => {
            setDisplayImage(currentImage || defaultImage);
        }, [currentImage, defaultImage]);

        return (
            <div className="block">
                {displayImage && (
                    <div className="bg-gray-50 rounded-lg dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-center mb-3 w-32 h-32 overflow-hidden">
                        <img
                            src={displayImage}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                            onLoad={() => {
                                // If It's a blob
                                if (/^blob\:http/i.test(displayImage)) {
                                    URL.revokeObjectURL(displayImage);
                                }
                            }}
                        />
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <div {...getRootProps({ className: '' })}>
                        <input ref={ref} {...getInputProps()} />
                        <Button
                            onClick={() => open()}
                            className="w-32"
                            variant="outline"
                            type="button"
                        >
                            {displayImage !== defaultImage
                                ? t('Change')
                                : t('Upload')}
                        </Button>
                    </div>

                    {displayImage !== defaultImage && (
                        <Button
                            type="button"
                            variant="destructive"
                            className="w-32"
                            onClick={() => {
                                setDisplayImage(defaultImage);

                                if (typeof onRemove === 'function') {
                                    onRemove();
                                }
                            }}
                        >
                            {t('Remove')}
                        </Button>
                    )}
                </div>
            </div>
        );
    }
);

export { FormFieldUploadInput } from './FormFieldUploadInput';

UploadInput.displayName = 'UploadInput';
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
