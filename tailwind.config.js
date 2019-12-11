const _ = require('lodash')

module.exports = {
  theme: {
    extend: {
      colors: {
        indigo: {
          logo: '#3B34B6',
          100: '#19216C',
          90: '#2D3A8C',
          80: '#35469C',
          70: '#4055A8',
          60: '#4C63B6',
          50: '#647ACB',
          40: '#7B93DB',
          30: '#98AEEB',
          20: '#BED0F7',
          10: '#E0E8F9'
        },
        gray: {
          100: '#1F2933',
          90: '#323F4B',
          80: '#3E4C59',
          70: '#52606D',
          60: '#616E7C',
          50: '#7B8794',
          40: '#9AA5B1',
          30: '#CBD2D9',
          20: '#E4E7EB',
          10: '#F5F7FA'
        },
        blue: {
          100: '#003E6B',
          90: '#0A558C',
          80: '#0F609B',
          70: '#186FAF',
          60: '#2680C2',
          50: '#4098D7',
          40: '#62B0E8',
          30: '#84C5F4',
          20: '#B6E0FE',
          10: '#DCEEFB'
        },
        lemon: {
          100: '#05400A',
          90: '#0E5814',
          80: '#207227',
          70: '#2F8132',
          60: '#3F9142',
          50: '#57AE5B',
          40: '#7BC47F',
          30: '#A3D9A5',
          20: '#C1EAC5',
          10: '#E3F9E5'
        },
        green: {
          100: '#004440',
          90: '#016457',
          80: '#048271',
          70: '#079A82',
          60: '#17B897',
          50: '#2DCCA7',
          40: '#5FE3C0',
          30: '#8EEDD1',
          20: '#C6F7E9',
          10: '#F0FCF9'
        },
        red: {
          100: '#610316',
          90: '#8A041A',
          80: '#AB091E',
          70: '#CF1124',
          60: '#E12D39',
          50: '#EF4E4E',
          40: '#F86A6A',
          30: '#FF9B9B',
          20: '#FFBDBD',
          10: '#FFE3E3'
        },
        yellow: {
          100: '#513C06',
          90: '#7C5E10',
          80: '#A27C1A',
          70: '#C99A2E',
          60: '#E9B949',
          50: '#F7D070',
          40: '#F9DA8B',
          30: '#F8E3A3',
          20: '#FCEFC7',
          10: '#FFFAEB'
        },
        orange: {
          100: '#572508',
          90: '#77340D',
          80: '#8C3D10',
          70: '#AB4E19',
          60: '#C65D21',
          50: '#E67635',
          40: '#EF8E58',
          30: '#FAB38B',
          20: '#FFD3BA',
          10: '#FFEFE6'
        },
        magenta: {
          100: '#4E0754',
          90: '#671270',
          80: '#7C1A87',
          70: '#90279C',
          60: '#A23DAD',
          50: '#AD4BB8',
          40: '#BB61C7',
          30: '#CE80D9',
          20: '#ECBDF2',
          10: '#F5E1F7'
        },
        pink: {
          100: '#5C0B33',
          90: '#781244',
          80: '#9B1B5A',
          70: '#AD2167',
          60: '#C42D78',
          50: '#DA4A91',
          40: '#E668A7',
          30: '#F191C1',
          20: '#FAB8D9',
          10: '#FFE0F0'
        }
      },
      borderRadius: {
        xs: '.1875rem',
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
        7: '1.75rem',
        14: '3.5rem', // 56px
        22: '5.5rem' // 88px
      },
      boxShadow: {
        sm: '0 3px 5px rgba(0, 0, 0, 0.05)',
        sm2: '0px 0px 2px rgba(0, 0, 0, 0.15)',
        card: '0px 5px 18px rgba(0, 0, 0, 0.06)',
        'inner-right': 'inset -1px -4px 10px 2px rgba(0, 0, 0, 0.06)'
      },
      inset: {
        min: '.125rem',
        1: '.25rem',
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
      'even',
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
