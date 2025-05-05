import md5 from 'blueimp-md5';

export const getGravatarUrl = (email = '', size = 200) => {
    const cleanedEmail = email.trim().toLowerCase();
    const hash = md5(cleanedEmail);
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};
