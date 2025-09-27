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

interface NoticesSectionProps {
  onNoticeClick: (noticeId: string) => void;
}

// Mock notices data
const initialNotices = [
  {
    id: "notice1",
    title: "System Maintenance Schedule",
    message: "The document management system will undergo maintenance on January 20th from 2:00 AM to 6:00 AM. Please save your work before this time.",
    priority: "high",
    department: "IT Department",
    author: "IT Admin",
    timestamp: "2024-01-15T09:00:00Z",
    isRead: false,
    attachments: []
  },
  {
    id: "notice2",
    title: "New Safety Protocol Implementation",
    message: "All employees must complete the updated safety training by January 25th. Please check the training portal for more details.",
    priority: "urgent",
    department: "Safety Department", 
    author: "Safety Officer",
    timestamp: "2024-01-14T14:30:00Z",
    isRead: false,
    attachments: ["safety_protocol_v2.pdf"]
  },
  {
    id: "notice3",
    title: "Monthly Team Meeting",
    message: "The monthly all-hands meeting is scheduled for January 22nd at 10:00 AM in the main conference room.",
    priority: "normal",
    department: "HR Department",
    author: "HR Manager", 
    timestamp: "2024-01-13T11:15:00Z",
    isRead: true,
    attachments: []
  }
];

const departments = [
  "All Departments",
  "Engineering Department",
  "Safety Department", 
  "Finance Department",
  "HR Department",
  "IT Department",
  "Operations Department"
];

export const NoticesSection = ({ onNoticeClick }: NoticesSectionProps) => {
  const [notices, setNotices] = useState(initialNotices);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Compose form state
  const [composeForm, setComposeForm] = useState({
    title: "",
    message: "",
    priority: "normal",
    department: "All Departments",
    attachments: []
  });

  const handleMarkAsRead = (noticeId: string) => {
    setNotices(prev => prev.map(notice => 
      notice.id === noticeId 
        ? { ...notice, isRead: true }
        : notice
    ));
  };

  // Export unread count for parent component
  const unreadNoticesCount = notices.filter(notice => !notice.isRead).length;

  const handleComposeNotice = () => {
    const newNotice = {
      id: `notice${Date.now()}`,
      title: composeForm.title,
      message: composeForm.message,
      priority: composeForm.priority,
      department: composeForm.department,
      author: "Current User",
      timestamp: new Date().toISOString(),
      isRead: false,
      attachments: composeForm.attachments
    };

    setNotices(prev => [newNotice, ...prev]);
    setComposeForm({
      title: "",
      message: "",
      priority: "normal", 
      department: "All Departments",
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

  const unreadNotices = notices.filter(notice => !notice.isRead);
  const readNotices = notices.filter(notice => notice.isRead);

  const NoticeCard = ({ notice, showActions = true }: { notice: typeof notices[0], showActions?: boolean }) => (
    <Card className={`cursor-pointer hover:shadow-md transition-all ${!notice.isRead ? 'border-primary bg-primary/5' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm">{getPriorityIcon(notice.priority)}</span>
              <CardTitle className="text-sm font-medium">{notice.title}</CardTitle>
              {!notice.isRead && (
                <Badge variant="default" className="text-xs">New</Badge>
              )}
            </div>
            <Badge variant={getPriorityColor(notice.priority)} className="text-xs">
              {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">{notice.message}</p>
        
        {notice.attachments.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center space-x-1 mb-2">
              <Paperclip className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Attachments</span>
            </div>
            {notice.attachments.map((attachment, index) => (
              <Badge key={index} variant="outline" className="text-xs mr-1">
                {attachment}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-1 text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{notice.author} • {notice.department}</span>
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
              View Details
            </Button>
            {!notice.isRead && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleMarkAsRead(notice.id)}
              >
                <Check className="h-3 w-3 mr-1" />
                Mark Read
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
          <h2 className="text-2xl font-semibold">Notices</h2>
          <p className="text-muted-foreground">Important announcements and updates</p>
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Compose Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Compose New Notice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter notice title..."
                  value={composeForm.title}
                  onChange={(e) => setComposeForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Enter notice message..."
                  rows={4}
                  value={composeForm.message}
                  onChange={(e) => setComposeForm(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select 
                    value={composeForm.priority} 
                    onValueChange={(value) => setComposeForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <Select 
                    value={composeForm.department} 
                    onValueChange={(value) => setComposeForm(prev => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleComposeNotice}
                  disabled={!composeForm.title || !composeForm.message}
                >
                  Publish Notice
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Top 3 Critical Notices */}
      {unreadNotices.filter(n => n.priority === "urgent").length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Critical Notices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unreadNotices.filter(n => n.priority === "urgent").slice(0, 3).map((notice) => (
                <div key={notice.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{notice.title}</h4>
                    <p className="text-xs text-muted-foreground">{notice.department}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => onNoticeClick(notice.id)}>View</Button>
                    <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notice.id)}>Mark Read</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Bar */}
      <div className="flex space-x-4">
        <Select value={composeForm.department} onValueChange={(value) => setComposeForm(prev => ({ ...prev, department: value }))}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={composeForm.priority} onValueChange={(value) => setComposeForm(prev => ({ ...prev, priority: value }))}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notice Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {notices.map((notice) => (
          <Card key={notice.id} className={`hover:shadow-sm transition-all ${!notice.isRead ? 'border-l-4 border-l-primary' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant={getPriorityColor(notice.priority)} className="text-xs">
                    {notice.priority.toUpperCase()}
                  </Badge>
                  <h3 className="font-medium">{notice.title}</h3>
                  {!notice.isRead && <Badge variant="outline" className="text-xs">New</Badge>}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{notice.message}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>{notice.department}</span>
                <span>{new Date(notice.timestamp).toLocaleDateString()}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => onNoticeClick(notice.id)}>View Details</Button>
                {!notice.isRead && (
                  <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notice.id)}>
                    Mark Read
                  </Button>
                )}
                <Button variant="outline" size="sm">Share</Button>
                <Button variant="outline" size="sm">Archive</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notices.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No notices</h3>
          <p className="text-muted-foreground">No notices have been posted yet</p>
        </div>
      )}
    </div>
  );
};