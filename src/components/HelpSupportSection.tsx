import { useState } from "react";
import { HelpCircle, Video, BookOpen, MessageCircle, Search, ChevronRight, Play, FileText, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HelpSupportSectionProps {}

// Mock tutorial videos
const tutorialVideos = [
  {
    id: "tutorial1",
    title: "Getting Started with KMRL Document Platform",
    duration: "5:32",
    description: "Learn the basics of uploading, organizing, and searching documents",
    thumbnail: "/api/placeholder/300/180",
    category: "Getting Started"
  },
  {
    id: "tutorial2", 
    title: "AI Features Overview",
    duration: "7:45",
    description: "Discover how AI summaries, auto-tagging, and smart reminders work",
    thumbnail: "/api/placeholder/300/180",
    category: "AI Features"
  },
  {
    id: "tutorial3",
    title: "Setting Up Notifications and Reminders",
    duration: "4:18",
    description: "Configure your notification preferences and create effective reminders",
    thumbnail: "/api/placeholder/300/180", 
    category: "Notifications"
  },
  {
    id: "tutorial4",
    title: "Collaborating with Team Members",
    duration: "6:23",
    description: "Share documents, create notices, and work with department colleagues",
    thumbnail: "/api/placeholder/300/180",
    category: "Collaboration"
  }
];

// Mock FAQ data
const faqData = [
  {
    category: "General",
    questions: [
      {
        id: "faq1",
        question: "How do I upload a document to the platform?",
        answer: "You can upload documents by clicking the 'Upload Document' button in the dashboard or navigation panel. Supported formats include PDF, DOCX, XLSX, and images. The AI will automatically process and categorize your document."
      },
      {
        id: "faq2", 
        question: "What file formats are supported?",
        answer: "We support PDF, Microsoft Office documents (DOCX, XLSX, PPTX), images (JPG, PNG), and text files. Maximum file size is 50MB per document."
      },
      {
        id: "faq3",
        question: "How does the AI summarization work?",
        answer: "Our AI automatically analyzes uploaded documents and creates concise summaries highlighting key points. You can also listen to audio versions of these summaries."
      }
    ]
  },
  {
    category: "AI Features",
    questions: [
      {
        id: "faq4",
        question: "How accurate are the AI-generated tags?",
        answer: "Our AI tagging system has a 90%+ accuracy rate. Tags are based on document content analysis and can be manually edited if needed."
      },
      {
        id: "faq5",
        question: "Can I disable AI features?",
        answer: "Yes, you can toggle AI features on/off in the AI Features section. This includes auto-summaries, smart tagging, and reminder suggestions."
      }
    ]
  },
  {
    category: "Security",
    questions: [
      {
        id: "faq6",
        question: "How secure is my data?",
        answer: "All documents are encrypted at rest and in transit. We follow industry-standard security practices and comply with data protection regulations."
      },
      {
        id: "faq7",
        question: "Who can access my documents?",
        answer: "Document access is controlled by role-based permissions. Only authorized team members and departments can view specific documents based on your organization's settings."
      }
    ]
  }
];

// Mock troubleshooting guide
const troubleshootingSteps = [
  {
    issue: "Documents not uploading",
    solutions: [
      "Check file size (must be under 50MB)",
      "Verify file format is supported",
      "Clear browser cache and cookies",
      "Try uploading from a different browser",
      "Contact support if issue persists"
    ]
  },
  {
    issue: "AI features not working",
    solutions: [
      "Ensure AI features are enabled in settings",
      "Check document format compatibility",
      "Wait for processing to complete (may take 1-2 minutes)",
      "Refresh the page and try again",
      "Contact technical support"
    ]
  },
  {
    issue: "Cannot access certain documents", 
    solutions: [
      "Verify you have proper permissions",
      "Check if document was moved or deleted",
      "Contact document owner or administrator",
      "Ensure you're logged into correct account",
      "Review access control settings"
    ]
  }
];

export const HelpSupportSection = ({ }: HelpSupportSectionProps) => {
  const [activeTab, setActiveTab] = useState("tutorials");
  const [searchTerm, setSearchTerm] = useState("");
  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "general",
    message: "",
    urgency: "normal"
  });

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleSubmitSupport = () => {
    // Handle support form submission
    console.log("Support form submitted:", supportForm);
    setSupportForm({
      subject: "",
      category: "general", 
      message: "",
      urgency: "normal"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Help & Support</h2>
        <p className="text-muted-foreground">Find answers, watch tutorials, and get the help you need</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("tutorials")}>
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground">Step-by-step guides</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("faq")}>
          <CardContent className="p-4 text-center">
            <HelpCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">FAQ</h3>
            <p className="text-sm text-muted-foreground">Common questions</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("contact")}>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">Contact Support</h3>
            <p className="text-sm text-muted-foreground">Get direct help</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tutorials">
            <Video className="h-4 w-4 mr-1" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-1" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="troubleshooting">
            <FileText className="h-4 w-4 mr-1" />
            Troubleshooting
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageCircle className="h-4 w-4 mr-1" />
            Contact
          </TabsTrigger>
        </TabsList>

        {/* Video Tutorials */}
        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorialVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                  <Badge className="absolute top-2 right-2">{video.duration}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                    <Badge variant="outline" className="text-xs">{video.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                  <Button variant="outline" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-6">
            {filteredFAQ.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-medium mb-3">{category.category}</h3>
                <Accordion type="multiple" className="space-y-2">
                  {category.questions.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Troubleshooting */}
        <TabsContent value="troubleshooting" className="space-y-4">
          <h3 className="text-lg font-medium">Common Issues & Solutions</h3>
          
          <div className="space-y-4">
            {troubleshootingSteps.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base text-destructive">{item.issue}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {item.solutions.map((solution, solutionIndex) => (
                      <div key={solutionIndex} className="flex items-start space-x-2">
                        <span className="text-sm font-medium text-primary mt-0.5">{solutionIndex + 1}.</span>
                        <span className="text-sm">{solution}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contact Support */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@kmrl.gov.in</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+91-484-2533-800</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM IST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Support Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select 
                      className="w-full p-2 border rounded-md text-sm"
                      value={supportForm.category}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="general">General</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account & Access</option>
                      <option value="ai-features">AI Features</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Urgency</label>
                    <select 
                      className="w-full p-2 border rounded-md text-sm"
                      value={supportForm.urgency}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, urgency: e.target.value }))}
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Describe your issue in detail..."
                    rows={4}
                    value={supportForm.message}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                <Button 
                  className="w-full"
                  onClick={handleSubmitSupport}
                  disabled={!supportForm.subject || !supportForm.message}
                >
                  Submit Support Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
