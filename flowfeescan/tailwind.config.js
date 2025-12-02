/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Fintech Theme: Dark Blue + Cyan
				primary: {
					DEFAULT: '#0A1628',
					50: '#E6EBF4',
					100: '#C0CCE0',
					200: '#8FA5C6',
					300: '#5E7DAC',
					400: '#3B5E97',
					500: '#1A3F82',
					600: '#15376F',
					700: '#102C5C',
					800: '#0C2149',
					900: '#0A1628',
				},
				secondary: {
					DEFAULT: '#00D4FF',
					50: '#E5FBFF',
					100: '#B8F4FF',
					200: '#8AECFF',
					300: '#5CE5FF',
					400: '#2EDEFF',
					500: '#00D4FF',
					600: '#00AACC',
					700: '#008099',
					800: '#005566',
					900: '#002B33',
				},
				accent: {
					DEFAULT: '#10B981',
					50: '#ECFDF5',
					100: '#D1FAE5',
					200: '#A7F3D0',
					300: '#6EE7B7',
					400: '#34D399',
					500: '#10B981',
					600: '#059669',
					700: '#047857',
					800: '#065F46',
					900: '#064E3B',
				},
				dark: {
					DEFAULT: '#0F172A',
					50: '#F8FAFC',
					100: '#F1F5F9',
					200: '#E2E8F0',
					300: '#CBD5E1',
					400: '#94A3B8',
					500: '#64748B',
					600: '#475569',
					700: '#334155',
					800: '#1E293B',
					900: '#0F172A',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF',
				},
				muted: {
					DEFAULT: '#1E293B',
					foreground: '#94A3B8',
				},
				popover: {
					DEFAULT: '#1E293B',
					foreground: '#F1F5F9',
				},
				card: {
					DEFAULT: '#1E293B',
					foreground: '#F1F5F9',
				},
			},
			borderRadius: {
				lg: '0.75rem',
				md: '0.5rem',
				sm: '0.25rem',
			},
			boxShadow: {
				'glow': '0 0 20px rgba(0, 212, 255, 0.3)',
				'glow-lg': '0 0 40px rgba(0, 212, 255, 0.4)',
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
				},
				'fade-in': {
					'0%': { opacity: 0, transform: 'translateY(10px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-hero': 'linear-gradient(135deg, #0A1628 0%, #1A3F82 50%, #0A1628 100%)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
