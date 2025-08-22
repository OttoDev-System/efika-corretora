import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import DiferenciaisSection from '@/components/landing/DiferenciaisSection'

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DiferenciaisSection />
      <div className="bg-green-100 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Teste: Header ✅ + HeroSection ✅ + DiferenciaisSection ✅
        </h2>
        <p className="text-gray-600">Se aparecer esta mensagem, DiferenciaisSection está OK</p>
      </div>
    </div>
  )
}

export default Index