import Link from "next/link";
import Navigation from "@/components/Navigation";
import { ArrowRight, CheckCircle2, MonitorSmartphone, Zap, Shield, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
            O site perfeito para o seu negócio <br className="hidden md:block" />
            <span className="text-blue-600">rápido e sem complicação</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto mb-10">
            Criamos sites modernos, responsivos e otimizados para ajudar sua empresa a vender mais. Solicite hoje e acompanhe tudo em tempo real.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/solicitar" 
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Adquirir meu site
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Categorias/Exemplos */}
        <section id="servicos" className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">Sites para todos os segmentos</h2>
              <p className="mt-4 text-lg text-gray-500">Desenvolvemos a solução ideal para o seu modelo de negócio.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Lojas Virtuais', desc: 'E-commerce completo para você vender seus produtos 24h por dia.' },
                { title: 'Restaurantes e Delivery', desc: 'Cardápio digital e sistema de pedidos online integrado.' },
                { title: 'Prestadores de Serviço', desc: 'Páginas focadas em capturar leads e agendar orçamentos.' },
                { title: 'Clínicas e Consultórios', desc: 'Transmita confiança e permita agendamento online de consultas.' },
                { title: 'Imobiliárias', desc: 'Catálogo de imóveis com filtros avançados e contato direto.' },
                { title: 'Institucionais', desc: 'Apresente sua empresa, missão e valores para o mundo.' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">Por que escolher a NexSite?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                    <MonitorSmartphone className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">100% Responsivo</h3>
                <p className="text-gray-600">Seu site perfeito e moderno em celulares, tablets e computadores.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                    <Zap className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Alta Velocidade</h3>
                <p className="text-gray-600">Sites otimizados para carregar incrivelmente rápido e reter clientes.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                    <Search className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Otimizado Google</h3>
                <p className="text-gray-600">Estrutura de SEO robusta para ajudar você a ser encontrado nas buscas.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                    <Shield className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Suporte Privado</h3>
                <p className="text-gray-600">Acompanhe seu projeto em um chat exclusivo em tempo real conosco.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Depoimentos / Feedback - Scrolling Slider */}
        <section className="py-20 bg-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">O que nossos clientes dizem</h2>
            <p className="mt-4 text-lg text-gray-500">Resultados reais de quem confiou na NexSite.</p>
          </div>
          
          <div className="relative flex w-full gap-6 overflow-hidden">
            <div className="flex w-max animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused] gap-6 px-4">
              {[
                { name: "Lucas M.", role: "Dono de Hamburgueria", text: "O sistema de delivery mudou meu faturamento. Em 5 dias o site estava no ar e lindo!" },
                { name: "Mariana S.", role: "Arquiteta", text: "Meu portfólio ficou extremamente elegante e super rápido no celular. Suporte nota 10." },
                { name: "Pedro A.", role: "CEO Agência M.", text: "Impressionante a agilidade no atendimento pelo chat exclusivo. Achei muito seguro." },
                { name: "Juliana T.", role: "Dentista", text: "Meus pacientes elogiam muito a facilidade de agendar consulta pelo novo site. Recomendo!" },
                { name: "Roberto C.", role: "E-commerce de Roupas", text: "As vendas triplicaram. Design limpo, focado em conversão e muito fácil de navegar." },
                { name: "Camila F.", role: "Advogada", text: "O site passou muita credibilidade para o meu escritório. Serviço impecável." }
              ].map((fb, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 p-8 rounded-xl w-80 md:w-96 shrink-0 shadow-sm">
                  <div className="flex text-yellow-400 mb-4">
                    {"★★★★★"}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{fb.text}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{fb.name}</p>
                    <p className="text-sm text-gray-500">{fb.role}</p>
                  </div>
                </div>
              ))}
              {/* Duplicar para criar o loop infinito invisível */}
              {[
                { name: "Lucas M.", role: "Dono de Hamburgueria", text: "O sistema de delivery mudou meu faturamento. Em 5 dias o site estava no ar e lindo!" },
                { name: "Mariana S.", role: "Arquiteta", text: "Meu portfólio ficou extremamente elegante e super rápido no celular. Suporte nota 10." },
                { name: "Pedro A.", role: "CEO Agência M.", text: "Impressionante a agilidade no atendimento pelo chat exclusivo. Achei muito seguro." },
                { name: "Juliana T.", role: "Dentista", text: "Meus pacientes elogiam muito a facilidade de agendar consulta pelo novo site. Recomendo!" },
                { name: "Roberto C.", role: "E-commerce de Roupas", text: "As vendas triplicaram. Design limpo, focado em conversão e muito fácil de navegar." },
                { name: "Camila F.", role: "Advogada", text: "O site passou muita credibilidade para o meu escritório. Serviço impecável." }
              ].map((fb, i) => (
                <div key={i + 10} className="bg-gray-50 border border-gray-100 p-8 rounded-xl w-80 md:w-96 shrink-0 shadow-sm">
                  <div className="flex text-yellow-400 mb-4">
                    {"★★★★★"}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{fb.text}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{fb.name}</p>
                    <p className="text-sm text-gray-500">{fb.role}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sombras laterais para dar efeito de fade */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Pronto para ter seu site no ar?</h2>
            <Link 
              href="/solicitar" 
              className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-md shadow hover:bg-gray-50 transition text-lg"
            >
              Adquirir meu site agora
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 text-center text-gray-400">
        <p>&copy; 2026 NexSite. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
