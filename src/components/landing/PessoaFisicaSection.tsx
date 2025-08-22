import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Car, Heart, Home, DollarSign, Calculator } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const PessoaFisicaSection = () => {
  const [comparadorData, setComparadorData] = useState({
    produtosSelecionados: [] as string[],
    dadosBasicos: {
      idade: '',
      regiao: '',
      valorSegurado: ''
    }
  })
  
  const { toast } = useToast()

  const produtos = [
    {
      id: 'seguro-auto',
      icon: Car,
      titulo: "Seguro Auto",
      descricao: "Proteção completa para seu veículo",
      features: ["Cobertura nacional", "Assistência 24h", "Carro reserva", "Guincho ilimitado"],
      cor: "blue-600"
    },
    {
      id: 'seguro-vida',
      icon: Heart,
      titulo: "Seguro Vida", 
      descricao: "Tranquilidade para você e sua família",
      features: ["Cobertura por morte", "Invalidez permanente", "Doenças graves", "Assistência funeral"],
      cor: "red-600"
    },
    {
      id: 'seguro-residencial',
      icon: Home,
      titulo: "Seguro Residencial",
      descricao: "Seu lar protegido contra todos os riscos",
      features: ["Incêndio e explosão", "Roubo e furto", "Danos elétricos", "Responsabilidade civil"],
      cor: "green-600"
    },
    {
      id: 'consorcio',
      icon: DollarSign,
      titulo: "Consórcio",
      descricao: "Realize seus sonhos com planejamento",
      features: ["Casa própria", "Carro novo", "Menor taxa do mercado", "Contemplação rápida"],
      cor: "purple-600"
    }
  ]

  const toggleProduto = (produtoId: string) => {
    setComparadorData(prev => ({
      ...prev,
      produtosSelecionados: prev.produtosSelecionados.includes(produtoId)
        ? prev.produtosSelecionados.filter(id => id !== produtoId)
        : [...prev.produtosSelecionados, produtoId]
    }))
  }

  const handleComparar = () => {
    if (comparadorData.produtosSelecionados.length === 0) {
      toast({
        variant: "destructive",
        title: "Selecione produtos",
        description: "Escolha pelo menos um produto para comparar."
      })
      return
    }

    toast({
      title: "Comparação solicitada!",
      description: `Enviamos as melhores cotações de ${comparadorData.produtosSelecionados.length} produto(s) para seu WhatsApp.`
    })

    console.log('Comparador PF:', {
      ...comparadorData,
      timestamp: new Date().toISOString(),
      source: 'pessoa-fisica'
    })
  }

  return (
    <section id="pessoa-fisica" className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-efika-navy mb-4 font-inter">
            Proteção Completa para sua <span className="text-efika-navy">Família</span>
          </h2>
          <p className="text-xl text-efika-silver-dark max-w-3xl mx-auto font-inter">
            Todos os seguros que você precisa em um só lugar
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {produtos.map((produto, index) => {
            const IconComponent = produto.icon
            const isSelected = comparadorData.produtosSelecionados.includes(produto.id)
            
            return (
              <div
                key={produto.id}
                className={`efika-card cursor-pointer transition-all duration-300 ${
                  isSelected ? 'ring-2 ring-efika-navy bg-efika-navy/5' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => toggleProduto(produto.id)}
              >
                <div className="text-center mb-4">
                  <div className={`w-14 h-14 bg-${produto.cor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-efika-navy font-inter">
                      {produto.titulo}
                    </h3>
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => toggleProduto(produto.id)}
                      className="ml-2"
                    />
                  </div>
                  
                  <p className="text-efika-silver-dark text-sm font-inter mb-4">
                    {produto.descricao}
                  </p>
                </div>

                <ul className="space-y-1 mb-4">
                  {produto.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-efika-silver-dark font-inter">
                      <div className="w-1.5 h-1.5 bg-efika-navy rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="outline"
                  size="sm"
                  className={`w-full font-inter text-xs ${
                    isSelected 
                      ? 'bg-efika-navy text-white border-efika-navy hover:bg-efika-navy-dark' 
                      : 'border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white'
                  }`}
                >
                  {isSelected ? 'Selecionado' : `Cotar ${produto.titulo}`}
                </Button>
              </div>
            )
          })}
        </div>

        {/* Comparador Multi-Produtos */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Calculator className="w-12 h-12 text-efika-navy mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-efika-navy mb-2 font-inter">
              Compare Seguradoras em Segundos
            </h3>
            <p className="text-efika-silver-dark font-inter">
              Selecione os produtos de interesse e receba cotações das melhores seguradoras
            </p>
          </div>

          {/* Produtos Selecionados */}
          {comparadorData.produtosSelecionados.length > 0 && (
            <div className="mb-8 p-4 bg-efika-navy/5 rounded-lg">
              <h4 className="font-semibold text-efika-navy mb-3 font-inter">
                Produtos selecionados para comparação:
              </h4>
              <div className="flex flex-wrap gap-2">
                {comparadorData.produtosSelecionados.map(produtoId => {
                  const produto = produtos.find(p => p.id === produtoId)
                  return produto ? (
                    <span 
                      key={produtoId}
                      className="bg-efika-navy text-white px-3 py-1 rounded-full text-sm font-inter"
                    >
                      {produto.titulo}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          )}

          {/* Formulário Básico */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-efika-navy font-semibold mb-2 font-inter">
                Sua idade
              </label>
              <input
                type="number"
                min="18"
                max="80"
                placeholder="Ex: 35"
                value={comparadorData.dadosBasicos.idade}
                onChange={(e) => setComparadorData(prev => ({
                  ...prev,
                  dadosBasicos: { ...prev.dadosBasicos, idade: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-efika-navy focus:border-transparent font-inter"
              />
            </div>

            <div>
              <label className="block text-efika-navy font-semibold mb-2 font-inter">
                Sua região
              </label>
              <input
                type="text"
                placeholder="Ex: São Paulo, SP"
                value={comparadorData.dadosBasicos.regiao}
                onChange={(e) => setComparadorData(prev => ({
                  ...prev,
                  dadosBasicos: { ...prev.dadosBasicos, regiao: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-efika-navy focus:border-transparent font-inter"
              />
            </div>

            <div>
              <label className="block text-efika-navy font-semibold mb-2 font-inter">
                Valor aproximado
              </label>
              <input
                type="text"
                placeholder="Ex: R$ 50.000"
                value={comparadorData.dadosBasicos.valorSegurado}
                onChange={(e) => setComparadorData(prev => ({
                  ...prev,
                  dadosBasicos: { ...prev.dadosBasicos, valorSegurado: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-efika-navy focus:border-transparent font-inter"
              />
            </div>
          </div>

          {/* CTA Comparador */}
          <div className="text-center">
            <Button 
              onClick={handleComparar}
              className="bg-green-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-inter text-lg"
            >
              COMPARAR OPÇÕES AGORA
            </Button>
            
            <p className="text-sm text-efika-silver-dark mt-4 font-inter">
              📊 Comparativo detalhado • 💰 Sem taxa • 📱 Resultado no WhatsApp
            </p>
          </div>

          {/* Benefícios do Comparador */}
          <div className="mt-8 grid md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-efika-navy font-inter">3min</div>
              <div className="text-sm text-efika-silver-dark font-inter">Tempo médio de cotação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-efika-navy font-inter">5+</div>
              <div className="text-sm text-efika-silver-dark font-inter">Seguradoras comparadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-efika-navy font-inter">30%</div>
              <div className="text-sm text-efika-silver-dark font-inter">Economia média</div>
            </div>
          </div>
        </div>

        {/* Dicas de Economia */}
        <div className="mt-16 bg-gradient-to-r from-efika-navy to-efika-navy-light p-8 md:p-12 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4 font-inter">💡 Dica de Economia</h3>
          <p className="text-lg font-inter mb-6">
            Contrate múltiplos seguros conosco e ganhe desconto progressivo de até 25%
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <div className="font-bold font-inter">2 produtos</div>
              <div className="font-inter">10% desconto</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <div className="font-bold font-inter">3 produtos</div>
              <div className="font-inter">15% desconto</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <div className="font-bold font-inter">4+ produtos</div>
              <div className="font-inter">25% desconto</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PessoaFisicaSection