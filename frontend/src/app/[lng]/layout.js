import { languages } from './i18n/index'
import Header from './components/Header'
import Footer from './components/Footer'
import './globals.css'

export const metadata = {
  title: "DR.Mohammed Hasan Alzayat",
  description: `Our school is a school for basic education (kindergarten, primary, and preparatory), It is named after the pride of Damietta, Dr. Mohamed 
    Hassan Al-Zayat. From 1997, The students of this school have excelled in various fields, competing with many 
   schools at the governorate level and even at the national level! درستنا هي مدرسة للتعليم الأساسي (رياض أطفال ، ابتدائية ، إعدادية) ، سميت على اسم فخر دمياط
   ، د. محمد حسن الزيات. منذ عام 1997 ، برع طلاب هذه المدرسة في مختلف المجالات ، 
  وتنافسوا مع العديد من المدارس على مستوى المحافظة وحتى على المستوى الوطني!`,
  icons: {
    icon: '/imgs/logo.ico',
  },
};
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={lng === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <Header lng={lng} />
        {children}
        <Footer lng={lng} />
      </body>
    </html>
  )
}