module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@babel/eslint-parser",
        sourceType: "module",
        ecmaVersion: 2021,
        requireConfigFile: false
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended"
    ],
    rules: {
        "vue/multi-word-component-names": "off"
    }
};
