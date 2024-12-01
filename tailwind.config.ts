import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./app/**/*.{ts,tsx,mdx}',
		'./components/**/*.{ts,tsx,mdx}',
		'./pages/**/*.{ts,tsx,mdx}', // Include pages folder if exists
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
		'./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}', // Include Flowbite
		
	],
	theme: {
    	extend: {
    		animation: {
    			'bounce-once': 'bounce-once 1s ease-in-out',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		},
    		keyframes: {
    			'bounce-once': {
    				'0%, 100%': {
    					transform: 'translateY(0)',
    					animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
    				},
    				'50%': {
    					transform: 'translateY(-25%)'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		backgroundImage: {
    			'gradient-to-r': 'linear-gradient(to right, #007bff, #0041c4)',
    			'gradient-hover-to-r': 'linear-gradient(to right, #0062cc, #002090)',
    			'gradient-orange-to-r': 'linear-gradient(to right, #f97316, #ea580c)',
    			'gradient-orange-hover-to-r': 'linear-gradient(to right, #f97316, #f97316)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		}
    	}
    },
	plugins: [
		nextui(),
		require( "tailwindcss-animate" ),
		
		require( 'flowbite-typography' ),
	],
	darkMode: [ 'class', 'class' ], // Set dark mode
} satisfies Config;
