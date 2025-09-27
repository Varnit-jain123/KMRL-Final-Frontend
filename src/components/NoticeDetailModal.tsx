import { useState } from "react";
import { Bell, Clock, Users, Download, Share2, Eye, EyeOff, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface NoticeDetailModalProps {
  open: boolean;
  onClose: () => void;
  noticeId: string | null;
}

// Mock notice data - in real app would fetch from backend
const noticeDetails = {
  "1": {
    id: "1",
    title: "Important: Board Meeting Tomorrow",
    message: "Monthly board meeting scheduled for 10:00 AM in Conference Room A. All department heads are required to attend. Please bring your quarterly reports and prepared presentations.",
    fullContent: `Dear Team,

This is to inform you about the upcoming Monthly Board Meeting scheduled for tomorrow.

**Meeting Details:**
- Date: Tomorrow
- Time: 10:00 AM - 12:00 PM
- Venue: Conference Room A, 3rd Floor
- Meeting Type: In-person (Hybrid option available)

**Agenda:**
1. Review of Q3 Performance
2. Budget Planning for Q4
3. Metro Expansion Project Updates
4. Safety Protocol Review
5. HR Policy Updates

**Requirements:**
- All department heads must attend
- Bring printed copies of quarterly reports
- Prepare 10-minute department presentations
- Laptops for digital presentations

**Documents Required:**
- Q3 Financial Summary
- Department Performance Reports
- Safety Compliance Certificates
- Project Timeline Updates

Please confirm your attendance by replying to this notice.

For any queries, contact the Administration Department.

Best regards,
KMRL Administration`,
    priority: "high",
    department: "Administration",
    unread: true,
    timestamp: "30 minutes ago",
    createdBy: "Admin Team",
    recipients: ["All Department Heads", "Senior Staff"],
    attachments: [
      { name: "Meeting_Agenda.pdf", size: "245 KB" },
      { name: "Q3_Guidelines.docx", size: "1.2 MB" }
    ],
    readBy: 12,
    totalRecipients: 25
  },
  "2": {
    id: "2", 
    title: "New Document Upload Policy",
    message: "Updated guidelines for document classification and AI tagging",
    fullContent: `New Document Upload Policy - Effective Immediately

**Overview:**
We are implementing new guidelines for document uploads to improve organization and leverage AI capabilities.

**Key Changes:**

1. **Mandatory AI Processing**
   - All uploaded documents will be automatically processed by AI
   - AI will generate summaries, tags, and categorization
   - Review AI suggestions before final submission

2. **Document Categories** (New)
   - Administrative
   - Technical/Engineering  
   - Financial
   - Safety/Compliance
   - Training/HR
   - Project Management

3. **Naming Conventions**
   - Use descriptive filenames
   - Include date in YYYY-MM-DD format
   - Include department abbreviation
   - Example: "ENG_2024-01-15_Metro_Phase2_Report.pdf"

4. **Quality Requirements**
   - Minimum 300 DPI for scanned documents
   - PDF format preferred for reports
   - Maximum file size: 25MB
   - Text must be searchable (OCR if needed)

5. **Security Classifications**
   - Public: General access
   - Internal: Department access only
   - Confidential: Restricted access
   - Secret: Senior management only

**Implementation Timeline:**
- Week 1: Training sessions for all departments
- Week 2: Soft launch with IT support
- Week 3: Full implementation

**Support:**
Contact IT Department for technical assistance or training.

This policy aims to improve document discoverability and compliance.`,
    priority: "medium",
    department: "IT",
    unread: false,
    timestamp: "2 hours ago",
    createdBy: "IT Department",
    recipients: ["All Employees"],
    attachments: [
      { name: "Document_Policy_2024.pdf", size: "890 KB" }
    ],
    readBy: 45,
    totalRecipients: 87
  }
};

export const NoticeDetailModal = ({ open, onClose, noticeId }: NoticeDetailModalProps) => {
  const [isRead, setIsRead] = useState(false);
  const { toast } = useToast();

  const notice = noticeId ? noticeDetails[noticeId as keyof typeof noticeDetails] : null;

  if (!notice) return null;

  const handleMarkAsRead = () => {
    setIsRead(true);
    toast({
      title: "Marked as Read",
      description: `Notice "${notice.title}" has been marked as read`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Notice",
      description: "Notice sharing functionality would be implemented here",
    });
  };

  const handleDownload = (attachment: any) => {
    toast({
      title: "Download Started",
      description: `Downloading ${attachment.name}...`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            <div className="flex items-center">
              <Bell className="mr-3 h-6 w-6 text-primary" />
              Notice Details
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className={`text-xs capitalize ${getPriorityColor(notice.priority)}`}
              >
                {notice.priority} Priority
              </Badge>
              {notice.unread && !isRead && (
                <Badge variant="destructive" className="text-xs">
                  Unread
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Notice Header */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">{notice.title}</h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {notice.department}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {notice.timestamp}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {notice.readBy} of {notice.totalRecipients} read
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <strong>From:</strong> {notice.createdBy}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <strong>To:</strong> {notice.recipients.join(", ")}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Summary */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Quick Summary</h3>
              <p className="text-sm text-muted-foreground">{notice.message}</p>
            </CardContent>
          </Card>

          {/* Full Content */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Full Notice</h3>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                  {notice.fullContent}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          {notice.attachments && notice.attachments.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Attachments ({notice.attachments.length})</h3>
                <div className="space-y-3">
                  {notice.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownload(attachment)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-3">
              {!isRead && (
                <Button onClick={handleMarkAsRead} size="sm">
                  <EyeOff className="h-4 w-4 mr-2" />
                  Mark as Read
                </Button>
              )}
              <Button variant="outline" onClick={handleShare} size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};