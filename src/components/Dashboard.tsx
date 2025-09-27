import { useState } from "react";
import { 
  FileText, 
  Clock, 
  Brain, 
  Search, 
  Upload, 
  Star,
  TrendingUp,
  AlertCircle,
  Users,
  Download,
  Play,
  BookOpen,
  Bell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  onDocumentClick: (docId: string) => void;
  onUploadClick: () => void;
  onNoticeClick: (noticeId: string) => void;
  onReminderClick?: () => void;
  setActiveSection?: (section: string) => void;
}

// Mock data
const recentDocuments = [
  {
    id: "1",
    title: "Q3 Financial Report 2024",
    type: "PDF",
    uploadedAt: "2 hours ago",
    summary: "Quarterly financial analysis showing 15% growth in revenue with detailed breakdown of departmental expenses...",
    aiTags: ["Finance", "Report", "Q3"],
    priority: "high",
    hasReminders: true,
    downloadCount: 23
  },
  {
    id: "2", 
    title: "Metro Project Timeline",
    type: "DOCX",
    uploadedAt: "5 hours ago",
    summary: "Updated project timeline for Phase 2 metro construction with critical milestones and resource allocation...",
    aiTags: ["Project", "Timeline", "Metro"],
    priority: "medium",
    hasReminders: false,
    downloadCount: 12
  },
  {
    id: "3",
    title: "Safety Guidelines Update",
    type: "PDF", 
    uploadedAt: "1 day ago",
    summary: "Enhanced safety protocols for construction sites including new equipment requirements and training schedules...",
    aiTags: ["Safety", "Guidelines", "Construction"],
    priority: "high",
    hasReminders: true,
    downloadCount: 45
  }
];

const notices = [
  {
    id: "1",
    title: "Important: Board Meeting Tomorrow",
    message: "Monthly board meeting scheduled for 10:00 AM in Conference Room A",
    priority: "high",
    department: "Administration",
    unread: true,
    timestamp: "30 minutes ago"
  },
  {
    id: "2",
    title: "New Document Upload Policy",
    message: "Updated guidelines for document classification and AI tagging",
    priority: "medium", 
    department: "IT",
    unread: false,
    timestamp: "2 hours ago"
  }
];

const aiInsights = [
  {
    title: "Documents Processed Today",
    value: "24",
    change: "+12%",
    icon: Brain
  },
  {
    title: "AI Summaries Generated", 
    value: "18",
    change: "+8%",
    icon: FileText
  },
  {
    title: "Pending Reviews",
    value: "5",
    change: "-3%",
    icon: Clock
  }
];

export const Dashboard = ({ onDocumentClick, onUploadClick, onNoticeClick, onReminderClick, setActiveSection }: DashboardProps) => {
  const [autoModeEnabled, setAutoModeEnabled] = useState(true);

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      {/* Clean Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-light text-foreground">Hello, Employee</h1>
        <p className="text-muted-foreground text-lg">Today's overview at a glance</p>
      </div>

      {/* Quick Action Cards - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="kmrl-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onUploadClick()}>
          <CardContent className="p-6 text-center">
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Upload Document</p>
                <p className="text-sm text-muted-foreground">Quick upload with AI processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kmrl-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setActiveSection?.("ai-features")}>
          <CardContent className="p-6 text-center">
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">AI Features</p>
                <p className="text-sm text-muted-foreground">Generate summaries & insights</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kmrl-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onReminderClick?.()}>
          <CardContent className="p-6 text-center">
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Set Reminder</p>
                <p className="text-sm text-muted-foreground">Create deadline alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <Card className="kmrl-card border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl font-semibold">
            <Brain className="mr-3 h-6 w-6 text-primary" />
            AI Insights - Critical Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">Urgent Deadline</span>
              </div>
              <p className="text-xs text-muted-foreground">Q3 Board Report due tomorrow</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">Compliance Alert</span>
              </div>
              <p className="text-xs text-muted-foreground">Safety audit documents pending</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">High Priority</span>
              </div>
              <p className="text-xs text-muted-foreground">5 notices require attention</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simplified Recent Activity - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Notices - Clean Layout */}
        <Card className="kmrl-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg font-semibold">
              <span className="flex items-center">
                <Bell className="mr-3 h-5 w-5 text-primary" />
                Recent Notices
              </span>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notices.slice(0, 2).map((notice) => (
              <div
                key={notice.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  notice.unread ? "bg-primary/5 border border-primary/20" : "bg-muted/30"
                }`}
                onClick={() => onNoticeClick(notice.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">{notice.title}</h4>
                  <div className="flex items-center space-x-2">
                    {notice.priority === "high" && (
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                    )}
                    {notice.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{notice.message}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs border-0 bg-background/50">{notice.department}</Badge>
                  <span className="text-xs text-muted-foreground">{notice.timestamp}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Documents - Clean Layout */}
        <Card className="kmrl-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg font-semibold">
              <span className="flex items-center">
                <FileText className="mr-3 h-5 w-5 text-primary" />
                Recent Documents
              </span>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentDocuments.slice(0, 2).map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-lg bg-muted/30 cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-muted/50"
                onClick={() => onDocumentClick(doc.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground truncate">{doc.title}</h4>
                  <div className="flex items-center space-x-2">
                    {doc.priority === "high" && (
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                    )}
                    <Badge variant="outline" className="text-xs border-0 bg-background/50">{doc.type}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  {doc.aiTags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs border-0 bg-primary/10 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{doc.uploadedAt}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
};