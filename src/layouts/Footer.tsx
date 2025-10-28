import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import logo from '@/assets/cinema-logo.svg'

const Footer = () => {
  return (
    <footer className="bg-bg-dark border-t border-border text-text-secondary">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <div className='flex items-center gap-4 mb-3'>
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-bold shadow-sm">
              <img src={logo} className="p-1" alt="" />
            </div>
            <h2 className="text-2xl font-semibold text-text-primary">
              CINEMA<span className="text-accent">BOOK</span>
            </h2>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">
            Enjoy the best premieres, promotions and comfortable viewing in our cinema. Choose a
            seat, buy tickets online - and enter the world of cinema.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:items-center">
          <h3 className="text-lg font-semibold text-text-primary mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-accent transition-colors">
                Movies
              </a>
            </li>
            <li>
              <a href="/schedule" className="hover:text-accent transition-colors">
                Schedule
              </a>
            </li>
            <li>
              <a href="/contacts" className="hover:text-accent transition-colors">
                Contacts
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col md:items-end">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">We are on social media</h3>
            <div className="flex justify-between w-full mb-4">
              <a href="#" className="hover:text-accent transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          <p className="text-sm text-text-secondary">
            📞 +38 (050) 123 45 67
            <br /> ✉️ info@cinemabook.ua
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border text-center py-4 text-xs text-textMuted">
        © {new Date().getFullYear()} CinemaBook. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
