import React from 'react';
import PropTypes from 'prop-types';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useTranslations } from '../../hooks/useTranslations';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { PasswordInput } from '../PasswordInput';
import { TextInput } from '../TextInput';
import { Separator } from '../Separator';
import { Alert } from '../Alert';
import { Spinner } from '../Spinner';

/**
 * Presentational login form
 */
export const LoginForm = ({
    error = '',
    loading = false,
    onSubmit,
    loginWithGoogleUrl = '',
    loginWithFacebookUrl = '',
}) => {
    const { t } = useTranslations();

    const hasLoginServices = Boolean(loginWithGoogleUrl || loginWithFacebookUrl);

    return (
        <div className="w-full bg-white rounded-lg shadow dark:border max-w-md dark:bg-gray-800 dark:border-gray-700 p-6 relative">
            {loading && (
                <div className="absolute left-0 right-0 top-0 bottom-0 rounded-lg bg-white/75 z-10 flex flex-col items-center justify-center dark:bg-gray-800/75">
                    <Spinner />
                </div>
            )}
            <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center dark:text-white">
                {t('welcome-back')}
            </h1>
            <form
                className="mt-4"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (typeof onSubmit === 'function') {
                        onSubmit(e);
                    }
                }}
            >
                <TextInput
                    type="email"
                    label={t('your-email')}
                    required
                    placeholder={t('your-email-here')}
                    errored={Boolean(error)}
                    disabled={loading}
                    autoComplete="username"
                />

                <PasswordInput
                    className="mt-6"
                    label={t('your-password')}
                    required
                    errored={Boolean(error)}
                    disabled={loading}
                    autoComplete="current-password"
                />

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-start">
                        <Checkbox
                            label={t('remember-me')}
                            labelTextColor="text-gray-500 dark:text-gray-300"
                            disabled={loading}
                        />
                    </div>

                    <Button type="link" theme="empty">
                        {t('forgot-password')}
                    </Button>
                </div>

                <div className={`${error ? 'mt-4' : 'mt-6'}`}>
                    {error && (
                        <Alert className="mb-3" theme="error">
                            {error}
                        </Alert>
                    )}

                    <Button full disabled={loading}>
                        {t('submit')}
                    </Button>
                </div>
            </form>

            {hasLoginServices && (
                <>
                    <Separator className="mt-6" label={t('or')} />

                    {loginWithGoogleUrl && (
                        <Button
                            full
                            theme="half"
                            className="flex space-around items-center justify-center mt-6"
                            type="link"
                            href={loginWithGoogleUrl}
                        >
                            <FaGoogle className="mr-2.5 text-lg" />
                            {t('continue-with-google')}
                        </Button>
                    )}

                    {loginWithFacebookUrl && (
                        <Button
                            full
                            theme="half"
                            className="flex space-around items-center justify-center mt-3"
                            type="link"
                            href={loginWithFacebookUrl}
                        >
                            <FaFacebook className="mr-2.5 text-lg" />
                            {t('continue-with-facebook')}
                        </Button>
                    )}
                </>
            )}

            <div className="text-center space-y-2 mt-6">
                <div className="text-gray-600 dark:text-gray-400">
                    {t('dont-have-an-account')}
                    <Button theme="empty" className="ml-2">
                        {t('sign-up')}
                    </Button>
                </div>

                <Button theme="empty" className="ml-2">
                    {t('forgot-password')}
                </Button>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    /**
     * If there is an error in the form, pass it here
     */
    error: PropTypes.string,

    /**
     * Is the form loading?
     */
    loading: PropTypes.bool,

    /**
     * Optional handler when the for is submitted
     */
    onSubmit: PropTypes.func,

    /**
     * Optional link for the login with google
     */
    loginWithGoogleUrl: PropTypes.string,

    /**
     * Optional link for the login with facebook
     */
    loginWithFacebookUrl: PropTypes.string,
};
