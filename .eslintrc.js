module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ]
    }
}
