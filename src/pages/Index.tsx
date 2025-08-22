import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      
      {/* Sistema Login Button */}
      <div className="fixed top-4 right-4 z-50">
        <Link to="/login">
          <Button 
            variant="outline" 
            className="bg-white/90 backdrop-blur-sm border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white shadow-lg"
          >
            Sistema Login
          </Button>
        </Link>
      </div>
      
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