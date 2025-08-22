import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <div className="bg-gray-100 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Teste: Header ✅ + HeroSection ✅
        </h2>
        <p className="text-gray-600">Se aparecer esta mensagem, HeroSection está OK</p>
      </div>
    </div>
  )
}

export default Index