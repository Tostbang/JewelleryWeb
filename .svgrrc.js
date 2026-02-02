module.exports = {
  typescript: true,
  icon: true,

  // THIS adds proper typing
  expandProps: "end",

  // THIS removes hard-coded fills
  replaceAttrValues: {
    "#141B34": "currentColor",
    "#000": "currentColor",
    "#000000": "currentColor",
    "#fff": "currentColor",
    "#ffffff": "currentColor",
  },

  // Cleaner output
  prettier: false,
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "removeAttrs",
        params: {
          attrs: "(fill|stroke)",
        },
      },
    ],
  },
};
