// next-intl.config.js
module.exports = {
  // Define all supported locales
  locales: ["en", "es", "fr"],

  // Set default locale
  defaultLocale: "en",

  // Optional: Configure logging level
  logging: {
    level: process.env.NODE_ENV === "development" ? "warn" : "error",
  },

  // Optional: Configure date and time formats
  formats: {
    dateTime: {
      short: {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    },
  },
}

