const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        coverimage: "url('src/pages/UpcomingTickets/assets/coverimage.jpg')",
      },
    },
  },
  plugins: [],
});
