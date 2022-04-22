/** @type {import('next').NextConfig} */
const { withGoogleFonts } = require("nextjs-google-fonts");

module.exports = withGoogleFonts({
  googleFonts: {
    fonts: [
      "https://fonts.googleapis.com/css2?family=Baloo+Bhai+2&display=swap",
      "https://fonts.googleapis.com/css2?family=Carme&display=swap",
      "https://fonts.googleapis.com/css2?family=Alegreya:wght@500&display=swap"
    ],
  }
});
