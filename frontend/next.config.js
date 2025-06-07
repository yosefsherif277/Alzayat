const path = require("path");

module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.alias['@backend'] = path.join(__dirname, 'src', 'backend');
        return config;
    },
};
