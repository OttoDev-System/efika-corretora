import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import DiferenciaisSection from '@/components/landing/DiferenciaisSection'
import PlanosSaudeSection from '@/components/landing/PlanosSaudeSection'
import PessoaJuridicaSection from '@/components/landing/PessoaJuridicaSection'
import PessoaFisicaSection from '@/components/landing/PessoaFisicaSection'
import CredibilidadeSection from '@/components/landing/CredibilidadeSection'

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DiferenciaisSection />
      <PlanosSaudeSection />
      <PessoaJuridicaSection />
      <PessoaFisicaSection />
      <CredibilidadeSection />
      <div className="bg-pink-100 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          🔥 QUASE LÁ! 6 seções funcionando ✅
        </h2>
        <p className="text-gray-600">Testando CredibilidadeSection (depoimentos + logos)...</p>
      </div>
    </div>
  )
}

export default Index