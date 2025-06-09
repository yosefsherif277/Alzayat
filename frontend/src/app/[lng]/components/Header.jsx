
'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useAuthStore } from '../store/useAuthStore'
import { useState } from 'react';

export default function Header({ lng }) {
  const { t, i18n } = useTranslation('common')
  const { authUser, logout } = useAuthStore()
  
  const handleLogout = async () => {
    const confirmLogout = window.confirm(t('logoutConfirm'))
    if (confirmLogout) {
      await logout()
    }
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
  }
  return (
    <div className="w-screen overflow-hidden relative">
      <header className="fixed w-full bg-base-100 shadow-md border-b border-gray-300 z-10">
        <div className="container mx-auto px-4 max-h-20">
          <nav className="flex justify-between items-center py-4">
            <div className="logo-box flex-shrink-0 mr-2.5">
              <Link href="/">
                <img 
                  src='/imgs/logo.ico' 
                  alt={i18n.language === 'ar' ? "شعار المدرسة" : "School icon"} 
                  className="logo-img w-12 h-12" 
                />
              </Link>
            </div>
            <NavUl t={t} lng={lng} authUser={authUser} handleToggleLang={toggleLanguage} handleLogout={handleLogout} />
          </nav>
        </div>
      </header>
      <BurgerNav t={t} lng={lng} authUser={authUser} handleToggleLang={toggleLanguage} handleLogout={handleLogout} />
    </div>
  )
}

function NavUl({ t, lng, authUser, handleToggleLang, handleLogout }) {
  return (
    <ul className="hidden md:flex items-center gap-6">
      <li><Link href="/#home" className="text-primary font-semibold py-1 hover:border-b-[3px] hover:border-secondary">{t('home')}</Link></li>
      <li><Link href="/#about" className="text-primary font-semibold py-1 hover:border-b-[3px] hover:border-secondary">{t('about')}</Link></li>
      <li><Link href="/#skills" className="text-primary font-semibold py-1 hover:border-b-[3px] hover:border-secondary">{t('skills')}</Link></li>
      <li><Link href="/#contactus" className="text-primary font-semibold py-1 hover:border-b-[3px] hover:border-secondary">{t('contactus')}</Link></li>
      {!!authUser ? (
        <button onClick={handleLogout} className="btn btn-ghost text-primary font-semibold">
          {t('logout')}
        </button>
      ) : (
        <>
          <Link href={`/${lng}/login`} className="btn btn-ghost text-primary font-semibold">
            {t('login')}
          </Link>
          <Link href={`/${lng}/register`} className="btn btn-primary text-white font-semibold">
            {t('register')}
          </Link>
        </>
      )}
      <div id="lang" onClick={handleToggleLang} className="cursor-pointer w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full m-1 transition duration-500 hover:scale-125">
        <h3 className="text-sm font-bold">{t('lang')}</h3>
      </div>
    </ul>
  )
}

function BurgerNav({ t, lng, authUser, handleToggleLang, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return (
    <div className="md:hidden fixed top-0 right-0 z-50 dir-ltr">
      <button
        id="burgerBtn"
        className="btn btn-ghost absolute top-5 right-5 z-[1001]"
        onClick={toggleIsOpen}
      >
        <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[5px]' : 'mb-1.5'}`}></span>
        <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'mb-1.5'}`}></span>
        <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
      </button>
      <div
        className={`burger-nav fixed top-0 right-0 w-[300px] h-screen bg-base-100 shadow-lg z-[1000] p-8 pt-20 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className={`flex flex-col justify-start space-y-4 transition-opacity duration-150 ease-in-out ${isOpen ? 'opacity-100 delay-150' : 'opacity-0'}`}>
          <li>
              <Link href="#home" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-black/10 text-primary">
                <img src='/icons/house-solid.svg' alt="Home Icon" className="w-6 h-6" /> {t('home')}
              </Link>
            </li>
            <li>
              <Link href="#about" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-black/10 text-primary">
                <img src='/icons/address-card-solid.svg' alt="About Icon" className="w-6 h-6" /> {t('about')}
              </Link>
            </li>
            <li>
              <Link href="#skills" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-black/10 text-primary">
                <img src='/icons/brain-solid.svg' alt="Skills Icon" className="w-6 h-6" /> {t('skills')}
              </Link>
            </li>
            <li>
              <Link href="#contactus" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-black/10 text-primary">
                <img src='/icons/users-solid.svg' alt="Contact Icon" className="w-6 h-6" /> {t('contactus')}
              </Link>
            </li>
            {!!authUser ? (
              <li>
                <button onClick={handleLogout} className="btn btn-ghost w-full justify-start p-2.5 text-primary">{t('logout')}</button>
              </li>
            ) : (
              <>
                <li>
                  <Link href={`/${lng}/login`} className="btn btn-ghost w-full justify-start p-2.5 text-primary">{t('login')}</Link>
                </li>
                <li>
                  <Link href={`/${lng}/register`} className="btn btn-primary w-full justify-start p-2.5">{t('register')}</Link>
                </li>
              </>
            )}
            <div id="lang" onClick={handleToggleLang} className="cursor-pointer p-2.5 m-auto mt-5 w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full transition duration-500 hover:scale-110 scale-125">
              <h3 className="text-lg font-bold">{t('lang')}</h3>
            </div>
          </ul>
        </div>
      )}
    </div>
  )
}