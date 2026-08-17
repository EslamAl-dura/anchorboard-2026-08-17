import { Link } from '@tanstack/react-router'
import { ArrowLeft, Capture, BatteryMedium, Layers3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useI18n } from '../contexts/i18n'

export function GuidePage() {
  const { t } = useI18n()
  const steps = [{ icon: Capture, title: t.guideOne, text: t.guideOneText }, { icon: BatteryMedium, title: t.guideTwo, text: t.guideTwoText }, { icon: Layers3, title: t.guideThree, text: t.guideThreeText }]
  return <div className="mx-auto max-w-3xl px-5 py-16"><Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> {t.back}</Link><h1 className="mb-10 text-4xl font-bold tracking-tight">{t.guideTitle}</h1><div className="space-y-4">{steps.map(({ icon: Icon, title, text }, index) => <Card key={title}><CardHeader><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-bold">{index + 1}</div><CardTitle className="flex items-center gap-2"><Icon size={19} className="text-primary" />{title}</CardTitle></div></CardHeader><CardContent className="text-muted-foreground">{text}</CardContent></Card>)}</div></div>
}