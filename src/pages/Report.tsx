
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Report = () => {
  const [formData, setFormData] = useState({
    toolName: "",
    issueType: "",
    description: "",
    reporterEmail: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Issue report:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Report an Issue</CardTitle>
              <CardDescription>
                Help us maintain accurate information by reporting broken links, outdated tools, or incorrect data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="toolName">Tool Name</Label>
                  <Input
                    id="toolName"
                    value={formData.toolName}
                    onChange={(e) => setFormData({...formData, toolName: e.target.value})}
                    placeholder="Name of the tool you're reporting about"
                    required
                  />
                </div>
                
                <div>
                  <Label>Issue Type</Label>
                  <Select onValueChange={(value) => setFormData({...formData, issueType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="broken-link">Broken Link</SelectItem>
                      <SelectItem value="outdated-info">Outdated Information</SelectItem>
                      <SelectItem value="incorrect-category">Incorrect Category</SelectItem>
                      <SelectItem value="duplicate">Duplicate Entry</SelectItem>
                      <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Please describe the issue in detail"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Your Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.reporterEmail}
                    onChange={(e) => setFormData({...formData, reporterEmail: e.target.value})}
                    placeholder="For follow-up if needed"
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
