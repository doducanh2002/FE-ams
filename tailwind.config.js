module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-1": "var(--accent-1)",
        base: "var(--base)",
        "empty-no-code": "var(--empty-no-code)",
        "grayg-100": "var(--grayg-100)",
        "lightmodeneutralneu-0": "var(--lightmodeneutralneu-0)",
        "lightmodeneutralneu-900": "var(--lightmodeneutralneu-900)",
        "lightmodeprimarypri-500": "var(--lightmodeprimarypri-500)",
        "neutral-1": "var(--neutral-1)",
        "neutral-2": "var(--neutral-2)",
        "neutral-3": "var(--neutral-3)",
        "neutral-4": "var(--neutral-4)",
        neutralstroke: "var(--neutralstroke)",
        neutralwhite: "var(--neutralwhite)",
        "primary-2": "var(--primary-2)",
        "secondary-1": "var(--secondary-1)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "body-large-bold-16": "var(--body-large-bold-16-font-family)",
        "display-sm-medium": "var(--display-sm-medium-font-family)",
        "display-xs-bold": "var(--display-xs-bold-font-family)",
        "display-xs-medium": "var(--display-xs-medium-font-family)",
        "display-xs-regular": "var(--display-xs-regular-font-family)",
        "text-l-regular": "var(--text-l-regular-font-family)",
        "text-lg-light": "var(--text-lg-light-font-family)",
        "text-lg-medium": "var(--text-lg-medium-font-family)",
        "text-md-light": "var(--text-md-light-font-family)",
        "text-md-medium": "var(--text-md-medium-font-family)",
        "text-md-regular": "var(--text-md-regular-font-family)",
        "text-sm-light": "var(--text-sm-light-font-family)",
        "text-sm-medium": "var(--text-sm-medium-font-family)",
        "text-xs-regular": "var(--text-xs-regular-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
