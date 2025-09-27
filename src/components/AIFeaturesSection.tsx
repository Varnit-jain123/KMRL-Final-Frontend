import { useState } from "react";
import { Brain, Sparkles, Volume2, Play, Pause, Tag, Clock, FileText, Download, Zap, TrendingUp, Star, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface AIFeaturesSectionProps {
  onDocumentClick?: (docId: string) => void;
}

// Mock AI features data
const aiSummaries = [
  {
    id: "summary1",
    documentTitle: "Q3 Financial Report 2024",
    originalSize: "2.4 MB",
    summaryLength: "250 words",
    originalLength: "45 pages",
    confidence: 94,
    summary: "This quarterly report shows strong performance with 15% revenue growth. Key highlights include increased project completions, improved operational efficiency, and successful cost management strategies.",
    keyPoints: ["15% revenue growth", "Cost reduction of 8%", "3 major projects completed"],
    audioUrl: null,
    isPlaying: false
  },
  {
    id: "summary2", 
    documentTitle: "Metro Project Timeline",
    originalSize: "1.8 MB",
    summaryLength: "180 words",
    originalLength: "32 pages",
    confidence: 89,
    summary: "Phase 2 metro expansion timeline updated with new milestones. Project remains on schedule with 78% completion. Critical path items include station construction and signal system installation.",
    keyPoints: ["78% project completion", "On schedule delivery", "2 stations operational"],
    audioUrl: null,
    isPlaying: false
  }
];

const aiTags = [
  { document: "Budget Allocation Q4 2024", tags: ["Finance", "Budget", "Q4", "Allocation"], confidence: 96 },
  { document: "Safety Guidelines Update", tags: ["Safety", "Protocol", "Guidelines", "Training"], confidence: 92 },
  { document: "Employee Training Manual", tags: ["HR", "Training", "Onboarding", "Procedures"], confidence: 88 }
];

const aiReminders = [
  { id: "ai1", title: "Budget Review Deadline", document: "Budget Allocation Q4 2024", dueDate: "2024-01-25", confidence: 87 },
  { id: "ai2", title: "Safety Training Completion", document: "Safety Guidelines Update", dueDate: "2024-01-30", confidence: 91 },
  { id: "ai3", title: "Project Milestone Review", document: "Metro Project Timeline", dueDate: "2024-02-05", confidence: 84 }
];

export const AIFeaturesSection = ({ onDocumentClick }: AIFeaturesSectionProps) => {
  const { toast } = useToast();
  const [showSummary, setShowSummary] = useState<{id: string, text: string} | null>(null);

  const handleAIFeature = (feature: string, itemId: string) => {
    switch (feature) {
      case 'summary':
        // Generate a mock AI summary
        const summaryText = "This document contains important financial data for Q3 2024. Key highlights include a 15% increase in revenue, successful completion of metro line expansion project phase 2, and implementation of new safety protocols. The document recommends continued investment in infrastructure development and staff training programs. Critical deadlines identified: Budget review by Jan 25, Safety training completion by Jan 30, and Project milestone review by Feb 5.";
        
        setShowSummary({
          id: itemId,
          text: summaryText
        });
        
        toast({
          title: "Summary Generated",
          description: "AI summary is now displayed below.",
        });
        break;
        
      case 'tag':
        toast({
          title: "AI Auto-Tagging",
          description: "Analyzing document content and generating tags...",
        });
        setTimeout(() => {
          toast({
            title: "Tags Generated",
            description: "Document has been automatically tagged and categorized.",
          });
        }, 1500);
        break;
        
      case 'podcast-play':
        toast({
          title: "Playing Podcast",
          description: "Starting audio playback of the document summary...",
        });
        break;
        
      default:
        toast({
          title: "AI Feature",
          description: `${feature} functionality activated`,
        });
    }
  };

  const handleCopySummary = () => {
    if (showSummary) {
      navigator.clipboard.writeText(showSummary.text);
      toast({
        title: "Copied!",
        description: "Summary copied to clipboard.",
      });
    }
  };
  const [summaries, setSummaries] = useState(aiSummaries);
  const [autoSummariesEnabled, setAutoSummariesEnabled] = useState(true);
  const [autoTaggingEnabled, setAutoTaggingEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("summaries");

  const handlePlayAudio = (summaryId: string) => {
    setSummaries(prev => prev.map(summary => 
      summary.id === summaryId 
        ? { ...summary, isPlaying: !summary.isPlaying }
        : { ...summary, isPlaying: false }
    ));
    
    // Simulate audio playback
    setTimeout(() => {
      setSummaries(prev => prev.map(summary => 
        summary.id === summaryId 
          ? { ...summary, isPlaying: false }
          : summary
      ));
    }, 3000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 80) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold">AI Features</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Leverage cutting-edge AI to automatically process, summarize, and enhance your documents.
        </p>
      </div>

      {/* Feature Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summaries">
            <Brain className="h-4 w-4 mr-1" />
            Summaries
          </TabsTrigger>
          <TabsTrigger value="podcast">
            <Volume2 className="h-4 w-4 mr-1" />
            Podcast
          </TabsTrigger>
          <TabsTrigger value="tagging">
            <Tag className="h-4 w-4 mr-1" />
            Auto-Tagging
          </TabsTrigger>
        </TabsList>

        {/* AI Summaries Tab */}
        <TabsContent value="summaries" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summaries.map((summary) => (
              <Card key={summary.id} className="hover:shadow-sm transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium">{summary.documentTitle}</h3>
                    <Badge variant="outline" className="text-xs">{summary.confidence}%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{summary.summary}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Last processed: {summary.originalLength}
                  </p>
                  <Button size="sm" className="w-full" onClick={() => handleAIFeature('summary', summary.id)}>
                    <Brain className="h-3 w-3 mr-1" />
                    Generate Summary
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Generated Summary Display */}
          {showSummary && (
            <Card className="border-primary bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-primary" />
                    AI Generated Summary
                  </h4>
                  <Button size="sm" variant="outline" onClick={handleCopySummary}>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  {showSummary.text}
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Side Panel */}
          <Card className="bg-muted/5">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">AI Summary Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Summaries are generated automatically for all documents</li>
                <li>• Key points are extracted using advanced NLP</li>
                <li>• Confidence scores indicate processing accuracy</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Podcast Tab */}
        <TabsContent value="podcast" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summaries.map((summary) => (
              <Card key={summary.id} className="hover:shadow-sm transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium">{summary.documentTitle}</h3>
                    <Badge variant="outline" className="text-xs">5:32</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Audio summary available in English and Hindi
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Last generated: {summary.summaryLength}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handlePlayAudio(summary.id)}>
                      {summary.isPlaying ? (
                        <Pause className="h-3 w-3 mr-1" />
                      ) : (
                        <Play className="h-3 w-3 mr-1" />
                      )}
                      Listen
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Side Panel */}
          <Card className="bg-muted/5">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Podcast Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Natural voice synthesis in multiple languages</li>
                <li>• Adjustable playback speed and voice tone</li>
                <li>• Download audio for offline listening</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auto-Tagging Tab */}
        <TabsContent value="tagging" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiTags.map((item, index) => (
              <Card key={index} className="hover:shadow-sm transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium">{item.document}</h3>
                    <Badge variant="outline" className="text-xs">{item.confidence}%</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Last processed: Auto-categorized
                  </p>
                  <Button size="sm" className="w-full" onClick={() => handleAIFeature('tag', item.document)}>
                    <Tag className="h-3 w-3 mr-1" />
                    Auto-Tag Document
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Side Panel */}
          <Card className="bg-muted/5">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Auto-Tagging Instructions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Categories are automatically detected from content</li>
                <li>• Manual tag editing is available for fine-tuning</li>
                <li>• High confidence scores indicate accurate tagging</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};