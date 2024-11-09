import { TransactionCategory } from "@prisma/client";

export const transactionCategoryMap: Record<TransactionCategory, string> = {
  // Moradia
  HOUSING: "Moradia",
  RENT: "Aluguel",
  MORTGAGE: "Financiamento",
  HOME_INSURANCE: "Seguro Residencial",
  HOME_MAINTENANCE: "Manutenção Residencial",
  FURNITURE: "Móveis",

  // Transporte
  TRANSPORTATION: "Transporte",
  FUEL: "Combustível",
  CAR_MAINTENANCE: "Manutenção Automotiva",
  PUBLIC_TRANSPORT: "Transporte Público",
  PARKING: "Estacionamento",
  CAR_INSURANCE: "Seguro Automotivo",
  RIDE_SHARING: "Transporte por Aplicativo",

  // Alimentação
  FOOD: "Alimentação",
  GROCERIES: "Supermercado",
  RESTAURANTS: "Restaurantes",
  DELIVERY: "Delivery",
  SNACKS: "Lanches",

  // Lazer
  ENTERTAINMENT: "Lazer",
  STREAMING_SERVICES: "Streaming",
  GAMES: "Jogos",
  MOVIES: "Cinema",
  SPORTS: "Esportes",
  HOBBIES: "Hobbies",
  TRAVEL: "Viagens",

  // Saúde
  HEALTH: "Saúde",
  MEDICAL_INSURANCE: "Plano de Saúde",
  PHARMACY: "Farmácia",
  DOCTOR: "Médico",
  DENTAL: "Dentista",
  FITNESS: "Academia",

  // Utilidades
  UTILITY: "Utilidades",
  ELECTRICITY: "Energia Elétrica",
  WATER: "Água",
  GAS: "Gás",
  INTERNET: "Internet",
  PHONE: "Telefone",

  // Renda
  SALARY: "Salário",
  BONUS: "Bônus",
  FREELANCE: "Freelance",
  INVESTMENTS_RETURN: "Retorno de Investimentos",
  RENTAL_INCOME: "Renda de Aluguel",

  // Educação
  EDUCATION: "Educação",
  TUITION: "Mensalidade",
  BOOKS: "Livros",
  COURSES: "Cursos",
  SCHOOL_SUPPLIES: "Material Escolar",

  // Finanças
  CREDIT_CARD: "Cartão de Crédito",
  LOAN_PAYMENT: "Pagamento de Empréstimo",
  SAVINGS: "Poupança",
  INVESTMENTS: "Investimentos",
  INSURANCE: "Seguros",
  TAXES: "Impostos",

  // Pessoal
  CLOTHING: "Vestuário",
  PERSONAL_CARE: "Cuidados Pessoais",
  GIFTS: "Presentes",
  DONATIONS: "Doações",
  PETS: "Pets",

  // Negócios
  BUSINESS_EXPENSES: "Despesas Empresariais",
  OFFICE_SUPPLIES: "Material de Escritório",
  MARKETING: "Marketing",
  SOFTWARE_SERVICES: "Serviços de Software",

  // Outros
  OTHER: "Outros",
  MISCELLANEOUS: "Diversos",
} as const;

// Helper function para obter o label traduzido
export const getCategoryLabel = (category: TransactionCategory): string => {
  return transactionCategoryMap[category];
};

// Helper function para obter array de categorias para select/combobox
export const getCategoryOptions = () => {
  return Object.entries(transactionCategoryMap).map(([value, label]) => ({
    value,
    label,
  }));
};
