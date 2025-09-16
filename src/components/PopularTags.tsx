import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const PopularTags = () => {
  const tags = [
    { name: "conversação", count: 245, color: "bg-green-100 text-green-800 hover:bg-green-200" },
    { name: "gramática", count: 189, color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    { name: "IELTS", count: 167, color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
    { name: "TOEFL", count: 143, color: "bg-orange-100 text-orange-800 hover:bg-orange-200" },
    { name: "business", count: 128, color: "bg-red-100 text-red-800 hover:bg-red-200" },
    { name: "fluência", count: 112, color: "bg-teal-100 text-teal-800 hover:bg-teal-200" }
  ];

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-foreground mb-4">Tags Populares</h3>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge 
            key={index}
            variant="secondary"
            className={`text-xs cursor-pointer transition-colors ${tag.color}`}
          >
            {tag.name}
            <span className="ml-1 opacity-75">({tag.count})</span>
          </Badge>
        ))}
      </div>
    </Card>
  );
};