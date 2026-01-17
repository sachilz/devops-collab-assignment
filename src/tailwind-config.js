tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#38BDF8', // Sky 400
                        secondary: '#0F172A', // Slate 900
                        dark: '#020617', // Slate 950
                        surface: '#1E293B', // Slate 800
                        accent: '#FBBF24', // Amber 400
                    },
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'spin-slow': 'spin 12s linear infinite',
                        'blob': 'blob 7s infinite',
                        'shine': 'shine 3s infinite',
                        'gradient-xy': 'gradient-xy 6s ease infinite',
                    },
                    keyframes: {
                        blob: {
                            "0%": { transform: "translate(0px, 0px) scale(1)" },
                            "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                            "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                            "100%": { transform: "translate(0px, 0px) scale(1)" }
                        },
                        shine: {
                            "0%": { transform: "translateX(-100%) skewX(-15deg)" },
                            "100%": { transform: "translateX(200%) skewX(-15deg)" }
                        },
                        'gradient-xy': {
                            '0%, 100%': {
                                'background-size': '200% 200%',
                                'background-position': 'left center'
                            },
                            '50%': {
                                'background-size': '200% 200%',
                                'background-position': 'right center'
                            }
                        }
                    }
                }
            }
        }
