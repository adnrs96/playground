module.exports = {
    theme: {
        extend: {
            colors: {
                indigo: {
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
                    '10': '#F5F7FA'
                },
                green: {
                    '50': '#2DCCA7'
                },
                red: {
                    '50': '#EF4E4E',
                    '80': '#AB091E'
                }
            },
            borderRadius: {
                '10': '10px'
            },
            spacing: {
                initial: 'initial',
                '1/2': '.125rem', // 2px
                '7/8': '.875rem', // 14px
                '7': '1.75rem',
                '11': '2.75rem', // 44px
                '14': '3.5rem', // 56px
                '60': '15rem', // 240px
                '62': '15.5rem', // 248px
                '70': '17.5rem',
                '80': '20rem',
                '87': '21.75rem',
                '90': '22.5rem',
                '125': '31.25rem'
            },
            boxShadow: {
                avatar: '0 0 2px 0 rgba(0,0,0,0.2)',
                navbar: '0 3px 5px 0 rgba(0,30,79,0.05)',
                input: '0px 3px 5px rgba(0, 0, 0, 0.05)',
                card: '0px 5px 20px rgba(16, 22, 111, 0.05)'
            },
            inset: {
                '14': '3.5rem'
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
            body: ['Manrope', 'Helvetica', 'Arial']
        }
    },
    variants: {},
    plugins: [
        function ({ addUtilities }) {
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

            addUtilities(rotations)
        }
    ]
}
