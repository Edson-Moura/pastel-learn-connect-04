import { Header } from "@/components/Header";
import { RankingFilters } from "@/components/RankingFilters";
import { UserRankingList } from "@/components/UserRankingList";
import { UserProfileCard } from "@/components/UserProfileCard";
import { AchievementsSection } from "@/components/AchievementsSection";
import { PerformanceChart } from "@/components/PerformanceChart";
import { NextGoals } from "@/components/NextGoals";
import { RecentActivities } from "@/components/RecentActivities";

const Ranking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <RankingFilters />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <UserRankingList />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <UserProfileCard />
            <AchievementsSection />
            <PerformanceChart />
            <NextGoals />
            <RecentActivities />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ranking;