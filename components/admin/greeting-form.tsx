"use client";

import { useState } from "react";
import { updateGreeting } from "@/app/actions/greeting";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export function GreetingForm({ initialValue }: { initialValue: string }) {
  const [text, setText] = useState(initialValue);
  const [isPending, setIsPending] = useState(false);

  const handleSave = async () => {
    setIsPending(true);
    try {
      const res = await updateGreeting(text);
      if (res.success) toast.success("Greeting updated successfully");
      else toast.error(res.error);
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Greeting Text
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the chairman's greeting here..."
          className="min-h-[300px] border-2 border-black font-medium leading-relaxed"
        />
        <Button 
          onClick={handleSave} 
          disabled={isPending}
          className="w-full sm:w-auto px-8"
        >
          {isPending ? "Saving..." : "Save Greeting"}
        </Button>
      </CardContent>
    </Card>
  );
}
