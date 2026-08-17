import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: 'light', toggleTheme: () => undefined })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('anchor-theme') as Theme) || 'light')
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); localStorage.setItem('anchor-theme', theme) }, [theme])
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light') }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)