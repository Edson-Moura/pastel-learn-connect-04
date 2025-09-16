import { Header } from "@/components/Header";
import { StudyGroupFilters } from "@/components/StudyGroupFilters";
import { StudyGroupCard } from "@/components/StudyGroupCard";
import { GroupStats } from "@/components/GroupStats";
import { PopularTags } from "@/components/PopularTags";
import { UpcomingActivities } from "@/components/UpcomingActivities";
import { TooltipButton } from "@/components/TooltipButton";
import { Plus } from "lucide-react";

const StudyGroups = () => {
  const studyGroups = [
    {
      id: 1,
      title: "Grammar Masters - Nível Intermediário",
      description: "Grupo focado no desenvolvimento da gramática através de exercícios práticos, discussões e conceitos colaborativos. Encontros semanais com temas fixos.",
      members: 89,
      isVeryActive: true,
      tags: ["Gramática", "Exercícios", "Conceitos"],
      category: "Gramática",
      categoryColor: "bg-blue-500",
      icon: "📚"
    },
    {
      id: 2,
      title: "Daily Speaking Club",
      description: "Praticar conversação em inglês todos os dias! São 30 minutos com temas variados, desde conversas cotidianas até debates avançados em inglês para todos os níveis.",
      members: 156,
      isVeryActive: true,
      tags: ["Conversação", "Prática", "Fluência"],
      category: "Conversação",
      categoryColor: "bg-green-500",
      icon: "💬"
    },
    {
      id: 3,
      title: "TOEFL Prep Warriors 2024",
      description: "Grupo intensivo de preparação para o TOEFL com cronograma estruturado, simulados semanais, dicas de estratégias e suporte total. Meta: pontuação acima de 100!",
      members: 234,
      isVeryActive: false,
      tags: ["TOEFL", "Simulados", "Estratégias"],
      category: "Preparação TOEFL/IELTS",
      categoryColor: "bg-purple-500",
      icon: "🎯"
    },
    {
      id: 4,
      title: "Business English Professionals",
      description: "Desenvolva suas habilidades em inglês corporativo: apresentações, negociações, emails formais e networking. Ideal para profissionais que buscam crescimento na carreira.",
      members: 178,
      isVeryActive: false,
      tags: ["Business", "Apresentações", "Networking"],
      category: "Business English",
      categoryColor: "bg-orange-500",
      icon: "💼"
    },
    {
      id: 5,
      title: "IELTS Success Academy",
      description: "Preparação completa para o IELTS Academic e General. Foco nas 4 habilidades com feedback personalizado, mock tests e técnicas comprovadas para alcançar band 7+.",
      members: 298,
      isVeryActive: false,
      tags: ["IELTS", "Academic", "Band 7+"],
      category: "Preparação TOEFL/IELTS",
      categoryColor: "bg-red-500",
      icon: "🏆"
    },
    {
      id: 6,
      title: "Vocabulary Builders United",
      description: "Expanda seu vocabulário de forma sistemática! Palavra do dia, jogos de vocabulário, técnicas de memorização e exercícios práticos em contextos reais.",
      members: 145,
      isVeryActive: true,
      tags: ["Vocabulário", "Memorização", "Jogos"],
      category: "Vocabulary",
      categoryColor: "bg-teal-500",
      icon: "📖"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <StudyGroupFilters />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Grupos de Estudo</h1>
                <div className="flex gap-2">
                  <TooltipButton 
                    variant="secondary" 
                    size="sm"
                    action="filtrar"
                    tooltipText="Filtrar grupos de gramática"
                  >
                    Gramática
                  </TooltipButton>
                  <TooltipButton 
                    variant="outline" 
                    size="sm"
                    action="filtrar"
                    tooltipText="Filtrar grupos de conversação"
                  >
                    Conversação
                  </TooltipButton>
                  <TooltipButton 
                    variant="outline" 
                    size="sm"
                    action="filtrar"
                    tooltipText="Filtrar grupos de preparação para exames"
                  >
                    Exames
                  </TooltipButton>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {studyGroups.map((group) => (
                <StudyGroupCard key={group.id} group={group} />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <TooltipButton 
                variant="outline"
                action="carregar"
                tooltipText="Carregar mais grupos de estudo"
              >
                Carregar Mais Grupos +
              </TooltipButton>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <GroupStats />
            <PopularTags />
            <UpcomingActivities />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyGroups;