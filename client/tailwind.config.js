/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main': '#9B4DE0',
        'sidebar': '#231B2E',
        'layout': '#170F23',
        'player': '#170F23',
        'overlay-30': 'rgba(0,0,0,0.3)'
      },
      colors: {
        'main-100': '#E7ECEC',
        'main-200': '#DDE4E4',
        'main-400': '#C0D8D8',
        'layout': '#CED9D9',
        'main': '#9B4DE0'
      },
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': ' translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left2': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'rotate-center': {
          '0%': {
            '-webkit-transform': ' rotate(0deg);',
            transform: 'rotate(0deg);'
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg);'
          }
        },
        'rotate-center-pause': {
          '0%': {
            '-webkit-transform': ' rotate(360deg);',
            transform: 'rotate(360deg);',
            'border-radius': '9999px;'
          },
          '100%': {
            '-webkit-transform': 'rotate(0deg);',
            transform: 'rotate(0deg);'
          }
        },
        'scale-up-image': {
          '0%': {
            '-webkit-transform': ' scale(1);',
            transform: 'scale(1);',
          },
          '100%': {
            '-webkit-transform': 'scale(1.2);',
            transform: 'scale(1.2);'
          }
        },
        'scale-down-image': {
          '0%': {
            '-webkit-transform': ' scale(1.2);',
            transform: 'scale(1.2);',
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          }
        },
        'scale-up-center': {
          '0%': {
            '-webkit-transform': ' scale(0);',
            transform: 'scale(0);',
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          }
        },
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'rotate-center': 'rotate-center 7s linear infinite;',
        'rotate-center-pause': 'rotate-center-pause 0.3s linear 2 both;',
        'scale-up-image': 'scale-up-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-down-image': 'scale-down-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',


      },
      flex: {
        '2': '2 2 0%',
        '4': '4 4 0%',
        '6': '6 6 0%',
        '3': '3 3 0%',
        '7': '7 7 0%',

      }
    },
    screens: {
      '1400': '1400px',
      '739': '739px',
      '1324': '1324px',
      '426': '426px',
      'smc': '840px',
      'sm': '640px',
      'md': '1024px',
      'lg': '1440px',
    }
  },
  plugins: [],
}