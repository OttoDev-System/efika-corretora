import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react'

const Footer = () => {
  const produtosLinks = [
    { nome: "Planos de Saúde Individual", href: "#planos" },
    { nome: "Planos de Saúde Coletivo", href: "#planos" },
    { nome: "Seguro Auto", href: "#seguros" },
    { nome: "Seguro Residencial", href: "#seguros" },
    { nome: "Seguro Vida", href: "#seguros" },
    { nome: "Seguros Empresariais", href: "#empresarial" },
    { nome: "Consórcio", href: "#consorcio" }
  ]

  const institucionaisLinks = [
    { nome: "Sobre Nós", href: "#sobre" },
    { nome: "Como Funciona", href: "#como-funciona" },
    { nome: "Seguradoras Parceiras", href: "#parceiros" },
    { nome: "Certificações", href: "#certificacoes" },
    { nome: "Blog", href: "#blog" },
    { nome: "Trabalhe Conosco", href: "#carreiras" },
    { nome: "Política de Privacidade", href: "#privacidade" }
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/efikacorretora", nome: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/efikacorretora", nome: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com/company/efikacorretora", nome: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@efikacorretora", nome: "YouTube" }
  ]

  return (
    <footer className="bg-efika-navy text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16">
        
        {/* Grid Principal */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Coluna 1 - Institucional */}
          <div className="md:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              <div className="h-10 w-32 bg-white rounded flex items-center justify-center mb-4">
                <span className="text-efika-navy font-bold text-xl font-inter">EFIKA</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed font-inter">
                A corretora que cuida do que importa. Proteção completa para você e sua família em todo o Brasil.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4 font-inter">Siga-nos</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      aria-label={social.nome}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Coluna 2 - Produtos */}
          <div>
            <h4 className="font-semibold mb-6 font-inter text-lg">Nossos Produtos</h4>
            <ul className="space-y-3">
              {produtosLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-inter"
                  >
                    {link.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Institucional */}
          <div>
            <h4 className="font-semibold mb-6 font-inter text-lg">A Efika</h4>
            <ul className="space-y-3">
              {institucionaisLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-inter"
                  >
                    {link.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h4 className="font-semibold mb-6 font-inter text-lg">Fale Conosco</h4>
            <div className="space-y-4">
              
              {/* Telefone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+551140000000" className="text-white hover:text-yellow-300 transition-colors font-inter">
                    (11) 4000-0000
                  </a>
                  <div className="text-xs text-gray-300 font-inter">Ligação gratuita</div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0 text-center">📱</div>
                <div>
                  <a href="https://wa.me/5511999999999" className="text-white hover:text-yellow-300 transition-colors font-inter">
                    (11) 99999-9999
                  </a>
                  <div className="text-xs text-gray-300 font-inter">WhatsApp</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:contato@efikacorretora.com.br" className="text-white hover:text-yellow-300 transition-colors font-inter">
                    contato@efikacorretora.com.br
                  </a>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-inter">São Paulo, SP</div>
                  <div className="text-xs text-gray-300 font-inter">Atendimento Nacional</div>
                </div>
              </div>

              {/* Horário */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-inter text-sm">Seg-Sex: 8h às 18h</div>
                  <div className="text-white font-inter text-sm">Sáb: 8h às 12h</div>
                  <div className="text-xs text-gray-300 font-inter">Suporte 24h via WhatsApp</div>
                </div>
              </div>
            </div>

            {/* Botão CTA no Footer */}
            <div className="mt-6">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 w-full font-inter">
                Solicitar Cotação
              </button>
            </div>
          </div>
        </div>

        {/* Barra Copyright */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-300 font-inter">
              © 2025 Efika Corretora. Todos os direitos reservados.
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#termos" className="text-gray-300 hover:text-white transition-colors font-inter">
                Termos de Uso
              </a>
              <span className="text-gray-500">|</span>
              <a href="#privacidade" className="text-gray-300 hover:text-white transition-colors font-inter">
                Política de Privacidade
              </a>
              <span className="text-gray-500">|</span>
              <a href="#cookies" className="text-gray-300 hover:text-white transition-colors font-inter">
                Cookies
              </a>
            </div>
          </div>

          {/* Informações Regulatórias */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center font-inter leading-relaxed">
              <p className="mb-2">
                Efika Corretora de Seguros - CNPJ: XX.XXX.XXX/XXXX-XX | SUSEP: XXXXXXX.X.XX.XXXX
              </p>
              <p>
                As informações contidas neste site são de caráter informativo e não constituem proposta de seguro. 
                Os produtos de seguro são comercializados por corretores autorizados pela SUSEP. 
                Consulte sempre as condições gerais das apólices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer