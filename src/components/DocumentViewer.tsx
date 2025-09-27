import { useState } from "react";
import { 
  FileText, 
  Download, 
  Play, 
  Pause, 
  BookOpen, 
  Brain, 
  Clock, 
  Star,
  MessageCircle,
  X,
  Plus,
  Volume2,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DocumentViewerProps {
  open: boolean;
  onClose: () => void;
  documentId: string | null;
}

// Mock document data
const mockDocument = {
  id: "1",
  title: "Q3 Financial Report 2024",
  type: "PDF",
  uploadedAt: "2 hours ago",
  uploadedBy: "Finance Department",
  fileSize: "2.4 MB",
  pages: 24,
  summary: "This quarterly financial report presents a comprehensive analysis of KMRL's financial performance for Q3 2024. The report shows a 15% increase in revenue compared to the previous quarter, driven primarily by increased ridership and operational efficiency improvements. Key highlights include reduced operational costs, improved infrastructure maintenance, and strategic investments in future expansion projects.",
  aiTags: ["Finance", "Report", "Q3", "Revenue", "Analysis"],
  content: `KERALA METRO RAIL LIMITED
Q3 FINANCIAL REPORT 2024

EXECUTIVE SUMMARY
Kerala Metro Rail Limited (KMRL) presents the financial performance report for the third quarter of 2024. This period has shown remarkable growth and operational excellence.

KEY FINANCIAL HIGHLIGHTS
• Total Revenue: ₹245.6 crores (15% increase from Q2)
• Operating Expenses: ₹198.3 crores (8% increase from Q2)
• Net Profit: ₹47.3 crores (35% increase from Q2)
• EBITDA Margin: 23.8%

OPERATIONAL METRICS
• Daily Ridership: 4.2 lakh passengers
• On-time Performance: 98.5%
• Energy Efficiency: 15% improvement
• Customer Satisfaction: 4.6/5.0

DEPARTMENT-WISE BREAKDOWN
1. Operations & Maintenance: ₹145.2 crores
2. Infrastructure Development: ₹32.1 crores
3. Technology & Innovation: ₹12.8 crores
4. Human Resources: ₹8.2 crores

FUTURE OUTLOOK
The positive trends observed in Q3 2024 position KMRL well for continued growth. Strategic initiatives in Phase 2 expansion and smart city integration are expected to drive further improvements in subsequent quarters.`,
  notes: [
    {
      id: "1",
      author: "Rajesh Kumar",
      content: "Revenue growth is impressive. Need to focus on cost optimization.",
      timestamp: "1 hour ago"
    },
    {
      id: "2", 
      author: "Priya Singh",
      content: "The operational efficiency metrics look excellent.",
      timestamp: "30 minutes ago"
    }
  ],
  reminders: [
    {
      id: "1",
      title: "Board Meeting Discussion",
      date: "Tomorrow at 10:00 AM",
      description: "Present Q3 findings to board members"
    }
  ]
};

export const DocumentViewer = ({ open, onClose, documentId }: DocumentViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [newNote, setNewNote] = useState("");
  const [currentView, setCurrentView] = useState<"summary" | "original">("summary");

  const handlePlaySummary = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate audio playback
      const interval = setInterval(() => {
        setPlaybackProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${mockDocument.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Add note logic would go here
      setNewNote("");
    }
  };

  if (!documentId) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center justify-between text-xl">
            <span className="flex items-center">
              <FileText className="mr-3 h-6 w-6 text-primary" />
              {mockDocument.title}
            </span>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-0 bg-primary/10 text-primary">{mockDocument.type}</Badge>
              <Badge variant="secondary" className="border-0 bg-muted">{mockDocument.fileSize}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6">
          {/* Left Panel - Document Viewer */}
          <div className="lg:col-span-3 space-y-6">
            {/* Clean Document Actions */}
            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <Button
                  variant={currentView === "summary" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("summary")}
                  className="rounded-lg"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  AI Summary
                </Button>
                <Button
                  variant={currentView === "original" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("original")}
                  className="rounded-lg"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Original
                </Button>
              </div>

              <div className="flex items-center space-x-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handlePlaySummary}
                  className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 rounded-lg"
                >
                  {isPlaying ? (
                    <Pause className="mr-2 h-4 w-4" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  🎧 Podcast
                </Button>
                <Button size="sm" variant="outline" onClick={handleDownload} className="rounded-lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            {/* Audio Playback Progress */}
            {isPlaying && (
              <Card className="p-4">
                <div className="flex items-center space-x-4">
                  <Volume2 className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <Progress value={playbackProgress} className="mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Playing AI-generated summary...
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setIsPlaying(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Document Content */}
            <Card className="border-0 shadow-lg bg-background">
              <CardContent className="p-8">
                {currentView === "summary" ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">AI Summary</h3>
                        <p className="text-sm text-muted-foreground">Automatically generated insights</p>
                      </div>
                    </div>
                    <div className="prose prose-base max-w-none">
                      <p className="text-foreground leading-relaxed text-base">
                        {mockDocument.summary}
                      </p>
                    </div>
                    
                    {/* Critical Insights Panel */}
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/10">
                      <h4 className="font-semibold mb-3 text-primary">Critical Insights</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-warning" />
                          <span>Board presentation deadline: Tomorrow 10:00 AM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <span>15% revenue increase requires compliance review</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* AI Tags */}
                    <div className="flex items-center space-x-2 pt-4 border-t border-border/50">
                      <span className="text-sm font-medium">AI Tags:</span>
                      {mockDocument.aiTags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs border-0 bg-primary/10 text-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Original Document</h3>
                        <p className="text-sm text-muted-foreground">{mockDocument.pages} pages</p>
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <div className="bg-muted/20 p-6 rounded-xl border border-border/50 overflow-auto max-h-[600px]">
                        <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                          {mockDocument.content}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Insights & Collaboration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">Document Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Uploaded</span>
                    <span className="font-medium">{mockDocument.uploadedAt}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Department</span>
                    <span className="font-medium">{mockDocument.uploadedBy}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">File size</span>
                    <span className="font-medium">{mockDocument.fileSize}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Pages</span>
                    <span className="font-medium">{mockDocument.pages}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes & Collaboration */}
            <Card className="border-0 shadow-lg">
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="notes" className="rounded-lg">Notes</TabsTrigger>
                  <TabsTrigger value="reminders" className="rounded-lg">Reminders</TabsTrigger>
                </TabsList>
                
                <TabsContent value="notes" className="space-y-4 p-6">
                  {/* Add New Note */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Share your thoughts about this document..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="text-sm border-0 bg-muted/30 rounded-lg"
                      rows={3}
                    />
                    <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()} className="rounded-lg">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  {/* Existing Notes */}
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {mockDocument.notes.map((note) => (
                      <div key={note.id} className="p-4 bg-muted/20 rounded-lg border border-border/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{note.author}</span>
                          <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                        </div>
                        <p className="text-sm text-foreground">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reminders" className="space-y-4 p-6">
                  <Button size="sm" variant="outline" className="w-full rounded-lg border-primary/20 bg-primary/5 text-primary hover:bg-primary/10">
                    <Clock className="mr-2 h-4 w-4" />
                    Set New Reminder
                  </Button>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    {mockDocument.reminders.map((reminder) => (
                      <div key={reminder.id} className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{reminder.title}</span>
                          <Clock className="h-4 w-4 text-warning" />
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{reminder.date}</p>
                        <p className="text-sm text-foreground">{reminder.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
