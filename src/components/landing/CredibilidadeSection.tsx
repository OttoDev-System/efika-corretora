import { Star, Award, Shield, Users } from 'lucide-react'

const CredibilidadeSection = () => {
  const estatisticas = [
    {
      icon: Users,
      numero: "15.000+",
      descricao: "Famílias e empresas protegidas",
      cor: "blue"
    },
    {
      icon: Award,
      numero: "50+",
      descricao: "Das maiores seguradoras do país",
      cor: "green"
    },
    {
      icon: Shield,
      numero: "12+",
      descricao: "Anos de experiência e confiança",
      cor: "purple"
    },
    {
      icon: Star,
      numero: "98%",
      descricao: "Clientes recomendam nossos serviços",
      cor: "yellow"
    }
  ]

  const seguradoras = [
    { nome: "SulAmérica", logo: "🏢" },
    { nome: "Bradesco", logo: "🏪" },
    { nome: "Porto Seguro", logo: "⚓" },
    { nome: "Allianz", logo: "🅰️" },
    { nome: "Zurich", logo: "🇨🇭" },
    { nome: "HDI", logo: "🏭" },
    { nome: "Liberty", logo: "🗽" },
    { nome: "Tokio Marine", logo: "🌊" },
    { nome: "Mapfre", logo: "🌍" },
    { nome: "Unimed", logo: "🏥" },
    { nome: "Amil", logo: "💚" },
    { nome: "Hapvida", logo: "❤️" }
  ]

  const depoimentos = [
    {
      nome: "Maria Silva",
      local: "São Paulo, SP",
      foto: "👩‍💼",
      texto: "Processo super fácil. Em 2 dias já estava com meu plano de saúde aprovado!",
      rating: 5
    },
    {
      nome: "João Santos",
      local: "Rio de Janeiro, RJ", 
      foto: "👨‍💻",
      texto: "Melhor atendimento que já tive. Economizei R$ 200/mês no meu seguro auto.",
      rating: 5
    },
    {
      nome: "Ana Costa",
      local: "Belo Horizonte, MG",
      foto: "👩‍🎓",
      texto: "Profissionais muito competentes. Indicarei para todos meus conhecidos.",
      rating: 5
    }
  ]

  const certificacoes = [
    { nome: "SUSEP", descricao: "Superintendência de Seguros Privados", icone: "🛡️" },
    { nome: "ANS", descricao: "Agência Nacional de Saúde Suplementar", icone: "🏥" },
    { nome: "Empresa Idônea", descricao: "Certificado de Idoneidade", icone: "✅" },
    { nome: "ISO 9001", descricao: "Qualidade Certificada", icone: "🏆" }
  ]

  return (
    <section id="credibilidade" className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-efika-navy mb-4 font-inter">
            Confiança que se comprova com <span className="text-efika-navy">resultados</span>
          </h2>
          <p className="text-xl text-efika-silver-dark max-w-3xl mx-auto font-inter">
            Mais de uma década protegendo famílias e empresas em todo o Brasil
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Lado Esquerdo - Números e Certificações */}
          <div className="slide-in-left">
            
            {/* Estatísticas em Grid 2x2 */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {estatisticas.map((stat, index) => {
                const IconComponent = stat.icon
                
                return (
                  <div
                    key={index}
                    className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-efika-navy`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-efika-navy font-inter mb-2">
                      {stat.numero}
                    </div>
                    <div className="text-efika-silver-dark text-sm font-inter leading-tight">
                      {stat.descricao}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Certificações */}
            <div className="bg-efika-navy/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-efika-navy mb-6 text-center font-inter">
                Certificações e Regulamentações
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {certificacoes.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-2xl">{cert.icone}</span>
                    <div>
                      <div className="font-semibold text-efika-navy text-sm font-inter">{cert.nome}</div>
                      <div className="text-xs text-efika-silver-dark font-inter">{cert.descricao}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lado Direito - Logos Parceiros */}
          <div className="slide-in-right">
            <h3 className="text-2xl font-bold text-efika-navy text-center mb-8 font-inter">
              Principais Seguradoras Parceiras
            </h3>
            
            {/* Grid de Seguradoras */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {seguradoras.map((seguradora, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl mb-2">{seguradora.logo}</div>
                  <div className="text-xs text-efika-silver-dark font-inter font-semibold">
                    {seguradora.nome}
                  </div>
                </div>
              ))}
            </div>

            {/* Selo de Qualidade */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-xl text-center">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-green-800 mb-2 font-inter">
                Parceiro Oficial
              </h4>
              <p className="text-green-700 text-sm font-inter">
                Credenciado pelas principais seguradoras do mercado brasileiro
              </p>
            </div>
          </div>
        </div>

        {/* Testemunhos de Clientes */}
        <div className="fade-in">
          <h3 className="text-3xl font-bold text-efika-navy text-center mb-12 font-inter">
            O que nossos clientes dizem sobre nós
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {depoimentos.map((depoimento, index) => (
              <div
                key={index}
                className="efika-card text-center hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Foto do Cliente */}
                <div className="text-5xl mb-4">{depoimento.foto}</div>
                
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(depoimento.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Depoimento */}
                <p className="text-efika-silver-dark italic mb-6 font-inter leading-relaxed">
                  "{depoimento.texto}"
                </p>
                
                {/* Dados do Cliente */}
                <div>
                  <div className="font-bold text-efika-navy font-inter">{depoimento.nome}</div>
                  <div className="text-sm text-efika-silver-dark font-inter">{depoimento.local}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Final */}
        <div className="mt-16 text-center bg-efika-navy rounded-2xl p-8 md:p-12 text-white">
          <Shield className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-inter">
            Junte-se a milhares de clientes satisfeitos
          </h3>
          <p className="text-xl text-gray-200 mb-8 font-inter">
            Solicite sua cotação gratuita e descubra por que somos a corretora mais recomendada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 font-inter">
              SOLICITAR COTAÇÃO GRATUITA
            </button>
            <button className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 font-inter">
              FALAR NO WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CredibilidadeSection