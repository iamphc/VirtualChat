module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./public/icon",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
  ],
  publishers: [],
};
