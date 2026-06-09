/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  company?: string
  category?: string
  message?: string
  submittedAt?: string
}

const CATEGORY_LABELS: Record<string, string> = {
  food_supplements: 'المنتجات الغذائية والمكملات',
  medical_devices: 'الأجهزة الطبية',
  pharmaceuticals: 'المنتجات الصيدلانية',
  cosmetics: 'مستحضرات التجميل',
  other: 'أخرى',
}

const Email = ({
  name = '—',
  email = '—',
  phone,
  company,
  category,
  message = '—',
  submittedAt,
}: Props) => {
  const categoryLabel = category ? CATEGORY_LABELS[category] || category : null
  return (
    <Html lang="ar" dir="rtl">
      <Head />
      <Preview>طلب استشارة جديد من {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>طلب استشارة جديد</Heading>
            <Text style={subtitle}>وصلك طلب جديد عبر فورم الموقع</Text>
          </Section>

          <Section style={card}>
            <Row label="الاسم" value={name} />
            <Row label="البريد الإلكتروني" value={email} dir="ltr" />
            {phone ? <Row label="رقم الجوال" value={phone} dir="ltr" /> : null}
            {company ? <Row label="الشركة" value={company} /> : null}
            {categoryLabel ? <Row label="فئة المنتج" value={categoryLabel} /> : null}
            {submittedAt ? <Row label="وقت الإرسال" value={submittedAt} dir="ltr" /> : null}
          </Section>

          <Section style={messageBox}>
            <Text style={messageLabel}>تفاصيل الطلب</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            تم إرسال هذه الرسالة تلقائياً من موقع بيولانس — biolance.sa
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const Row = ({ label, value, dir }: { label: string; value: string; dir?: 'ltr' | 'rtl' }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px' }}>
    <tbody>
      <tr>
        <td style={rowLabel}>{label}</td>
        <td style={{ ...rowValue, direction: dir || 'rtl', textAlign: dir === 'ltr' ? 'left' : 'right' }}>
          {value}
        </td>
      </tr>
    </tbody>
  </table>
)

export const template = {
  component: Email,
  subject: (d: Record<string, unknown>) => `طلب استشارة جديد — ${(d.name as string) || 'عميل'}`,
  displayName: 'إشعار طلب استشارة',
  to: 'info@biolance.sa',
  previewData: {
    name: 'محمد العتيبي',
    email: 'mohammed@example.com',
    phone: '+966500000000',
    company: 'شركة المثال',
    category: 'food_supplements',
    message: 'أرغب في تسجيل منتج مكمل غذائي جديد لدى هيئة الغذاء والدواء.',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Tahoma, Arial, sans-serif',
  margin: 0,
  padding: '24px 0',
}
const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '0 16px',
}
const header = { padding: '24px 0 8px' }
const h1 = {
  color: 'hsl(163, 47%, 14%)',
  fontSize: '24px',
  fontWeight: 700,
  margin: '0 0 8px',
}
const subtitle = {
  color: '#55575d',
  fontSize: '14px',
  margin: 0,
}
const card = {
  backgroundColor: '#f7faf8',
  border: '1px solid #e3ece7',
  borderRadius: '10px',
  padding: '20px',
  margin: '16px 0',
}
const rowLabel = {
  color: '#55575d',
  fontSize: '13px',
  padding: '6px 0',
  width: '35%',
  verticalAlign: 'top',
}
const rowValue = {
  color: 'hsl(163, 47%, 14%)',
  fontSize: '14px',
  fontWeight: 600,
  padding: '6px 0',
}
const messageBox = {
  backgroundColor: 'hsl(80, 100%, 96%)',
  border: '1px solid hsl(80, 100%, 81%)',
  borderRadius: '10px',
  padding: '16px 20px',
  margin: '0 0 20px',
}
const messageLabel = {
  color: '#55575d',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 8px',
}
const messageText = {
  color: 'hsl(163, 47%, 14%)',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: 0,
  whiteSpace: 'pre-wrap' as const,
}
const hr = { borderColor: '#e3ece7', margin: '24px 0 12px' }
const footer = {
  color: '#888',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: 0,
}
