import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Planos de Saúde', href: '#planos' },
    { name: 'Seguros', href: '#seguros' },
    { name: 'Consórcios', href: '#consorcios' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contato', href: '#contato' },
  ]

  return (
    <header className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="h-8 md:h-10 w-32 md:w-40 bg-efika-navy rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl font-inter">EFIKA</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-efika-navy font-inter font-medium transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white font-inter font-medium"
            >
              <Phone className="w-4 h-4 mr-2" />
              (11) 4000-0000
            </Button>
            <Button className="bg-efika-navy text-white hover:bg-efika-navy-dark font-inter font-medium">
              Cotação Gratuita
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-efika-navy font-inter font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-efika-navy text-white hover:bg-efika-navy-dark font-inter font-medium w-full mt-4">
                Cotação Gratuita
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header