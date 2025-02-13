export const PirschScript = ({ code }) => {
    const { REACT_APP_ENV } = process.env;

    if (REACT_APP_ENV !== 'production') {
        return null;
    }

    return (
        <script
            defer
            src="https://api.pirsch.io/pa.js"
            id="pianjs"
            data-code={code}
        />
    );
};
