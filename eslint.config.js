import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import tsParser from '@typescript-eslint/parser'

export default createConfigForNuxt({
    features: {
        tooling: true,
        devtools: false
    }
})
    .append({
        rules: {
            'vue/html-indent': ['error', 4],
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
            'vue/html-self-closing': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'vue/multiline-html-element-content-newline': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/no-multiple-template-root': 'off',
            'vue/v-on-event-hyphenation': 'off',
            'vue/attribute-hyphenation': 'off',
            'vue/attributes-order': 'off',
            'no-undef': 'off',
            'vue/no-mutating-props': 'off',
        }
    })
    .append({
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tsParser,
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        }
    })
    .append({
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        }
    })