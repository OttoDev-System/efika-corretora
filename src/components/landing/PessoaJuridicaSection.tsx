import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building, Users, Shield, Calendar } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const PessoaJuridicaSection = () => {
  const [simuladorData, setSimuladorData] = useState({
    funcionarios: '',
    faixaEtaria: '',
    ramoAtividade: ''
  })
  
  const { toast } = useToast()

  const produtos = [
    {
      icon: Building,
      titulo: "Seguros Empresariais Completos",
      descricao: "Responsabilidade civil, equipamentos, incêndio e mais",
      features: [
        "Cobertura patrimonial",
        "Responsabilidade civil",
        "Lucros cessantes",
        "Equipamentos eletrônicos"
      ],
      cor: "from-blue-50 to-indigo-100",
      ctaTexto: "Saiba Mais",
      ctaVariant: "outline" as const
    },
    {
      icon: Users,
      titulo: "Planos Coletivos a partir de 2 vidas",
      descricao: "Melhores condições para sua equipe",
      features: [
        "Desconto por adesão",
        "Sem carência",
        "Rede nacional",
        "Gestão simplificada"
      ],
      cor: "from-green-50 to-emerald-100",
      ctaTexto: "Cotar Agora",
      ctaVariant: "default" as const
    },
    {
      icon: Shield,
      titulo: "Consultoria Gratuita de Riscos",
      descricao: "Análise completa dos riscos do seu negócio",
      features: [
        "Análise de exposições",
        "Recomendações personalizadas",
        "Acompanhamento contínuo",
        "Gestão de apólices"
      ],
      cor: "from-purple-50 to-violet-100",
      ctaTexto: "Agendar",
      ctaVariant: "outline" as const
    }
  ]

  const handleSimularColetivo = () => {
    if (!simuladorData.funcionarios || !simuladorData.faixaEtaria || !simuladorData.ramoAtividade) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para simular."
      })
      return
    }

    toast({
      title: "Simulação enviada!",
      description: "Nossa equipe comercial entrará em contato em até 2 horas úteis."
    })

    console.log('Simulação PJ:', {
      ...simuladorData,
      timestamp: new Date().toISOString(),
      source: 'pessoa-juridica'
    })

    setSimuladorData({ funcionarios: '', faixaEtaria: '', ramoAtividade: '' })
  }

  return (
    <section id="pessoa-juridica" className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-efika-navy mb-4 font-inter">
            Proteção Empresarial <span className="text-efika-navy">Sob Medida</span>
          </h2>
          <p className="text-xl text-efika-silver-dark max-w-3xl mx-auto font-inter">
            Soluções completas para empresas de todos os portes
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {produtos.map((produto, index) => {
            const IconComponent = produto.icon
            
            return (
              <div
                key={index}
                className={`efika-card bg-gradient-to-br ${produto.cor} hover:scale-105`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-efika-navy rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-efika-navy mb-2 font-inter">
                    {produto.titulo}
                  </h3>
                  <p className="text-efika-silver-dark font-inter">
                    {produto.descricao}
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {produto.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-efika-silver-dark font-inter">
                      <div className="w-2 h-2 bg-efika-navy rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={produto.ctaVariant}
                  className={`w-full font-inter font-medium ${
                    produto.ctaVariant === 'default' 
                      ? 'bg-efika-navy hover:bg-efika-navy-dark text-white' 
                      : 'border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white'
                  }`}
                >
                  {produto.ctaTexto}
                </Button>
              </div>
            )
          })}
        </div>

        {/* Simulador Coletivo */}
        <div className="max-w-2xl mx-auto">
          <div className="hero-gradient p-8 md:p-12 rounded-2xl text-white text-center">
            <Calendar className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
            <h3 className="text-2xl md:text-3xl font-bold mb-2 font-inter">
              Simule Planos Coletivos
            </h3>
            <p className="text-gray-200 mb-8 font-inter">
              Condições especiais para sua empresa
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              {/* Número de Funcionários */}
              <div>
                <label className="block text-left mb-2 font-semibold font-inter">
                  Número de Funcionários
                </label>
                <Select 
                  value={simuladorData.funcionarios} 
                  onValueChange={(value) => setSimuladorData(prev => ({...prev, funcionarios: value}))}
                >
                  <SelectTrigger className="w-full px-4 py-3 rounded-lg text-gray-800 font-inter">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-9">2 a 9 funcionários</SelectItem>
                    <SelectItem value="10-29">10 a 29 funcionários</SelectItem>
                    <SelectItem value="30-99">30 a 99 funcionários</SelectItem>
                    <SelectItem value="100-199">100 a 199 funcionários</SelectItem>
                    <SelectItem value="200+">200+ funcionários</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Faixa Etária */}
              <div>
                <label className="block text-left mb-2 font-semibold font-inter">
                  Faixa Etária Predominante
                </label>
                <Select 
                  value={simuladorData.faixaEtaria} 
                  onValueChange={(value) => setSimuladorData(prev => ({...prev, faixaEtaria: value}))}
                >
                  <SelectTrigger className="w-full px-4 py-3 rounded-lg text-gray-800 font-inter">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-30">18 a 30 anos</SelectItem>
                    <SelectItem value="31-40">31 a 40 anos</SelectItem>
                    <SelectItem value="41-50">41 a 50 anos</SelectItem>
                    <SelectItem value="51-60">51 a 60 anos</SelectItem>
                    <SelectItem value="60+">Acima de 60 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ramo de Atividade */}
              <div className="md:col-span-2">
                <label className="block text-left mb-2 font-semibold font-inter">
                  Ramo de Atividade
                </label>
                <Select 
                  value={simuladorData.ramoAtividade} 
                  onValueChange={(value) => setSimuladorData(prev => ({...prev, ramoAtividade: value}))}
                >
                  <SelectTrigger className="w-full px-4 py-3 rounded-lg text-gray-800 font-inter">
                    <SelectValue placeholder="Selecione o ramo de atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comercio">Comércio</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                    <SelectItem value="servicos">Serviços</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSimularColetivo}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 font-inter text-lg"
            >
              SOLICITAR PROPOSTA EMPRESARIAL
            </Button>

            <p className="text-sm text-gray-300 mt-4 font-inter">
              💼 Proposta personalizada em até 24h • 📞 Sem compromisso
            </p>
          </div>
        </div>

        {/* Benefícios para Empresas */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-efika-navy text-center mb-8 font-inter">
            Vantagens Exclusivas para Empresas
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-efika-navy font-inter">15%</div>
              <div className="text-efika-silver-dark font-inter">Desconto médio vs individual</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-efika-navy font-inter">24h</div>
              <div className="text-efika-silver-dark font-inter">Prazo para aprovação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-efika-navy font-inter">0</div>
              <div className="text-efika-silver-dark font-inter">Carência emergência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-efika-navy font-inter">100%</div>
              <div className="text-efika-silver-dark font-inter">Digital e sem papel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PessoaJuridicaSection