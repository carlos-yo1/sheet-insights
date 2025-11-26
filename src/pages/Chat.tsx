import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatSettings } from "@/components/chat/ChatSettings";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem("n8n_webhook_url") || "";
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!webhookUrl) {
      toast({
        title: "Webhook não configurado",
        description: "Configure a URL do webhook n8n nas configurações.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha na requisição");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || data.message || "Desculpe, não consegui processar sua mensagem.",
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Verifique a URL do webhook e tente novamente.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Verifique se o webhook n8n está configurado corretamente.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col gradient-bg">
      {/* Chat Container */}
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col max-w-5xl">
        <Card className="flex-1 flex flex-col shadow-elegant overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b border-border gradient-accent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Leão AI</h2>
                  <p className="text-sm text-white/80">Seu assistente inteligente de dados</p>
                </div>
              </div>
              <ChatSettings 
                webhookUrl={webhookUrl} 
                onWebhookUrlChange={setWebhookUrl}
              />
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-secondary/20">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-2xl">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-accent flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Olá! Sou o Leão AI 🦁</h3>
                  <p className="text-muted-foreground mb-6">
                    Estou aqui para ajudá-lo a entender melhor seus dados de marketing.
                    Pergunte qualquer coisa!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                    <button
                      onClick={() => handleSendMessage("Qual plataforma teve o melhor ROI?")}
                      className="p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth text-left"
                    >
                      <div className="font-medium mb-1">📊 Melhor ROI</div>
                      <div className="text-sm text-muted-foreground">
                        Qual plataforma teve o melhor ROI?
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleSendMessage("Mostre um resumo dos últimos 7 dias")}
                      className="p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth text-left"
                    >
                      <div className="font-medium mb-1">📅 Resumo Semanal</div>
                      <div className="text-sm text-muted-foreground">
                        Mostre um resumo dos últimos 7 dias
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleSendMessage("Qual o custo por lead de cada plataforma?")}
                      className="p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth text-left"
                    >
                      <div className="font-medium mb-1">💰 CPL por Plataforma</div>
                      <div className="text-sm text-muted-foreground">
                        Qual o custo por lead de cada plataforma?
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleSendMessage("Compare o desempenho de todas as plataformas")}
                      className="p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth text-left"
                    >
                      <div className="font-medium mb-1">🔍 Comparação</div>
                      <div className="text-sm text-muted-foreground">
                        Compare o desempenho das plataformas
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <ChatMessage key={index} {...message} />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Chat Input */}
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading}
            disabled={!webhookUrl}
          />
        </Card>
      </div>
    </div>
  );
};

export default Chat;
