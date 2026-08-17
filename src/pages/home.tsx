import { useState } from 'react'
import { Trash2, Sparkles } from 'lucide-react'
import { z } from 'zod'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { useI18n } from '../contexts/i18n'

type Energy = 'low' | 'medium' | 'high'
type Task = { id: number; name: string; minutes: number; energy: Energy }
const taskSchema = z.object({ name: z.string().trim().min(2), minutes: z.coerce.number().min(5).max(240), energy: z.enum(['low', 'medium', 'high']) })
const initial: Task[] = [{ id: 1, name: 'Review open pull requests', minutes: 25, energy: 'medium' }, { id: 2, name: 'Plan tomorrow’s first hour', minutes: 10, energy: 'low' }]

export function HomePage() {
  const { t } = useI18n()
  const [tasks, setTasks] = useState<Task[]>(() => { try { return JSON.parse(localStorage.getItem('anchor-tasks') || 'null') || initial } catch { return initial } })
  const [name, setName] = useState('')
  const [minutes, setMinutes] = useState('15')
  const [energy, setEnergy] = useState<Energy>('medium')
  const [error, setError] = useState('')
  const total = tasks.reduce((sum, task) => sum + task.minutes, 0)
  const save = (next: Task[]) => { setTasks(next); localStorage.setItem('anchor-tasks', JSON.stringify(next)) }
  function addTask() { const result = taskSchema.safeParse({ name, minutes, energy }); if (!result.success) { setError(result.data ? t.validMinutes : (name.trim().length < 2 ? t.validName : t.validMinutes)); return } setError(''); save([...tasks, { id: Date.now(), ...result.data }]); setName('') }
  const energyLabel = (value: Energy) => value === 'low' ? t.low : value === 'high' ? t.high : t.medium
  return <div className="mx-auto max-w-5xl px-5 py-12"><div className="mb-10 max-w-2xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold"><Sparkles size={14} /> {t.app}</div><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.tagline}</h1></div><div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]"><Card><CardHeader><CardTitle>{t.addTitle}</CardTitle><CardDescription>{t.addHelp}</CardDescription></CardHeader><CardContent className="space-y-4"><label className="block text-sm font-medium">{t.taskName}<Input className="mt-2" value={name} onChange={e => setName(e.target.value)} placeholder={t.taskPlaceholder} onKeyDown={e => e.key === 'Enter' && addTask()} /></label><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium">{t.minutes}<Input className="mt-2" type="number" min="5" max="240" value={minutes} onChange={e => setMinutes(e.target.value)} /></label><label className="text-sm font-medium">{t.energy}<select value={energy} onChange={e => setEnergy(e.target.value as Energy)} className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="low">{t.low}</option><option value="medium">{t.medium}</option><option value="high">{t.high}</option></select></label></div>{error && <p className="text-sm text-red-500">{error}</p>}<Button className="w-full" onClick={addTask}>{t.add}</Button></CardContent></Card><Card><CardHeader className="flex-row items-end justify-between"><div><CardTitle>{t.today}</CardTitle><CardDescription>{total} {t.total}</CardDescription></div>{tasks.length > 0 && <Button variant="ghost" size="sm" onClick={() => save([])}>{t.clear}</Button>}</CardHeader><CardContent>{tasks.length === 0 ? <p className="rounded-lg bg-muted p-8 text-center text-sm text-muted-foreground">{t.empty}</p> : <div className="space-y-3">{tasks.map(task => <div key={task.id} className="flex items-center justify-between gap-3 rounded-lg border p-3"><div className="min-w-0"><p className="truncate font-medium">{task.name}</p><div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground"><span>{task.minutes} min</span><Badge className="font-normal">{energyLabel(task.energy)}</Badge></div></div><Button variant="ghost" size="icon" aria-label="Remove" onClick={() => save(tasks.filter(item => item.id !== task.id))}><Trash2 size={16} /></Button></div>)}</div>}<div className="mt-6 rounded-lg bg-secondary p-4 text-sm">{total <= 90 ? t.calm : t.full}. {t.anchorHint}</div></CardContent></Card></div></div>
}