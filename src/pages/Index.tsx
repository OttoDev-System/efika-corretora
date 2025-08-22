import Header from '@/components/landing/Header'

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Efika Corretora - Teste de Componentes
          </h1>
          <p className="text-xl text-gray-600">
            Carregando Header... ✅
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index