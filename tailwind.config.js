const _ = require('lodash')

module.exports = {
  theme: {
    extend: {
      colors: {
        indigo: {
          logo: '#3B34B6',
          '100': '#10166F',
          '90': '#182088',
          '80': '#242EAE',
          '70': '#3341D6',
          '60': '#5A6AFF',
          '50': '#7180FF',
          '40': '#8C99FF',
          '30': '#B0BAFF',
          '20': '#D7DDFF',
          '10': '#EBEEFF'
        },
        gray: {
          '100': '#1F2933',
          '90': '#323F4B',
          '80': '#3E4C59',
          '70': '#52606D',
          '60': '#616E7C',
          '50': '#7B8794',
          '40': '#9AA5B1',
          '30': '#CBD2D9',
          '20': '#E4E7EB',
          '10': '#F0F3F7'
        },
        green: {
          '100': '#004440',
          '90': '#016457',
          '80': '#048271',
          '70': '#079A82',
          '60': '#17B897',
          '50': '#2DCCA7',
          '40': '#5FE3C0',
          '30': '#8EEDD1',
          '20': '#C6F7E9',
          '10': '#F0FCF9'
        },
        red: {
          '100': '#610316',
          '90': '#8A041A',
          '80': '#AB091E',
          '70': '#CF1124',
          '60': '#E12D39',
          '50': '#EF4E4E',
          '40': '#F86A6A',
          '30': '#FF9B9B',
          '20': '#FFBDBD',
          '10': '#FFE3E3'
        },
        yellow: {
          '100': '#8D2B0B',
          '90': '#B44D12',
          '80': '#CB6E17',
          '70': '#DE911D',
          '60': '#F0B429',
          '50': '#F7C948',
          '40': '#FADB5F',
          '30': '#FCE588',
          '20': '#FFF3C4',
          '10': '#FFFBEA'
        }
      },
      borderRadius: {
        sm: '.25rem',
        md: '.3125rem',
        xl: '.4375rem',
        '3xl': '1.875rem'
      },
      spacing: {
        initial: 'initial',
        'fit-content': 'fit-content',
        'max-content': 'max-content',
        '2full': '200%',
        '14': '3.5rem', // 56px
        '22': '5.5rem' // 88px
      },
      boxShadow: {
        sm: '0 3px 5px rgba(0, 0, 0, 0.05)',
        card: '0px 5px 18px rgba(0, 0, 0, 0.06)'
      },
      inset: {
        min: '.125rem',
        half: '50%',
        full: '100%'
      },
      maxWidth: {
        xxs: '10rem'
      }
    },
    letterSpacing: {
      normal: '0', // 0%
      wide: '.01em', // 1%
      wider: '.02em' // 2%
    },
    fontSize: {
      xs: '.75rem', // 12px
      sm: '.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '2.5rem', // 40px
      '6xl': '3.75rem' // 60px
    },
    fontFamily: {
      body: ['Manrope', 'Helvetica', 'Arial', 'sans-serif'],
      monospace: ['SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace']
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'current-color': 'currentColor'
    })
  },
  variants: {
    display: ['responsive', 'hover'],
    spacing: ['responsive'],
    shadow: ['responsive', 'hover'],
    textColor: [
      'responsive',
      'hover',
      'focus',
      'active',
      'group-hover',
      'group-active'
    ],
    backgroundColor: [
      'responsive',
      'odd',
      'hover',
      'focus',
      'active',
      'group-hover',
      'group-active'
    ]
  },
  plugins: [
    function ({
      addUtilities,
      addVariant,
      config,
      e
    }) {
      const rotations = {
        '.rotate': {
          transform: 'rotate(0deg)'
        },
        '.rotate-45deg': {
          transform: 'rotate(45deg)'
        },
        '.rotate-90deg': {
          transform: 'rotate(90deg)'
        },
        '.rotate-135deg': {
          transform: 'rotate(135deg)'
        },
        '.rotate-180deg': {
          transform: 'rotate(180deg)'
        },
        '.rotate-225deg': {
          transform: 'rotate(225deg)'
        },
        '.rotate-270deg': {
          transform: 'rotate(270deg)'
        },
        '.rotate-315deg': {
          transform: 'rotate(315deg)'
        },
        '.rotate-360deg': {
          transform: 'rotate(360deg)'
        }
      }

      const beforeSpacing = _.map(config('theme.spacing'), (value, key) => {
        return {
          [`.${e(`before-ml-${key}`)}:before`]: {
            'margin-left': value
          },
          [`.${e(`before-mr-${key}`)}:before`]: {
            'margin-right': value
          }
        }
      })

      const minusInsets = _.map(config('theme.inset'), (value, key) => {
        return {
          [`.${e(`-top-${key}`)}`]: {
            top: `-${value}`
          },
          [`.${e(`-right-${key}`)}`]: {
            right: `-${value}`
          },
          [`.${e(`-bottom-${key}`)}`]: {
            bottom: `-${value}`
          },
          [`.${e(`-left-${key}`)}`]: {
            left: `-${value}`
          }
        }
      })

      addUtilities(rotations)
      addUtilities(beforeSpacing)
      addUtilities(minusInsets)
      addVariant('group-active', ({
        modifySelectors,
        separator
      }) => {
        modifySelectors(({
          className
        }) => {
          return `.group:active .${e(`group-active${separator}${className}`)}`
        })
      })
    }
  ]
}
