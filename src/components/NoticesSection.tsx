import { useState } from "react";
import { Bell, Plus, Calendar, User, Check, History, X, Paperclip, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "../contexts/TranslationContext"; // Import translation context

interface NoticesSectionProps {
  onNoticeClick: (noticeId: string) => void;
}

export const NoticesSection = ({ onNoticeClick }: NoticesSectionProps) => {
  const { t } = useTranslation(); // Use translation hook

  // Mock notices data with translation keys
  const initialNoticesData = [
    {
      id: "notice1",
      titleKey: "notices.system.maintenance.title",
      messageKey: "notices.system.maintenance.message",
      priority: "high",
      departmentKey: "notices.departments.it",
      authorKey: "notices.authors.it.admin",
      timestamp: "2024-01-15T09:00:00Z",
      isRead: false,
      attachments: []
    },
    {
      id: "notice2",
      titleKey: "notices.safety.protocol.title",
      messageKey: "notices.safety.protocol.message",
      priority: "urgent",
      departmentKey: "notices.departments.safety", 
      authorKey: "notices.authors.safety.officer",
      timestamp: "2024-01-14T14:30:00Z",
      isRead: false,
      attachments: ["safety_protocol_v2.pdf"]
    },
    {
      id: "notice3",
      titleKey: "notices.team.meeting.title",
      messageKey: "notices.team.meeting.message",
      priority: "normal",
      departmentKey: "notices.departments.hr",
      authorKey: "notices.authors.hr.manager", 
      timestamp: "2024-01-13T11:15:00Z",
      isRead: true,
      attachments: []
    }
  ];

  const departmentsData = [
    { key: "all", labelKey: "notices.departments.all" },
    { key: "engineering", labelKey: "notices.departments.engineering" },
    { key: "safety", labelKey: "notices.departments.safety" },
    { key: "finance", labelKey: "notices.departments.finance" },
    { key: "hr", labelKey: "notices.departments.hr" },
    { key: "it", labelKey: "notices.departments.it" },
    { key: "operations", labelKey: "notices.departments.operations" }
  ];

  const [notices, setNotices] = useState(initialNoticesData);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  
  // Compose form state
  const [composeForm, setComposeForm] = useState({
    title: "",
    message: "",
    priority: "normal",
    department: "all",
    attachments: []
  });

  const handleMarkAsRead = (noticeId: string) => {
    setNotices(prev => prev.map(notice => 
      notice.id === noticeId 
        ? { ...notice, isRead: true }
        : notice
    ));
  };

  const handleComposeNotice = () => {
    const newNotice = {
      id: `notice${Date.now()}`,
      titleKey: "notices.custom.title", // For user-created notices, we'll store the actual text
      messageKey: "notices.custom.message",
      title: composeForm.title, // Store actual text for custom notices
      message: composeForm.message,
      priority: composeForm.priority,
      departmentKey: departmentsData.find(d => d.key === composeForm.department)?.labelKey || "notices.departments.all",
      authorKey: "notices.authors.current.user",
      timestamp: new Date().toISOString(),
      isRead: false,
      attachments: composeForm.attachments as string[]
    };

    setNotices(prev => [newNotice, ...prev]);
    setComposeForm({
      title: "",
      message: "",
      priority: "normal", 
      department: "all",
      attachments: []
    });
    setIsComposeOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      default: return "secondary";
    }
  };

  const getPriorityIcon = (priority: string) => {
    return priority === "urgent" ? "🚨" : priority === "high" ? "⚠️" : "ℹ️";
  };

  // Filter notices based on selected filters
  const filteredNotices = notices.filter(notice => {
    const matchesDepartment = filterDepartment === "all" || 
      notice.departmentKey === departmentsData.find(d => d.key === filterDepartment)?.labelKey;
    const matchesPriority = filterPriority === "all" || notice.priority === filterPriority;
    return matchesDepartment && matchesPriority;
  });

  const unreadNotices = filteredNotices.filter(notice => !notice.isRead);
  const readNotices = filteredNotices.filter(notice => notice.isRead);

  const getNoticeTitle = (notice: any) => {
    return notice.title || t(notice.titleKey);
  };

  const getNoticeMessage = (notice: any) => {
    return notice.message || t(notice.messageKey);
  };

  const NoticeCard = ({ notice, showActions = true }: { notice: any, showActions?: boolean }) => (
    <Card className={`cursor-pointer hover:shadow-md transition-all ${!notice.isRead ? 'border-primary bg-primary/5' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm">{getPriorityIcon(notice.priority)}</span>
              <CardTitle className="text-sm font-medium">{getNoticeTitle(notice)}</CardTitle>
              {!notice.isRead && (
                <Badge variant="default" className="text-xs">{t('notices.badge.new')}</Badge>
              )}
            </div>
            <Badge variant={getPriorityColor(notice.priority)} className="text-xs">
              {t(`notices.priority.${notice.priority}`)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">{getNoticeMessage(notice)}</p>
        
        {notice.attachments && notice.attachments.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center space-x-1 mb-2">
              <Paperclip className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{t('notices.attachments')}</span>
            </div>
            {notice.attachments.map((attachment: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs mr-1">
                {attachment}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-1 text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{t(notice.authorKey)} • {t(notice.departmentKey)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(notice.timestamp).toLocaleString()}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => onNoticeClick(notice.id)}
              className="flex-1"
            >
              {t('notices.button.view.details')}
            </Button>
            {!notice.isRead && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleMarkAsRead(notice.id)}
              >
                <Check className="h-3 w-3 mr-1" />
                {t('notices.button.mark.read')}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{t('notices.title')}</h2>
          <p className="text-muted-foreground">{t('notices.description')}</p>
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('notices.button.compose')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t('notices.compose.title')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t('notices.compose.form.title')}</label>
                <Input
                  placeholder={t('notices.compose.form.title.placeholder')}
                  value={composeForm.title}
                  onChange={(e) => setComposeForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t('notices.compose.form.message')}</label>
                <Textarea
                  placeholder={t('notices.compose.form.message.placeholder')}
                  rows={4}
                  value={composeForm.message}
                  onChange={(e) => setComposeForm(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t('notices.compose.form.priority')}</label>
                  <Select 
                    value={composeForm.priority} 
                    onValueChange={(value) => setComposeForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">{t('notices.priority.normal')}</SelectItem>
                      <SelectItem value="high">{t('notices.priority.high')}</SelectItem>
                      <SelectItem value="urgent">{t('notices.priority.urgent')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">{t('notices.compose.form.department')}</label>
                  <Select 
                    value={composeForm.department} 
                    onValueChange={(value) => setComposeForm(prev => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentsData.map((dept) => (
                        <SelectItem key={dept.key} value={dept.key}>{t(dept.labelKey)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button 
                  onClick={handleComposeNotice}
                  disabled={!composeForm.title || !composeForm.message}
                >
                  {t('notices.button.publish')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Critical Notices */}
      {unreadNotices.filter(n => n.priority === "urgent").length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              {t('notices.critical.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unreadNotices.filter(n => n.priority === "urgent").slice(0, 3).map((notice) => (
                <div key={notice.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{getNoticeTitle(notice)}</h4>
                    <p className="text-xs text-muted-foreground">{t(notice.departmentKey)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => onNoticeClick(notice.id)}>
                      {t('notices.button.view')}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notice.id)}>
                      {t('notices.button.mark.read')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Bar */}
      <div className="flex space-x-4">
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder={t('notices.filter.department')} />
          </SelectTrigger>
          <SelectContent>
            {departmentsData.map((dept) => (
              <SelectItem key={dept.key} value={dept.key}>{t(dept.labelKey)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={t('notices.filter.priority')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('notices.priority.all')}</SelectItem>
            <SelectItem value="urgent">{t('notices.priority.urgent')}</SelectItem>
            <SelectItem value="high">{t('notices.priority.high')}</SelectItem>
            <SelectItem value="normal">{t('notices.priority.normal')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notice Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredNotices.map((notice) => (
          <Card key={notice.id} className={`hover:shadow-sm transition-all ${!notice.isRead ? 'border-l-4 border-l-primary' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant={getPriorityColor(notice.priority)} className="text-xs">
                    {t(`notices.priority.${notice.priority}`).toUpperCase()}
                  </Badge>
                  <h3 className="font-medium">{getNoticeTitle(notice)}</h3>
                  {!notice.isRead && <Badge variant="outline" className="text-xs">{t('notices.badge.new')}</Badge>}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{getNoticeMessage(notice)}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>{t(notice.departmentKey)}</span>
                <span>{new Date(notice.timestamp).toLocaleDateString()}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => onNoticeClick(notice.id)}>
                  {t('notices.button.view.details')}
                </Button>
                {!notice.isRead && (
                  <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notice.id)}>
                    {t('notices.button.mark.read')}
                  </Button>
                )}
                <Button variant="outline" size="sm">{t('notices.button.share')}</Button>
                <Button variant="outline" size="sm">{t('notices.button.archive')}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotices.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">{t('notices.empty.title')}</h3>
          <p className="text-muted-foreground">{t('notices.empty.description')}</p>
        </div>
      )}
    </div>
  );
};