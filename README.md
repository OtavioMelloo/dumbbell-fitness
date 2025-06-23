# Dumbbell Fitness

Projeto de Prática profissional de Engenharia de Software - Sistema de Academia com Frontend Next.js e Backend Django.

## 🏋️ **Sobre o Projeto**

Sistema completo de academia com:

- **Frontend**: Next.js 14 com TypeScript e Tailwind CSS
- **Backend**: Django REST Framework
- **Autenticação**: Sistema de login/registro com tokens
- **Funcionalidades**: Planos, matrícula, exercícios, treinos

## 🚀 **Funcionalidades Implementadas**

### **Autenticação**

- ✅ Login com email/senha
- ✅ Registro de usuários (2 etapas)
- ✅ Login social (Google/Facebook - simulação)
- ✅ Context de autenticação global

### **Planos e Matrícula**

- ✅ Listagem de planos
- ✅ Página de matrícula
- ✅ Checkout com formulário de pagamento
- ✅ Validação de dados (CPF, CEP, cartão)

### **Interface**

- ✅ Design responsivo com Tailwind CSS
- ✅ Componentes reutilizáveis
- ✅ Navegação entre páginas
- ✅ Estados de loading e erro

## 🛠️ **Tecnologias**

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Django, Django REST Framework
- **Autenticação**: Token-based
- **Estilização**: Tailwind CSS
- **Deploy**: Vercel (frontend) / Railway (backend)

## 📁 **Estrutura do Projeto**

```
dumbbell-fitness/
├── frontend/                 # Aplicação Next.js
│   ├── src/
│   │   ├── app/             # Páginas da aplicação
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── contexts/        # Contextos React
│   │   ├── data/           # Dados estáticos
│   │   └── services/       # Serviços de API
│   └── public/             # Arquivos estáticos
└── README.md
```

## 🔧 **Como Executar**

### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

### **Backend**

```bash
# Configurar ambiente Django
python manage.py runserver
```

## 📱 **Páginas Principais**

- `/` - Landing page
- `/login` - Login principal
- `/registro` - Registro de usuário
- `/matricula` - Seleção de planos
- `/matricula/checkout` - Checkout
- `/rotinas` - Área do usuário (protegida)

## 🔐 **Segurança**

- ✅ Variáveis de ambiente protegidas
- ✅ Autenticação token-based
- ✅ Validação de formulários
- ✅ Sanitização de dados

## 📄 **Licença**

Projeto acadêmico - Prática profissional de Engenharia de Software.
