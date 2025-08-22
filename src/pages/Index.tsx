import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import DiferenciaisSection from '@/components/landing/DiferenciaisSection'
import PlanosSaudeSection from '@/components/landing/PlanosSaudeSection'
import PessoaJuridicaSection from '@/components/landing/PessoaJuridicaSection'

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DiferenciaisSection />
      <PlanosSaudeSection />
      <PessoaJuridicaSection />
      <div className="bg-purple-100 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          ✅ Header + HeroSection + DiferenciaisSection + PlanosSaudeSection + PessoaJuridicaSection
        </h2>
        <p className="text-gray-600">Testando PessoaJuridicaSection...</p>
      </div>
    </div>
  )
}

export default Index