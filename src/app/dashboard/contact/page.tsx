import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#0040ff] mb-4">
            Contact our team
          </h1>
          <p className="text-lg">
            Got any questions about Veritrust? We&apos;re here to help.
          </p>
          <p className="text-lg">
            Chat to our friendly team 24/7 and get onboard in less than 5
            minutes.
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Select defaultValue="US">
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="AU">Australia</SelectItem>
                <SelectItem value="DE">Germany</SelectItem>
                <SelectItem value="FR">France</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Leave us a message..."
              className="min-h-[150px]"
            />
          </div>

          <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-6 text-lg">
            Send message
          </Button>
        </form>
      </div>
    </div>
  );
}
