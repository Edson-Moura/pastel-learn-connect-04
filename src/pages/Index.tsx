import { Header } from "@/components/Header";
import { UserStats } from "@/components/UserStats";
import { ActivityDashboard } from "@/components/ActivityDashboard";
import { PopularPosts } from "@/components/PopularPosts";
import { SuggestedGroups } from "@/components/SuggestedGroups";
import { MonthlyRanking } from "@/components/MonthlyRanking";
import { CommunityActivity } from "@/components/CommunityActivity";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <UserStats />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ActivityDashboard />
            <PopularPosts />
            <CommunityActivity />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SuggestedGroups />
            <MonthlyRanking />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
