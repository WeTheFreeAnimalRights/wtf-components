import { isFunction } from 'lodash-es';
import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useTranslations } from '../../hooks/useTranslations';
import { Button } from '../Button';
import { Image } from '../Image';
import { Alert } from '../Alert';
import { cn } from '_/lib/utils';

export const UploadInput = forwardRef(
    (
        {
            currentImage,
            defaultImage,
            onSelect,
            onRemove,
            maxFileSize,
            showPreview = true,
            buttonLabel = null,
            className,
            ...props
        },
        ref
    ) => {
        const { t } = useTranslations();
        const [files, setFiles] = useState([]);
        const [error, setError] = useState(false);
        const [displayImage, setDisplayImage] = useState([]);
        const { getRootProps, getInputProps } = useDropzone({
            ...props,
            maxFiles: 1,
            accept: {
                'image/*': [],
            },
            onDrop: (acceptedFiles) => {
                // Assume there is no error
                setError(false);

                // Get the first file and attach preview
                const firstFile = acceptedFiles.find(Boolean);
                const file = {
                    file: firstFile,
                    preview: URL.createObjectURL(firstFile),
                };

                if (firstFile.size > maxFileSize) {
                    setError(t('file-too-large'));
                    return;
                }

                // Set the files and call the change event
                setFiles([file]);

                // Set the display image
                setDisplayImage(file.preview);

                // Call the onselect
                if (isFunction(onSelect)) {
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
            <div className={cn('flex flex-row items-center', className)}>
                {showPreview && displayImage && (
                    <div className="bg-gray-50 rounded-full dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-center me-3 w-32 h-32 overflow-hidden">
                        <Image
                            src={displayImage}
                            alt=""
                            className="w-full h-full object-cover rounded-full"
                            onLoad={() => {
                                // If It's a blob
                                if (/^blob:http/i.test(displayImage)) {
                                    URL.revokeObjectURL(displayImage);
                                }
                            }}
                        />
                    </div>
                )}
                <div className="flex flex-col gap-2 sm:flex-row">
                    {error && <Alert variant="destructive">{error}</Alert>}

                    <div {...getRootProps({ className: '' })}>
                        <input ref={ref} {...getInputProps()} />
                        <Button variant="outline" type="button">
                            {displayImage !== defaultImage
                                ? t('upload-change')
                                : buttonLabel || t('upload-upload')}
                        </Button>
                    </div>

                    {displayImage !== defaultImage && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                                setDisplayImage(defaultImage);

                                if (isFunction(onRemove)) {
                                    onRemove();
                                }
                            }}
                        >
                            {t('upload-remove')}
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
