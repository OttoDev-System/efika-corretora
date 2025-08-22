import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import DiferenciaisSection from '@/components/landing/DiferenciaisSection'
import PlanosSaudeSection from '@/components/landing/PlanosSaudeSection'
import PessoaJuridicaSection from '@/components/landing/PessoaJuridicaSection'
import PessoaFisicaSection from '@/components/landing/PessoaFisicaSection'
import CredibilidadeSection from '@/components/landing/CredibilidadeSection'
import Footer from '@/components/landing/Footer'
import ChatBot from '@/components/landing/ChatBot'

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <DiferenciaisSection />
        <PlanosSaudeSection />
        <PessoaJuridicaSection />
        <PessoaFisicaSection />
        <CredibilidadeSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default Index