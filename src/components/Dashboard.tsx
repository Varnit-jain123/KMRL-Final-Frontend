

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
import { useTranslation } from "../contexts/TranslationContext"; // Import the translation hook

interface DashboardProps {
  onDocumentClick: (docId: string) => void;
  onUploadClick: () => void;
  onNoticeClick: (noticeId: string) => void;
  onReminderClick?: () => void;
  setActiveSection?: (section: string) => void;
}

export const Dashboard = ({ onDocumentClick, onUploadClick, onNoticeClick, onReminderClick, setActiveSection }: DashboardProps) => {
  const { t } = useTranslation(); // Use translation hook
  const [autoModeEnabled, setAutoModeEnabled] = useState(true);

  // Mock data - keeping the same structure but will use translated content in render
  const recentDocuments = [
    {
      id: "1",
      titleKey: "dashboard.documents.q3.report.title",
      type: "PDF",
      uploadedAt: "dashboard.time.hours.ago.2",
      summaryKey: "dashboard.documents.q3.report.summary",
      aiTags: ["dashboard.tags.finance", "dashboard.tags.report", "dashboard.tags.q3"],
      priority: "high",
      hasReminders: true,
      downloadCount: 23
    },
    {
      id: "2", 
      titleKey: "dashboard.documents.metro.timeline.title",
      type: "DOCX",
      uploadedAt: "dashboard.time.hours.ago.5",
      summaryKey: "dashboard.documents.metro.timeline.summary",
      aiTags: ["dashboard.tags.project", "dashboard.tags.timeline", "dashboard.tags.metro"],
      priority: "medium",
      hasReminders: false,
      downloadCount: 12
    },
    {
      id: "3",
      titleKey: "dashboard.documents.safety.guidelines.title",
      type: "PDF", 
      uploadedAt: "dashboard.time.day.ago.1",
      summaryKey: "dashboard.documents.safety.guidelines.summary",
      aiTags: ["dashboard.tags.safety", "dashboard.tags.guidelines", "dashboard.tags.construction"],
      priority: "high",
      hasReminders: true,
      downloadCount: 45
    }
  ];

  const notices = [
    {
      id: "1",
      titleKey: "dashboard.notices.board.meeting.title",
      messageKey: "dashboard.notices.board.meeting.message",
      priority: "high",
      departmentKey: "dashboard.departments.administration",
      unread: true,
      timestampKey: "dashboard.time.minutes.ago.30"
    },
    {
      id: "2",
      titleKey: "dashboard.notices.document.policy.title",
      messageKey: "dashboard.notices.document.policy.message",
      priority: "medium", 
      departmentKey: "dashboard.departments.it",
      unread: false,
      timestampKey: "dashboard.time.hours.ago.2"
    }
  ];

  const aiInsights = [
    {
      titleKey: "dashboard.insights.documents.processed",
      value: "24",
      change: "+12%",
      icon: Brain
    },
    {
      titleKey: "dashboard.insights.ai.summaries",
      value: "18",
      change: "+8%",
      icon: FileText
    },
    {
      titleKey: "dashboard.insights.pending.reviews",
      value: "5",
      change: "-3%",
      icon: Clock
    }
  ];

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      {/* Clean Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-light text-foreground">{t('dashboard.welcome.title')}</h1>
        <p className="text-muted-foreground text-lg">{t('dashboard.welcome.subtitle')}</p>
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
                <p className="text-lg font-semibold text-foreground">{t('dashboard.actions.upload.title')}</p>
                <p className="text-sm text-muted-foreground">{t('dashboard.actions.upload.subtitle')}</p>
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
                <p className="text-lg font-semibold text-foreground">{t('dashboard.actions.ai.title')}</p>
                <p className="text-sm text-muted-foreground">{t('dashboard.actions.ai.subtitle')}</p>
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
                <p className="text-lg font-semibold text-foreground">{t('dashboard.actions.reminder.title')}</p>
                <p className="text-sm text-muted-foreground">{t('dashboard.actions.reminder.subtitle')}</p>
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
            {t('dashboard.insights.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">{t('dashboard.alerts.urgent.title')}</span>
              </div>
              <p className="text-xs text-muted-foreground">{t('dashboard.alerts.urgent.message')}</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">{t('dashboard.alerts.compliance.title')}</span>
              </div>
              <p className="text-xs text-muted-foreground">{t('dashboard.alerts.compliance.message')}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t('dashboard.alerts.priority.title')}</span>
              </div>
              <p className="text-xs text-muted-foreground">{t('dashboard.alerts.priority.message')}</p>
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
                {t('dashboard.notices.title')}
              </span>
              <Button variant="ghost" size="sm" className="text-xs">{t('common.view.all')}</Button>
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
                  <h4 className="text-sm font-medium text-foreground">{t(notice.titleKey)}</h4>
                  <div className="flex items-center space-x-2">
                    {notice.priority === "high" && (
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                    )}
                    {notice.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{t(notice.messageKey)}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs border-0 bg-background/50">{t(notice.departmentKey)}</Badge>
                  <span className="text-xs text-muted-foreground">{t(notice.timestampKey)}</span>
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
                {t('dashboard.documents.title')}
              </span>
              <Button variant="ghost" size="sm" className="text-xs">{t('common.view.all')}</Button>
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
                  <h4 className="text-sm font-medium text-foreground truncate">{t(doc.titleKey)}</h4>
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
                      {t(tag)}
                    </Badge>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{t(doc.uploadedAt)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};