module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        plane1: "url('./images/plane1.jpg')",
        plane2: "url('./images/plane2.jpg')",
        plane3: "url('./images/plane3.jpg')",
        plane4: "url('./images/plane4.jpg')",
        plane5: "url('./images/plane5.jpg')",
      }),
      colors: {
        logoBlue: {
          500: "#009de2",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    'postcss-import',
  ],
};
