import { createRootRoute, createRoute, createRouter, Link, Outlet } from '@tanstack/react-router'
import { Moon, Sun, Anchor } from 'lucide-react'
import { Button } from './components/ui/button'
import { useTheme } from './contexts/theme'
import { useI18n } from './contexts/i18n'
import { HomePage } from './pages/home'
import { GuidePage } from './pages/guide'

function Shell() {
  const { theme, toggleTheme } = useTheme()
  const { t, toggleLocale } = useI18n()
  return <div className="min-h-screen bg-background text-foreground"><header className="border-b"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4"><Link to="/" className="flex items-center gap-2 font-bold"><span className="rounded-lg bg-primary p-2 text-primary-foreground"><Anchor size={18} /></span>{t.app}</Link><nav className="flex items-center gap-1"><Link to="/" className="rounded-md px-3 py-2 text-sm hover:bg-accent">{t.dashboard}</Link><Link to="/guide" className="rounded-md px-3 py-2 text-sm hover:bg-accent">{t.guide}</Link><Button aria-label={t.language} variant="ghost" size="sm" onClick={toggleLocale}>{t.language}</Button><Button aria-label={t.theme} variant="ghost" size="icon" onClick={toggleTheme}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</Button></nav></div></header><main><Outlet /></main></div>
}
const rootRoute = createRootRoute({ component: Shell })
const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage })
const guideRoute = createRoute({ getParentRoute: () => rootRoute, path: '/guide', component: GuidePage })
const routeTree = rootRoute.addChildren([homeRoute, guideRoute])
export const router = createRouter({ routeTree })
declare module '@tanstack/react-router' { interface Register { router: typeof router } }