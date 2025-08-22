import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import DiferenciaisSection from '@/components/landing/DiferenciaisSection'
import PlanosSaudeSection from '@/components/landing/PlanosSaudeSection'
import PessoaJuridicaSection from '@/components/landing/PessoaJuridicaSection'
import PessoaFisicaSection from '@/components/landing/PessoaFisicaSection'

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DiferenciaisSection />
      <PlanosSaudeSection />
      <PessoaJuridicaSection />
      <PessoaFisicaSection />
      <div className="bg-orange-100 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          🚀 QUASE COMPLETO! 5 seções funcionando ✅
        </h2>
        <p className="text-gray-600">Testando PessoaFisicaSection...</p>
      </div>
    </div>
  )
}

export default Index