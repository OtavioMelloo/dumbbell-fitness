"use client";

import React, { useState } from "react";
import {
  User,
  Target,
  Calendar,
  Clock,
  Star,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Dumbbell,
  Heart,
  TrendingUp,
  Award,
  Users,
  MessageCircle,
} from "lucide-react";

interface Personal {
  id: number;
  nome: string;
  especialidade: string;
  experiencia: string;
  avaliacao: number;
  foto: string;
  descricao: string;
  certificacoes: string[];
  preco: number;
}

const personais: Personal[] = [
  {
    id: 1,
    nome: "Carlos Silva",
    especialidade: "Hipertrofia e Força",
    experiencia: "8 anos",
    avaliacao: 4.9,
    foto: "/img/personal1.jpg",
    descricao:
      "Especialista em treinamento de força e hipertrofia. Formado em Educação Física com pós-graduação em Fisiologia do Exercício.",
    certificacoes: ["CREF", "Personal Trainer", "Nutrição Esportiva"],
    preco: 120,
  },
  {
    id: 2,
    nome: "Ana Costa",
    especialidade: "Emagrecimento e Funcional",
    experiencia: "6 anos",
    avaliacao: 4.8,
    foto: "/img/personal2.jpg",
    descricao:
      "Especialista em treinamento funcional e emagrecimento. Trabalha com metodologias inovadoras para resultados rápidos.",
    certificacoes: ["CREF", "Treinamento Funcional", "Pilates"],
    preco: 100,
  },
  {
    id: 3,
    nome: "Roberto Santos",
    especialidade: "CrossFit e Performance",
    experiencia: "10 anos",
    avaliacao: 4.9,
    foto: "/img/personal3.jpg",
    descricao:
      "Coach de CrossFit certificado com vasta experiência em treinamento de alta performance e competições.",
    certificacoes: ["CREF", "CrossFit Level 2", "Preparação Física"],
    preco: 150,
  },
  {
    id: 4,
    nome: "Mariana Lima",
    especialidade: "Pilates e Reabilitação",
    experiencia: "7 anos",
    avaliacao: 4.7,
    foto: "/img/personal4.jpg",
    descricao:
      "Especialista em Pilates e reabilitação física. Ideal para quem busca fortalecimento e bem-estar.",
    certificacoes: ["CREF", "Pilates Completo", "Fisioterapia Esportiva"],
    preco: 90,
  },
];

const beneficios = [
  {
    icon: Target,
    titulo: "Treinos Personalizados",
    descricao: "Programas específicos para seus objetivos e necessidades",
  },
  {
    icon: Calendar,
    titulo: "Flexibilidade de Horários",
    descricao: "Agende seus treinos no horário que melhor te convém",
  },
  {
    icon: TrendingUp,
    titulo: "Acompanhamento Contínuo",
    descricao: "Monitoramento constante do seu progresso e evolução",
  },
  {
    icon: Heart,
    titulo: "Suporte Nutricional",
    descricao: "Orientações sobre alimentação para potencializar resultados",
  },
  {
    icon: Users,
    titulo: "Treinos em Grupo",
    descricao: "Opção de treinos em pequenos grupos para maior motivação",
  },
  {
    icon: Award,
    titulo: "Certificações",
    descricao: "Profissionais qualificados e constantemente atualizados",
  },
];

export default function ContratePersonalPage() {
  const [selectedPersonal, setSelectedPersonal] = useState<Personal | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    objetivo: "",
    horario: "",
    mensagem: "",
  });

  const handleContact = (personal: Personal) => {
    setSelectedPersonal(personal);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar o envio do formulário
    alert("Solicitação enviada com sucesso! Entraremos em contato em breve.");
    setShowModal(false);
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      objetivo: "",
      horario: "",
      mensagem: "",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-white text-5xl font-bebas mb-4">
            CONTRATE UM PERSONAL
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Transforme seus objetivos em realidade com a ajuda de nossos
            profissionais especializados. Treinos personalizados para resultados
            extraordinários.
          </p>
        </div>

        {/* Benefícios */}
        <div className="mb-16">
          <h2 className="text-white text-3xl font-bebas text-center mb-8">
            POR QUE CONTRATAR UM PERSONAL?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="bg-gray1 rounded-24 p-6 border border-gray2 hover:border-primary-green transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <beneficio.icon className="text-primary-green" size={24} />
                  <h3 className="text-white font-semibold text-lg">
                    {beneficio.titulo}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">{beneficio.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personais */}
        <div className="mb-16">
          <h2 className="text-white text-3xl font-bebas text-center mb-8">
            NOSSOS PERSONAIS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {personais.map((personal) => (
              <div
                key={personal.id}
                className="bg-gray1 rounded-24 p-6 border border-gray2 hover:border-primary-green transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-semibold mb-1">
                      {personal.nome}
                    </h3>
                    <p className="text-primary-green text-sm font-medium mb-2">
                      {personal.especialidade}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(personal.avaliacao)}
                      <span className="text-gray-300 text-sm">
                        {personal.avaliacao}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {personal.experiencia} de experiência
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">
                  {personal.descricao}
                </p>

                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">
                    Certificações:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {personal.certificacoes.map((cert, index) => (
                      <span
                        key={index}
                        className="bg-gray2 text-gray-300 text-xs px-2 py-1 rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-primary-green font-bold text-lg">
                    R$ {personal.preco}/hora
                  </div>
                  <button
                    onClick={() => handleContact(personal)}
                    className="bg-primary-green hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Contratar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-gray1 rounded-24 p-8 mb-16">
          <h2 className="text-white text-3xl font-bebas text-center mb-8">
            NOSSOS NÚMEROS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-primary-green text-4xl font-bold mb-2">
                500+
              </div>
              <div className="text-gray-300">Clientes Atendidos</div>
            </div>
            <div>
              <div className="text-primary-green text-4xl font-bold mb-2">
                15+
              </div>
              <div className="text-gray-300">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-primary-green text-4xl font-bold mb-2">
                4.9
              </div>
              <div className="text-gray-300">Avaliação Média</div>
            </div>
            <div>
              <div className="text-primary-green text-4xl font-bold mb-2">
                95%
              </div>
              <div className="text-gray-300">Taxa de Sucesso</div>
            </div>
          </div>
        </div>

        {/* Modal de Contato */}
        {showModal && selectedPersonal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray1 rounded-24 p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-2xl font-bebas">
                  Contratar {selectedPersonal.nome}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray2 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray2 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({ ...formData, telefone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray2 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Objetivo Principal
                  </label>
                  <select
                    required
                    value={formData.objetivo}
                    onChange={(e) =>
                      setFormData({ ...formData, objetivo: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray2 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-green"
                  >
                    <option value="">Selecione seu objetivo</option>
                    <option value="emagrecimento">Emagrecimento</option>
                    <option value="hipertrofia">Hipertrofia</option>
                    <option value="forca">Força</option>
                    <option value="resistencia">Resistência</option>
                    <option value="reabilitacao">Reabilitação</option>
                    <option value="saude">Saúde e Bem-estar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Horário Preferido
                  </label>
                  <select
                    required
                    value={formData.horario}
                    onChange={(e) =>
                      setFormData({ ...formData, horario: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray2 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-green"
                  >
                    <option value="">Selecione o horário</option>
                    <option value="manha">Manhã (6h - 12h)</option>
                    <option value="tarde">Tarde (12h - 18h)</option>
                    <option value="noite">Noite (18h - 22h)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Mensagem (Opcional)
                  </label>
                  <textarea
                    value={formData.mensagem}
                    onChange={(e) =>
                      setFormData({ ...formData, mensagem: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 bg-gray2 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="Conte um pouco sobre você e suas expectativas..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-green hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Enviar Solicitação
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
