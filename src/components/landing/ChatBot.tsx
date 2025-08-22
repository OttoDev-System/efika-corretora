import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Oi! Sou a Efi, sua assistente virtual. Como posso te ajudar hoje? 😊", sender: 'bot' }
  ])

  const quickOptions = [
    { text: "🏥 Plano de Saúde", value: "plano-saude" },
    { text: "🚗 Seguro Auto", value: "seguro-auto" },
    { text: "🏠 Seguro Residencial", value: "residencial" },
    { text: "👤 Seguro Vida", value: "vida" },
    { text: "💰 Consórcio", value: "consorcio" },
    { text: "👨‍💼 Falar com Humano", value: "humano" }
  ]

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, 
      { text: quickOptions.find(o => o.value === option)?.text || '', sender: 'user' },
      { text: "Perfeito! Nossa equipe entrará em contato em breve para te ajudar com isso. 📞", sender: 'bot' }
    ])
  }

  return (
    <>
      {/* Widget Button */}
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer pulse-gentle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-16 h-16 bg-efika-navy rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
          {isOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <MessageCircle className="w-8 h-8 text-white" />
          )}
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-efika-navy p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-efika-navy font-bold text-sm">E</span>
              </div>
              <div>
                <div className="font-semibold font-inter">Efi - Assistente Virtual</div>
                <div className="text-xs opacity-90">Online agora</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg font-inter text-sm ${
                  message.sender === 'user' 
                    ? 'bg-efika-navy text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}

            {/* Quick Options */}
            {messages.length <= 1 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {quickOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleOptionClick(option.value)}
                    className="text-xs p-2 h-auto border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white font-inter"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot