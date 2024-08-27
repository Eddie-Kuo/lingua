/** @type {import("prettier").Config} */
const config = {
  bracketSameLine: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["tw"],
};

module.exports = config;
