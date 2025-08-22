import { Clock, Lightbulb, DollarSign, Zap } from 'lucide-react'

const DiferenciaisSection = () => {
  const diferenciais = [
    {
      icon: Clock,
      titulo: "Atendimento humanizado 24/7",
      descricao: "Suporte completo todos os dias da semana, com pessoas reais",
      cor: "from-blue-50 to-indigo-100"
    },
    {
      icon: Lightbulb,
      titulo: "Consultoria gratuita personalizada",
      descricao: "Analisamos seu perfil e encontramos a melhor proteção",
      cor: "from-green-50 to-emerald-100"
    },
    {
      icon: DollarSign,
      titulo: "Sem taxa de corretagem oculta",
      descricao: "Transparência total. Você paga o mesmo valor das seguradoras",
      cor: "from-purple-50 to-violet-100"
    },
    {
      icon: Zap,
      titulo: "Aprovação em até 24h",
      descricao: "Processo otimizado para você ter proteção rapidamente",
      cor: "from-yellow-50 to-orange-100"
    }
  ]

  return (
    <section id="diferenciais" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12 md:mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-efika-navy mb-4 font-inter">
            Por que escolher a <span className="text-efika-navy">Efika Corretora</span>?
          </h2>
          <p className="text-xl text-efika-silver-dark max-w-3xl mx-auto font-inter">
            Somos especialistas em encontrar a proteção ideal para cada necessidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {diferenciais.map((diferencial, index) => {
            const IconComponent = diferencial.icon
            
            return (
              <div 
                key={index}
                className={`efika-card bg-gradient-to-br ${diferencial.cor} hover:scale-105 transform transition-all duration-300 text-center`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-efika-navy rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-efika-navy mb-3 font-inter">
                  {diferencial.titulo}
                </h3>
                
                <p className="text-efika-silver-dark font-inter leading-relaxed">
                  {diferencial.descricao}
                </p>
              </div>
            )
          })}
        </div>

        {/* Seção de Credibilidade Rápida */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-efika-navy mb-6 font-inter">
              Mais de uma década protegendo famílias brasileiras
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-efika-navy font-inter">12+</div>
                <div className="text-sm text-efika-silver-dark font-inter">Anos de mercado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-efika-navy font-inter">15k+</div>
                <div className="text-sm text-efika-silver-dark font-inter">Clientes atendidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-efika-navy font-inter">50+</div>
                <div className="text-sm text-efika-silver-dark font-inter">Seguradoras parceiras</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-efika-navy font-inter">98%</div>
                <div className="text-sm text-efika-silver-dark font-inter">Taxa de satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiferenciaisSection