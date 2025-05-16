import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import newsDataJson from "@/lib/data-news.json"; // Import data berita

interface NewsItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const newsData: NewsItem[] = newsDataJson;

export default function Page() {
  const featuredArticle = newsData[0];
  const otherNewsArticles = newsData.slice(1, 4);
  const cardNewsArticles = newsData.slice(4, 7);

  return (
    <div className="w-full">
      <div className="container mx-auto py-8">
        {/* Featured Article */}
        <div className="flex pl-4 lg:flex-row flex-col gap-10 mb-14">
          {/* main news */}
          {featuredArticle && (
            <div className="w-full lg:w-3/5 relative h-[400px] lg:h-[600px]">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="rounded-lg object-cover"
                priority
              />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-5 absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-lg">
                {featuredArticle.title}
              </h1>
            </div>
          )}
          {/* other news */}
          {otherNewsArticles.length > 0 && (
            <div className="w-full lg:w-2/5 lg:max-h-[600px] lg:overflow-y-auto">
              <div className="flex flex-col gap-4">
                {otherNewsArticles.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-4"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={180}
                      height={96}
                      className="rounded-lg object-cover md:h-24 md:w-auto"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[16px] md:text-xl font-bold tracking-tight mb-2">
                        {item.title}
                      </h1>
                      {item.description && (
                        <p className="text-[12px] text-gray-600 mb-2 line-clamp-3">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center mt-auto">
                        <Badge variant="outline" className="mr-2">
                          Breaking News
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" /> 15 Minutes
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* News Cards */}
        {cardNewsArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardNewsArticles.map((item) => (
              <Card key={item.id} className="overflow-hidden flex flex-col">
                <div className="relative h-72 mx-4 mt-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="rounded-lg object-cover w-full h-auto"
                  />
                </div>
                <CardContent className="px-4 pt-4 pb-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-4">
                    {item.description}
                  </p>
                  <div className="flex items-center text-gray-500 mt-auto">
                    <Clock className="h-4 w-4 mr-1" /> 4 Minutes
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
