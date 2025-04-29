import Image from "next/image";
import {
  ArrowDown,
  Copy,
  EyeOff,
  Send,
  BarChart3,
  Clock,
  Plus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WalletPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 pl-8 text-lg font-medium text-primary mb-2">
          <BarChart3 className="h-5 w-5" />
          <h2>Total Balance</h2>
        </div>
        <div className="flex justify-between gap-2">
          {/* Total Balance Section */}
          <div className="flex pl-8 flex-col justify-center items-center">
            <h1 className="text-6xl font-bold">$51</h1>
            <Badge variant="outline" className="mb-2 bg-[#0039c7] text-white">
              in CHEQ
            </Badge>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex flex-col items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-16 w-16 rounded-full"
                >
                  <ArrowDown className="h-6 w-6" />
                </Button>
                <span className="mt-2 text-sm">Withdraw</span>
              </div>
              <div className="flex flex-col items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-16 w-16 rounded-full"
                >
                  <Send className="h-6 w-6" />
                </Button>
                <span className="mt-2 text-sm">Send</span>
              </div>
              <div className="flex flex-col items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-16 w-16 rounded-full"
                >
                  <EyeOff className="h-6 w-6" />
                </Button>
                <span className="mt-2 text-sm">Hide</span>
              </div>
            </div>
          </div>
          {/* Wallet Card */}
          <div className="flex gap-6 mb-8">
            <div className="flex">
              <div className="flex flex-col w-[80vh] gap-4">
                <Card className="bg-[#333] text-white overflow-hidden min-w-0">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-base font-bold truncate">
                        AUNG MYAT ZIN
                      </h3>
                      <Badge className="bg-primary text-xs px-2 py-1">
                        AA73098
                      </Badge>
                    </div>
                    <div className="flex justify-center my-2 relative">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-white"
                          >
                            <path
                              d="M12 2L4 6V12C4 15.31 7.58 20 12 22C16.42 20 20 15.31 20 12V6L12 2Z"
                              fill="var(--color-white)"
                              stroke="var(--color-white)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="absolute top-0 left-0 w-3 h-3 transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 14L14 2M2 2L14 14"
                              stroke="var(--color-white)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="absolute top-0 right-0 w-3 h-3 transform translate-x-1/2 -translate-y-1/2">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 14L14 2M2 2L14 14"
                              stroke="var(--color-white)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 transform -translate-x-1/2 translate-y-1/2">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 14L14 2M2 2L14 14"
                              stroke="var(--color-white)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 transform translate-x-1/2 translate-y-1/2">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 14L14 2M2 2L14 14"
                              stroke="var(--color-white)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="bg-transparent text-white p-2 rounded-md text-[10px] mb-2">
                        <div className="flex justify-between items-center">
                          <span className="truncate">
                            bcxnis9301#sa0ch0a d819a2z89e4z9d42 02980d42
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 text-white"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="border border-dashed border-white rounded-md p-2 text-center">
                        <span className="text-white text-xs">
                          XXXX-XXXX-XXXX-XXXX-XXXX
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Create New Wallet Card */}
                <Card className="border border-dashed flex flex-col items-center justify-center p-3 min-w-0">
                  <div className="text-center">
                    <div className="mx-auto mb-2 h-8 w-8 rounded-full border border-dashed flex items-center justify-center">
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-medium mb-1">Create</h3>
                    <p className="text-xs text-muted-foreground">New Wallet</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Status Cards */}
            <div className="flex flex-col gap-2 md:flex-col md:gap-3 items-stretch min-w-0">
              <Card className="bg-green-100 border-green-200 flex-1 min-w-0">
                <CardContent className="p-2">
                  <h3 className="text-base font-medium text-green-800 mb-1 truncate">
                    Approved
                  </h3>
                  <p className="text-xs text-green-700 truncate line-clamp-2">
                    The program provider has reviewed your application and
                    confirmed your eligibility
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-amber-100 border-amber-200 flex-1 min-w-0">
                <CardContent className="p-2">
                  <h3 className="text-base font-medium text-amber-800 mb-1 truncate">
                    On Going
                  </h3>
                  <p className="text-xs text-amber-700 truncate">
                    The application is still under review by the program
                    administrators
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-red-100 border-red-200 flex-1 min-w-0">
                <CardContent className="p-2">
                  <h3 className="text-base font-medium text-red-800 mb-1 truncate">
                    Declined
                  </h3>
                  <p className="text-xs text-red-700 truncate">
                    The application did not meet the program's criteria or
                    requirements
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
      </div>

      {/* Wallet Cards and Status Section */}

      {/* Activity and History Tabs */}
      <Tabs defaultValue="activity" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="activity">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Program</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=32&width=32"
                            alt="UNHCR"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <span>Rohingya Social Aid Program</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-blue-600">
                      $51 <span className="text-xs font-normal">CHEQ</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 border-green-200"
                      >
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell>20 Aug 2025</TableCell>
                    <TableCell>
                      <Button variant="link" className="p-0 h-auto">
                        Click Here
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=32&width=32"
                            alt="Cash Assistance"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <span>Cash Assistance for Refugees</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-blue-600">
                      $45 <span className="text-xs font-normal">CHEQ</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800 border-amber-200"
                      >
                        On Progress
                      </Badge>
                    </TableCell>
                    <TableCell>29 Jul 2025</TableCell>
                    <TableCell>
                      <Button variant="link" className="p-0 h-auto">
                        Click Here
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=32&width=32"
                            alt="Livelihood"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <span>Livelihood help for Refugee</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-blue-600">
                      $39 <span className="text-xs font-normal">CHEQ</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 border-red-200"
                      >
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell>05 Jul 2025</TableCell>
                    <TableCell>
                      <Button variant="link" className="p-0 h-auto">
                        Click Here
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=32&width=32"
                            alt="UNHCR"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <span>Safe Shelters for Refugees</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-blue-600">
                      $26 <span className="text-xs font-normal">CHEQ</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800 border-amber-200"
                      >
                        On Progress
                      </Badge>
                    </TableCell>
                    <TableCell>12 Jun 2025</TableCell>
                    <TableCell>
                      <Button variant="link" className="p-0 h-auto">
                        Click Here
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs">
                        bcxnis9301#sa0ch0a
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        swj8hc05z9d42
                      </TableCell>
                      <TableCell>
                        {i % 2 === 0 ? "Withdraw" : "Transfer"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          Success
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground border-t pt-6">
        <p>
          Our platform ensures your data remains private and protected while
          making the aid distribution process transparent and efficient.
        </p>
        <Button variant="outline" className="rounded-full">
          <ArrowDown className="mr-2 h-4 w-4" />
          Scroll Down
        </Button>
      </div>
    </div>
  );
}
