import Header from "@/components/header";

/**
 * Página Sobre a Dumbbell Fitness
 *
 * Esta página contém informações sobre a academia:
 * - História e missão da empresa
 * - Valores e diferenciais
 * - Informações de contato
 * - Localização e horários
 *
 * Layout responsivo com largura máxima de 1250px
 */
export default function Sobre() {
  return (
    <div className="bg-gray w-screen flex flex-col items-center min-h-screen">
      {/* Container principal com largura máxima */}
      <div className="w-[1250px]">
        {/* Cabeçalho da página */}
        <Header />

        {/* Conteúdo principal da página Sobre */}
        <div className="flex flex-col items-center py-12">
          {/* Título principal */}
          <h1 className="text-white text-6xl font-bebas mb-8">SOBRE NÓS</h1>

          {/* Seção de história e missão */}
          <div className="bg-gray1 rounded-24 p-8 mb-8 w-full max-w-4xl">
            <h2 className="text-white text-4xl font-bebas mb-6">
              Nossa História
            </h2>
            <p className="text-white text-lg font-roboto leading-relaxed mb-6">
              A Dumbbell Fitness nasceu da paixão por transformar vidas através
              do fitness. Fundada com o objetivo de democratizar o acesso a uma
              vida mais saudável, nossa academia oferece estrutura de qualidade
              e profissionais qualificados para todos os níveis de treino.
            </p>
            <p className="text-white text-lg font-roboto leading-relaxed">
              Desde nossa inauguração, temos ajudado milhares de pessoas a
              alcançarem seus objetivos fitness, seja para ganhar massa
              muscular, perder peso, melhorar a saúde ou simplesmente manter-se
              ativo.
            </p>
          </div>

          {/* Seção de missão, visão e valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
            {/* Missão */}
            <div className="bg-gray1 rounded-24 p-6 text-center">
              <h3 className="text-primary-green text-2xl font-bebas mb-4">
                MISSÃO
              </h3>
              <p className="text-white text-sm font-roboto">
                Transformar vidas através do fitness, oferecendo estrutura de
                qualidade e suporte profissional para todos os objetivos.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-gray1 rounded-24 p-6 text-center">
              <h3 className="text-primary-green text-2xl font-bebas mb-4">
                VISÃO
              </h3>
              <p className="text-white text-sm font-roboto">
                Ser referência em qualidade e inovação no mercado fitness,
                inspirando uma comunidade ativa e saudável.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-gray1 rounded-24 p-6 text-center">
              <h3 className="text-primary-green text-2xl font-bebas mb-4">
                VALORES
              </h3>
              <p className="text-white text-sm font-roboto">
                Excelência, compromisso, inovação, inclusão e respeito ao
                próximo em tudo que fazemos.
              </p>
            </div>
          </div>

          {/* Seção de diferenciais */}
          <div className="bg-gray1 rounded-24 p-8 mb-8 w-full max-w-4xl">
            <h2 className="text-white text-4xl font-bebas mb-6">
              Nossos Diferenciais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-primary-green text-xl font-bebas mb-2">
                    Profissionais Qualificados
                  </h4>
                  <p className="text-white text-sm font-roboto">
                    Equipe de educadores físicos certificados e em constante
                    atualização.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-primary-green text-xl font-bebas mb-2">
                    Estrutura Completa
                  </h4>
                  <p className="text-white text-sm font-roboto">
                    Academia equipada com os melhores aparelhos e espaços para
                    todas as modalidades.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-primary-green text-xl font-bebas mb-2">
                    Horários Flexíveis
                  </h4>
                  <p className="text-white text-sm font-roboto">
                    Funcionamento de segunda a domingo, com horários que se
                    adaptam à sua rotina.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-primary-green text-xl font-bebas mb-2">
                    Comunidade Acolhedora
                  </h4>
                  <p className="text-white text-sm font-roboto">
                    Ambiente familiar onde todos se sentem bem-vindos e
                    motivados.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de contato */}
          <div
            id="contato"
            className="bg-gray1 rounded-24 p-8 w-full max-w-4xl"
          >
            <h2 className="text-white text-4xl font-bebas mb-6">
              Entre em Contato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Informações de contato */}
              <div>
                <h3 className="text-primary-green text-2xl font-bebas mb-4">
                  Informações
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                    <span className="text-white font-roboto">
                      📞 (11) 99999-9999
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                    <span className="text-white font-roboto">
                      📧 contato@dumbbellfitness.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                    <span className="text-white font-roboto">
                      📍 Rua das Academias, 123 - Centro
                    </span>
                  </div>
                </div>
              </div>

              {/* Horários de funcionamento */}
              <div>
                <h3 className="text-primary-green text-2xl font-bebas mb-4">
                  Horários
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white font-roboto">
                      Segunda a Sexta:
                    </span>
                    <span className="text-white font-roboto">06h às 22h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-roboto">Sábado:</span>
                    <span className="text-white font-roboto">08h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-roboto">Domingo:</span>
                    <span className="text-white font-roboto">08h às 14h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes sociais */}
            <div className="mt-8 pt-6 border-t border-gray2">
              <h3 className="text-primary-green text-2xl font-bebas mb-4">
                Siga-nos
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-white hover:text-primary-green transition-colors duration-200"
                >
                  📘 Facebook
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-green transition-colors duration-200"
                >
                  📷 Instagram
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-green transition-colors duration-200"
                >
                  🐦 Twitter
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-green transition-colors duration-200"
                >
                  📺 YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
