import { useState } from "react";
import { Clock, Calendar, FileText, Users, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ReminderModalProps {
  open: boolean;
  onClose: () => void;
  onReminderCreated?: () => void;
  documentId?: string;
}

export const ReminderModal = ({ open, onClose, onReminderCreated, documentId }: ReminderModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("medium");
  const [linkedDocument, setLinkedDocument] = useState(documentId || "");
  const [department, setDepartment] = useState("");
  const { toast } = useToast();

  const priorities = [
    { value: "low", label: "Low", color: "bg-muted text-muted-foreground" },
    { value: "medium", label: "Medium", color: "bg-warning/10 text-warning" },
    { value: "high", label: "High", color: "bg-destructive/10 text-destructive" }
  ];

  const departments = [
    "Administration", "Engineering", "Finance", "HR", "IT", "Operations", "Safety"
  ];

  const documents = [
    { id: "doc1", title: "Q3 Financial Report 2024" },
    { id: "doc2", title: "Metro Project Timeline" },
    { id: "doc3", title: "Safety Guidelines Update" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reminder title",
        variant: "destructive"
      });
      return;
    }

    if (!dueDate) {
      toast({
        title: "Error", 
        description: "Please select a due date",
        variant: "destructive"
      });
      return;
    }

    // Create reminder object
    const newReminder = {
      id: `reminder-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      dueTime,
      priority,
      linkedDocument,
      department,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // In a real app, this would be saved to backend
    console.log("Creating reminder:", newReminder);

    toast({
      title: "Reminder Created",
      description: `Reminder "${title}" has been set for ${new Date(dueDate).toLocaleDateString()}`,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
    setPriority("medium");
    setLinkedDocument("");
    setDepartment("");

    onReminderCreated?.();
    onClose();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Clock className="mr-3 h-6 w-6 text-primary" />
            Create New Reminder
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Reminder Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter reminder title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Add details about this reminder..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium">
                Due Date *
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueTime" className="text-sm font-medium">
                Due Time
              </Label>
              <Input
                id="dueTime"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Priority Level</Label>
            <div className="grid grid-cols-3 gap-3">
              {priorities.map((p) => (
                <Button
                  key={p.value}
                  type="button"
                  variant={priority === p.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriority(p.value)}
                  className="justify-center"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {p.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select department (optional)" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {dept}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Link to Document */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Link to Document</Label>
            <Select value={linkedDocument} onValueChange={setLinkedDocument}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a document to link (optional)" />
              </SelectTrigger>
              <SelectContent>
                {documents.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      {doc.title}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preview Card */}
          {title && dueDate && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">Reminder Preview</h4>
                    <Badge variant="outline" className={priorities.find(p => p.value === priority)?.color}>
                      {priorities.find(p => p.value === priority)?.label}
                    </Badge>
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {formatDate(dueDate)} {dueTime && `at ${dueTime}`}
                  </p>
                  {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="min-w-[120px]">
              Create Reminder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};