import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import tsParser from '@typescript-eslint/parser'
import security from 'eslint-plugin-security'

export default createConfigForNuxt({
    features: {
        tooling: true,
        devtools: false
    }
})
    .append({
        ignores: ['/*.d.ts', '/*.declare.ts', 'constants/app.ts']
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

            // отключаем TS предупреждения
            // '@typescript-eslint/no-explicit-any': 'off',
            // '@typescript-eslint/no-unused-vars': 'off',

            // отключаем unicorn/prefer-number-properties
            // 'unicorn/prefer-number-properties': 'off',

            // // отключаем предупреждения по регуляркам
            // 'regexp/no-obscure-range': 'off',
            // 'regexp/prefer-d': 'off',
            // 'regexp/negation': 'off',
            // 'regexp/no-super-linear-backtracking': 'off'
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
    .append({
        plugins: {
            security
        },
        rules: {
            ...security.configs.recommended.rules
        }
    })