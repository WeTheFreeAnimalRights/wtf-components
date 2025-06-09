  export const getLocaleFormat = (locale = 'en') => {

    const parseFormatByLocale = {
        en: 'MMMM d, yyyy',              // June 12, 2025
        fr: 'd MMMM yyyy',               // 12 juin 2025
        es: "d 'de' MMMM 'de' yyyy",     // 12 de junio de 2025
        it: 'd MMMM yyyy',               // 12 giugno 2025
        de: 'd. MMMM yyyy',              // 12. Juni 2025
        tr: 'd MMMM yyyy',               // 12 Haziran 2025
        pt: "d 'de' MMMM 'de' yyyy",     // 12 de junho de 2025
        nl: 'd MMMM yyyy',               // 12 juni 2025
        id: 'd MMMM yyyy',               // 12 Juni 2025
        ru: 'd MMMM yyyy',               // 12 июня 2025
        bg: 'd MMMM yyyy',               // 12 юни 2025
        hi: 'd MMMM yyyy',               // 12 जून 2025
        ka: 'd MMMM yyyy',               // 12 ივნისი 2025
        ar: 'd MMMM yyyy',               // 12 يونيو 2025
        th: 'd MMMM yyyy',               // 12 มิถุนายน 2025
        he: "d בMMMM yyyy",              // 12 ביוני 2025
      };

    return parseFormatByLocale[locale] || parseFormatByLocale['en'];
  }
