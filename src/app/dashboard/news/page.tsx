import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export default function Page() {
  const linkImage =
    "https://cdn.rri.co.id/berita/Bukittinggi/o/1715917227082-PHOTO-2024-05-12-13-00-02/gl9b5uz4v7ahbtw.jpeg";
  return (
    <div className="w-full">
      <div className="container mx-auto py-8">
        {/* Featured Article */}
        <div className="flex lg:flex-row flex-col gap-10 mb-14">
          {/* main news */}
          <div className="w-3/5">
            <Image
              src={linkImage}
              alt="Earthquake damage in Myanmar"
              width={777}
              height={600}
              className="rounded-lg object-cover w-full"
              priority
            />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-5">
              Post-Earthquake Myanmar: The Need for Emergency Resources
            </h1>
          </div>
          {/* other news */}
          <div className="w-2/5 lg:overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Image
                  src={linkImage}
                  alt="Earthquake damage in Myanmar"
                  width={180}
                  height={96}
                  className="rounded-lg object-cover h-auto"
                  priority
                />
                <div className="flex flex-col">
                  <h1 className="text-[16px] md:text-xl font-bold tracking-tight mb-4">
                    Post-Earthquake Myanmar: The Need for Emergency Resources
                  </h1>
                  <p className="text-[12px] text-gray-600 mb-4">
                    Following the devastating earthquake in Myanmar, there is an
                    urgent need for emergency resources to support affected
                    communities and rebuild infrastructure.
                  </p>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      Breaking News
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> 15 Minutes
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Image
                  src={linkImage}
                  alt="Earthquake damage in Myanmar"
                  width={180}
                  height={96}
                  className="rounded-lg object-cover h-auto"
                  priority
                />
                <div className="flex flex-col">
                  <h1 className="text-[16px] md:text-xl font-bold tracking-tight mb-4">
                    Post-Earthquake Myanmar: The Need for Emergency Resources
                  </h1>
                  <p className="text-[12px] text-gray-600 mb-4">
                    Following the devastating earthquake in Myanmar, there is an
                    urgent need for emergency resources to support affected
                    communities and rebuild infrastructure.
                  </p>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      Breaking News
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> 15 Minutes
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Image
                  src={linkImage}
                  alt="Earthquake damage in Myanmar"
                  width={180}
                  height={96}
                  className="rounded-lg object-cover h-auto"
                  priority
                />
                <div className="flex flex-col">
                  <h1 className="text-[16px] md:text-xl font-bold tracking-tight mb-4">
                    Post-Earthquake Myanmar: The Need for Emergency Resources
                  </h1>
                  <p className="text-[12px] text-gray-600 mb-4">
                    Following the devastating earthquake in Myanmar, there is an
                    urgent need for emergency resources to support affected
                    communities and rebuild infrastructure.
                  </p>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      Breaking News
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> 15 Minutes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="overflow-hidden">
            <div className="relative h-72 mx-4">
              <Image
                src={linkImage}
                alt="Drone monitoring forest fires"
                fill
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <CardContent className="px-4">
              <h2 className="text-xl font-bold mb-2">
                Drones enable rapid detection of forest fires in Bosnia and
                Herzegovina
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                In Herzegovina-Neretva Canton, forest fires seriously threaten
                nature, property, and human lives every year. We introduced new
                technology that will transform how emergency services respond to
                fire.
              </p>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" /> 4 Minutes
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="overflow-hidden">
            <div className="relative h-72 mx-4">
              <Image
                src={linkImage}
                alt="Drone monitoring forest fires"
                fill
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <CardContent className="px-4">
              <h2 className="text-xl font-bold mb-2">
                Alerts! How Our Early Warning System Keeps Communities Safe and
                Ready
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                Sitting on her sofa, watching updates on her television, Ma.
                Lourdes D. Ramas keeps her Go Bag ready, waiting for any new
                alerts on her phone. Though her house stands just a few meters
                from a river basin in Surigao del Sur, she remains calm.
              </p>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" /> 10 Minutes
              </div>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="overflow-hidden">
            <div className="relative h-72 mx-4">
              <Image
                src={linkImage}
                alt="Drone monitoring forest fires"
                fill
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <CardContent className="px-4">
              <h2 className="text-xl font-bold mb-2">
                Urgent Appeal for the Immediate Release of Abdulrahman Yusuf
                Al-Qaradawi
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                We, the undersigned organizations, write to express our deep
                concern and call for your urgent intervention regarding the
                ongoing detention of renowned poet and activist Abdulrahman
                Yusuf Al-Qaradawi.
              </p>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" /> 19 Minutes
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
