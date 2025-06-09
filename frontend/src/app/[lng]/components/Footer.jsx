'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="aboutus">
            <h3 className="text-xl font-bold mb-4">{t('aboutUs')}</h3>
            <p>{t('schoolDescription')}</p>
          </div>
          <div className="quicklinks">
            <h3 className="text-xl font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/#home" className="hover:text-primary">{t('home')}</Link></li>
              <li><Link href="/#about" className="hover:text-primary">{t('about')}</Link></li>
              <li><Link href="/#skills" className="hover:text-primary">{t('skills')}</Link></li>
              <li><Link href="/#contactus" className="hover:text-primary">{t('contactus')}</Link></li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/share/g/194v4Ry7qw/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook-brands.svg" alt="FaceBook" className="w-6 h-6" />
              </a>
              <a href="https://maps.app.goo.gl/isxUtNNcwRhijkTa6" target="_blank" rel="noopener noreferrer">
                <img src="/icons/location-dot-solid.svg" alt="School location" className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="contactwithus">
            <h3 className="text-xl font-bold mb-4">{t('contactus')}</h3>
            <p><b>{t('phone')}: 01008118416</b></p>
            <p><b>{t('email')}: Moh.moussa.74@gmail.com</b></p>
          </div>
        </div>
        <div className="border-t border-base-300 mt-8 pt-4 text-center">
          <h5>
            © 2025 | {t('allRightsReserved')} | {t('createdBy')}:{' '}
            <span className="font-bold underline italic" title={`${t('phone')}: 01067370955, ${t('email')}: yasherif92@gmail.com`}>
              {`"${t('programmer')}"`}
            </span>
          </h5>
        </div>
      </div>
    </footer>
  )
}