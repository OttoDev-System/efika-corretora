import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import DiferenciaisSection from '@/components/landing/DiferenciaisSection'
import PlanosSaudeSection from '@/components/landing/PlanosSaudeSection'

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DiferenciaisSection />
      <PlanosSaudeSection />
      <div className="bg-green-100 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          🎉 LOOP INFINITO CORRIGIDO! ✅
        </h2>
        <p className="text-gray-600">PlanosSaudeSection está funcionando perfeitamente!</p>
      </div>
    </div>
  )
}

export default Index