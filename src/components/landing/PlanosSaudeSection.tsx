import { useState, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle, Heart, Shield, Users, Calculator } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const PlanosSaudeSection = () => {
  const [calculadoraData, setCalculadoraData] = useState({
    idade: '',
    dependentes: '',
    estado: '',
    tipoPlano: 'individual'
  })
  
  const { toast } = useToast()

  const beneficios = [
    {
      icon: CheckCircle,
      titulo: "Até 40% mais barato que contratar direto",
      descricao: "Negociamos melhores condições com as seguradoras"
    },
    {
      icon: Heart,
      titulo: "Sem carência para urgência/emergência",
      descricao: "Cobertura imediata para situações de emergência"
    },
    {
      icon: Shield,
      titulo: "Cobertura nacional completa",
      descricao: "Atendimento em todo Brasil com rede credenciada premium"
    },
    {
      icon: Users,
      titulo: "Planos coletivos a partir de 2 vidas",
      descricao: "Condições especiais para famílias e pequenas empresas"
    }
  ]

  const estados = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo',
    'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba',
    'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul',
    'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
  ]

  // ✅ FIX: Cálculo memoizado sem toast para evitar loop
  const valorEstimado = useMemo(() => {
    // Só calcula se todos os campos estão preenchidos
    if (!calculadoraData.idade || !calculadoraData.dependentes || !calculadoraData.estado) {
      return null
    }

    const idadeNum = parseInt(calculadoraData.idade)
    const dependentesNum = parseInt(calculadoraData.dependentes)
    
    let valorBase = 0
    
    // Cálculo por idade
    if (idadeNum <= 30) valorBase = 180
    else if (idadeNum <= 40) valorBase = 250
    else if (idadeNum <= 50) valorBase = 320
    else if (idadeNum <= 60) valorBase = 450
    else valorBase = 650

    // Adicional por dependentes
    valorBase += dependentesNum * 120

    // Ajuste por tipo de plano
    if (calculadoraData.tipoPlano === 'coletivo-familiar') valorBase *= 0.85
    else if (calculadoraData.tipoPlano === 'coletivo-empresarial') valorBase *= 0.75

    return Math.round(valorBase)
  }, [calculadoraData])

  // ✅ FIX: HandleSimular com useCallback
  const handleSimular = useCallback(() => {
    if (!calculadoraData.idade || !calculadoraData.dependentes || !calculadoraData.estado) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para calcular."
      })
      return
    }

    if (valorEstimado) {
      toast({
        title: "Simulação realizada!",
        description: `Encontramos planos a partir de R$ ${valorEstimado}/mês para você.`
      })
      
      console.log('Simulação Plano Saúde:', {
        ...calculadoraData,
        estimativa: valorEstimado,
        timestamp: new Date().toISOString()
      })
    }
  }, [calculadoraData, valorEstimado, toast])

  return (
    <section id="planos" className="hero-gradient py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-inter">
            Planos de Saúde com as <span className="text-yellow-300">Melhores Condições</span>
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto font-inter">
            O produto com as melhores vantagens e nossa especialidade há mais de 12 anos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Lado Esquerdo - Benefícios */}
          <div className="space-y-8 slide-in-left">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 font-inter flex items-center gap-3">
                <Heart className="w-8 h-8 text-yellow-300" />
                Por que escolher nossos Planos de Saúde?
              </h3>
              
              <div className="space-y-6">
                {beneficios.map((beneficio, index) => {
                  const IconComponent = beneficio.icon
                  
                  return (
                    <div 
                      key={index} 
                      className="flex items-start gap-4"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2 font-inter">
                          {beneficio.titulo}
                        </h4>
                        <p className="text-gray-200 font-inter">
                          {beneficio.descricao}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Selo de Garantia */}
            <div className="bg-yellow-300 text-efika-navy rounded-xl p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2 font-inter">Garantia de Melhor Preço</h4>
              <p className="font-inter">
                Se encontrar condições melhores, igualamos ou devolvemos a diferença
              </p>
            </div>
          </div>

          {/* Lado Direito - Calculadora */}
          <div className="slide-in-right">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <Calculator className="w-12 h-12 text-efika-navy mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-efika-navy mb-2 font-inter">
                  Simule seu Plano de Saúde
                </h3>
                <p className="text-efika-silver-dark font-inter">
                  Descubra quanto você pode economizar
                </p>
              </div>

              <div className="space-y-6">
                {/* Idade */}
                <div>
                  <Label className="text-efika-navy font-semibold mb-2 block font-inter">
                    Idade do titular
                  </Label>
                  <Input
                    type="number"
                    min="18"
                    max="80"
                    placeholder="Ex: 35"
                    value={calculadoraData.idade}
                    onChange={(e) => setCalculadoraData(prev => ({...prev, idade: e.target.value}))}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-efika-navy font-inter"
                  />
                </div>

                {/* Dependentes */}
                <div>
                  <Label className="text-efika-navy font-semibold mb-2 block font-inter">
                    Número de dependentes
                  </Label>
                  <Select value={calculadoraData.dependentes} onValueChange={(value) => setCalculadoraData(prev => ({...prev, dependentes: value}))}>
                    <SelectTrigger className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-efika-navy font-inter">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Nenhum</SelectItem>
                      <SelectItem value="1">1 dependente</SelectItem>
                      <SelectItem value="2">2 dependentes</SelectItem>
                      <SelectItem value="3">3 dependentes</SelectItem>
                      <SelectItem value="4">4 ou mais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Estado */}
                <div>
                  <Label className="text-efika-navy font-semibold mb-2 block font-inter">
                    Estado de residência
                  </Label>
                  <Select value={calculadoraData.estado} onValueChange={(value) => setCalculadoraData(prev => ({...prev, estado: value}))}>
                    <SelectTrigger className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-efika-navy font-inter">
                      <SelectValue placeholder="Selecione seu estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estados.map(estado => (
                        <SelectItem key={estado} value={estado.toLowerCase()}>{estado}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Plano */}
                <div>
                  <Label className="text-efika-navy font-semibold mb-4 block font-inter">
                    Tipo de plano
                  </Label>
                  <RadioGroup 
                    value={calculadoraData.tipoPlano} 
                    onValueChange={(value) => setCalculadoraData(prev => ({...prev, tipoPlano: value}))}
                    className="grid grid-cols-1 gap-3"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="font-inter cursor-pointer">Individual</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="coletivo-familiar" id="coletivo-familiar" />
                      <Label htmlFor="coletivo-familiar" className="font-inter cursor-pointer">Coletivo Familiar</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="coletivo-empresarial" id="coletivo-empresarial" />
                      <Label htmlFor="coletivo-empresarial" className="font-inter cursor-pointer">Coletivo Empresarial</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Resultado */}
                {valorEstimado && (
                  <div className="bg-efika-navy/5 p-6 rounded-lg text-center">
                    <h4 className="text-lg font-semibold text-efika-navy mb-2 font-inter">
                      Estimativa de Valor
                    </h4>
                    <div className="text-3xl font-bold text-efika-navy font-inter">
                      A partir de R$ {valorEstimado}/mês
                    </div>
                    <p className="text-sm text-efika-silver-dark mt-2 font-inter">
                      *Valores podem variar conforme análise detalhada
                    </p>
                  </div>
                )}

                {/* CTA */}
                <Button 
                  onClick={handleSimular}
                  className="w-full bg-green-600 text-white font-semibold py-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-inter"
                >
                  FALAR COM ESPECIALISTA AGORA
                </Button>

                <p className="text-xs text-center text-efika-silver-dark font-inter">
                  📞 Ligação gratuita • 📱 Atendimento via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlanosSaudeSection