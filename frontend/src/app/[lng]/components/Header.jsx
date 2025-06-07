
'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useAuthStore } from '../store/useAuthStore'

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
    <div className="header-container">
      <header className="bg-base-100 shadow-md">
        <div className="navbar container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <div className="logo-box">
              <Link href="/">
                <img 
                  src='/imgs/logo.ico' 
                  alt={i18n.language === 'ar' ? "شعار المدرسة" : "School icon"} 
                  className="logo-img w-12 h-12" 
                />
              </Link>
            </div>
            <NavUl t={t} handleToggleLang={toggleLanguage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          </nav>
        </div>
      </header>
      <BurgerNav t={t} handleToggleLang={toggleLanguage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </div>
  )
}

function NavUl({ t, handleToggleLang, isLoggedIn, handleLogout }) {
  return (
    <ul className="hidden md:flex items-center gap-6">
      <li><Link href="/#home" className="hover:text-primary">{t('home')}</Link></li>
      <li><Link href="/#about" className="hover:text-primary">{t('about')}</Link></li>
      <li><Link href="/#skills" className="hover:text-primary">{t('skills')}</Link></li>
      <li><Link href="/#contactus" className="hover:text-primary">{t('contactus')}</Link></li>
      {authUser ? (
        <button onClick={handleLogout} className="btn btn-ghost">
          {t('logout')}
        </button>
      ) : (
        <>
          <Link href={`/${lng}/login`} className="btn btn-ghost">
            {t('login')}
          </Link>
          <Link href={`/${lng}/register`} className="btn btn-primary">
            {t('register')}
          </Link>
        </>
      )}
      <div id="lang" onClick={handleToggleLang} className="cursor-pointer">
        <h3 className="text-lg font-bold">{t('lang')}</h3>
      </div>
    </ul>
  )
}

function BurgerNav({ t, handleToggleLang, isLoggedIn, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return (
    <div className="md:hidden burger">
      <button
        id="burgerBtn"
        className={`btn btn-ghost ${isOpen ? "open checked" : "closed"}`}
        onClick={toggleIsOpen}
      >
        <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
        <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
        <span className="block w-6 h-0.5 bg-current"></span>
      </button>
      {isOpen && (
        <div className="burger-nav absolute top-16 left-0 right-0 bg-base-100 shadow-lg z-50">
          <ul className="p-4 space-y-4">
            <li>
              <Link href="#home" className="flex items-center gap-2">
                <img src='/icons/house-solid.svg' alt="Home Icon" className="w-4 h-4" /> {t('home')}
              </Link>
            </li>
            <li>
              <Link href="#about" className="flex items-center gap-2">
                <img src='/icons/address-card-solid.svg' alt="About Icon" className="w-4 h-4" /> {t('about')}
              </Link>
            </li>
            <li>
              <Link href="#skills" className="flex items-center gap-2">
                <img src='/icons/brain-solid.svg' alt="Skills Icon" className="w-4 h-4" /> {t('skills')}
              </Link>
            </li>
            <li>
              <Link href="#contactus" className="flex items-center gap-2">
                <img src='/icons/users-solid.svg' alt="Contact Icon" className="w-4 h-4" /> {t('contactus')}
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="btn btn-ghost w-full justify-start">{t('logout')}</button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login" className="btn btn-ghost w-full justify-start">{t('login')}</Link>
                </li>
                <li>
                  <Link href="/register" className="btn btn-primary w-full justify-start">{t('register')}</Link>
                </li>
              </>
            )}
            <div id="lang" onClick={handleToggleLang} className="cursor-pointer pt-2">
              <h3 className="text-lg font-bold">{t('lang')}</h3>
            </div>
          </ul>
        </div>
      )}
    </div>
  )
}