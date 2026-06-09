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
}

const Email = ({ name }: Props) => (
  <Html lang="ar" dir="rtl">
    <Head />
    <Preview>استلمنا طلبك — فريق بيولانس سيتواصل معك خلال 24 ساعة</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar}>
          <Heading style={brandText}>بيولانس</Heading>
        </Section>

        <Section style={hero}>
          <Heading style={h1}>شكراً لتواصلك معنا{name ? `، ${name}` : ''} 🌿</Heading>
          <Text style={lead}>
            استلمنا طلب الاستشارة بنجاح، وسيقوم أحد خبرائنا التنظيميين بالرد عليك خلال
            <strong> 24 ساعة عمل</strong>.
          </Text>
        </Section>

        <Section style={card}>
          <Text style={cardTitle}>ما هي الخطوة التالية؟</Text>
          <Text style={cardText}>
            • سيراجع فريقنا التنظيمي تفاصيل طلبك ومتطلبات منتجك<br />
            • سنرسل لك خطة تسجيل أولية مع التكلفة والمدة المتوقعة<br />
            • ستحصل على استشارة مجانية لمدة 30 دقيقة لمناقشة التفاصيل
          </Text>
        </Section>

        <Section style={infoBox}>
          <Text style={infoText}>
            في حال كان طلبك عاجلاً، يمكنك مراسلتنا مباشرة على{' '}
            <a href="mailto:info@biolance.sa" style={link}>info@biolance.sa</a>
          </Text>
        </Section>

        <Hr style={hr} />
        <Text style={signature}>
          مع تحيات،<br />
          <strong>فريق بيولانس</strong><br />
          <span style={{ color: '#888', fontSize: '12px' }}>
            دليلك الذكي للتسجيل لدى هيئة الغذاء والدواء
          </span>
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'استلمنا طلبك — بيولانس',
  displayName: 'تأكيد استلام طلب الاستشارة',
  previewData: { name: 'محمد' },
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
const brandBar = {
  backgroundColor: 'hsl(163, 47%, 14%)',
  borderRadius: '10px',
  padding: '18px 24px',
  textAlign: 'center' as const,
  marginBottom: '24px',
}
const brandText = {
  color: 'hsl(80, 100%, 81%)',
  fontSize: '22px',
  fontWeight: 700,
  margin: 0,
  letterSpacing: '1px',
}
const hero = { padding: '0 8px 16px' }
const h1 = {
  color: 'hsl(163, 47%, 14%)',
  fontSize: '22px',
  fontWeight: 700,
  margin: '0 0 12px',
  lineHeight: '1.4',
}
const lead = {
  color: '#3a3d44',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: 0,
}
const card = {
  backgroundColor: 'hsl(80, 100%, 96%)',
  border: '1px solid hsl(80, 100%, 81%)',
  borderRadius: '10px',
  padding: '18px 22px',
  margin: '16px 0',
}
const cardTitle = {
  color: 'hsl(163, 47%, 14%)',
  fontSize: '15px',
  fontWeight: 700,
  margin: '0 0 8px',
}
const cardText = {
  color: '#3a3d44',
  fontSize: '14px',
  lineHeight: '1.9',
  margin: 0,
}
const infoBox = {
  backgroundColor: '#f7faf8',
  border: '1px solid #e3ece7',
  borderRadius: '10px',
  padding: '14px 20px',
  margin: '16px 0',
}
const infoText = {
  color: '#3a3d44',
  fontSize: '14px',
  margin: 0,
  lineHeight: '1.7',
}
const link = {
  color: 'hsl(163, 47%, 28%)',
  textDecoration: 'underline',
  fontWeight: 600,
}
const hr = { borderColor: '#e3ece7', margin: '24px 0 16px' }
const signature = {
  color: '#3a3d44',
  fontSize: '14px',
  lineHeight: '1.7',
  margin: 0,
  textAlign: 'center' as const,
}
