import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle, Shield, Clock, Users } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const HeroSection = () => {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    interesse: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const interesses = [
    { value: 'plano-saude-individual', label: 'Plano de Saúde Individual' },
    { value: 'plano-saude-coletivo', label: 'Plano de Saúde Coletivo (2+ vidas)' },
    { value: 'seguro-auto', label: 'Seguro Auto' },
    { value: 'seguro-vida', label: 'Seguro Vida' },
    { value: 'seguro-residencial', label: 'Seguro Residencial' },
    { value: 'seguro-empresarial', label: 'Seguro Empresarial' },
    { value: 'consorcio', label: 'Consórcio' }
  ]

  const formatWhatsApp = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 11) {
      return cleaned.replace(/(\d{2})(\d{0,5})(\d{0,4})/, (match, p1, p2, p3) => {
        if (p3) return `(${p1}) ${p2}-${p3}`
        if (p2) return `(${p1}) ${p2}`
        if (p1) return `(${p1}`
        return match
      })
    }
    return value
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value)
    setFormData(prev => ({ ...prev, whatsapp: formatted }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validações
    if (formData.nome.length < 3) {
      toast({
        variant: "destructive",
        title: "Erro no formulário",
        description: "Nome deve ter pelo menos 3 caracteres."
      })
      setIsLoading(false)
      return
    }

    if (!formData.whatsapp.match(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)) {
      toast({
        variant: "destructive",
        title: "Erro no formulário",
        description: "Digite um WhatsApp válido."
      })
      setIsLoading(false)
      return
    }

    if (!formData.interesse) {
      toast({
        variant: "destructive",
        title: "Erro no formulário",
        description: "Selecione seu interesse."
      })
      setIsLoading(false)
      return
    }

    // Simulação de envio
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Cotação solicitada com sucesso!",
      description: "Em breve nossa equipe entrará em contato pelo WhatsApp."
    })

    console.log('Lead capturado:', { ...formData, source: 'hero', timestamp: new Date().toISOString() })
    
    setFormData({ nome: '', whatsapp: '', interesse: '' })
    setIsLoading(false)
  }

  return (
    <section className="hero-gradient min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Lado Esquerdo - Conteúdo Principal */}
          <div className="text-white slide-in-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter mb-6 leading-tight">
              A corretora que cuida do que <span className="text-yellow-300">importa</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed font-inter">
              Proteção completa para você e sua família em todo o Brasil
            </p>

            {/* Diferenciais Badges */}
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-inter flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Mais de 50 seguradoras parceiras
              </div>
              <div className="bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-inter flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Aprovação em até 24h
              </div>
              <div className="bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-inter flex items-center gap-2">
                <Users className="w-4 h-4" />
                Atendimento humanizado 24/7
              </div>
            </div>

            {/* Números de Credibilidade */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 font-inter">15.000+</div>
                <div className="text-sm text-gray-300 font-inter">Famílias protegidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 font-inter">50+</div>
                <div className="text-sm text-gray-300 font-inter">Seguradoras parceiras</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 font-inter">98%</div>
                <div className="text-sm text-gray-300 font-inter">Satisfação</div>
              </div>
            </div>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="slide-in-right">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto">
              <div className="text-center mb-6">
                <Shield className="w-12 h-12 text-efika-navy mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-efika-navy font-inter">
                  RECEBA SUA COTAÇÃO GRATUITA
                </h2>
                <p className="text-efika-silver-dark text-sm mt-2 font-inter">
                  Preencha seus dados e receba as melhores ofertas
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-efika-navy focus:border-transparent font-inter"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={handleWhatsAppChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-efika-navy focus:border-transparent font-inter"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Select 
                    value={formData.interesse} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, interesse: value }))}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-efika-navy focus:border-transparent font-inter">
                      <SelectValue placeholder="Selecione seu interesse" />
                    </SelectTrigger>
                    <SelectContent>
                      {interesses.map((item) => (
                        <SelectItem key={item.value} value={item.value} className="font-inter">
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-inter disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </div>
                  ) : (
                    'QUERO MINHA COTAÇÃO GRATUITA'
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4 font-inter">
                  🔒 Seus dados estão seguros. Não fazemos spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection