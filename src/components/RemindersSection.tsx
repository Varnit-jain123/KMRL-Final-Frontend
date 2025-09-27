import { useState } from "react";
import { Clock, Check, Plus, Calendar, Brain, AlertTriangle, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "../contexts/TranslationContext"; // Import translation context

interface RemindersSectionProps {
  onReminderClick?: (reminderId: string) => void;
}

export const RemindersSection = ({ onReminderClick }: RemindersSectionProps) => {
  const { t } = useTranslation(); // Use translation hook
  const { toast } = useToast();

  // Mock reminders data with translation keys
  const initialRemindersData = [
    {
      id: "reminder1",
      titleKey: "reminders.safety.training.title",
      descriptionKey: "reminders.safety.training.description",
      dueDate: "2024-01-20T17:00:00Z",
      priority: "high",
      type: "manual",
      isCompleted: false,
      createdAt: "2024-01-15T09:00:00Z",
      sourceKey: "reminders.source.manual"
    },
    {
      id: "reminder2",
      titleKey: "reminders.budget.review.title",
      descriptionKey: "reminders.budget.review.description",
      dueDate: "2024-01-22T12:00:00Z",
      priority: "urgent",
      type: "ai-suggested",
      isCompleted: false,
      createdAt: "2024-01-14T10:30:00Z",
      sourceKey: "reminders.source.ai.budget"
    },
    {
      id: "reminder3",
      titleKey: "reminders.team.meeting.title",
      descriptionKey: "reminders.team.meeting.description",
      dueDate: "2024-01-22T10:00:00Z",
      priority: "normal",
      type: "manual",
      isCompleted: true,
      createdAt: "2024-01-13T14:15:00Z",
      completedAt: "2024-01-22T10:00:00Z",
      sourceKey: "reminders.source.manual"
    },
    {
      id: "reminder4",
      titleKey: "reminders.metro.milestone.title",
      descriptionKey: "reminders.metro.milestone.description",
      dueDate: "2024-01-25T16:00:00Z",
      priority: "high",
      type: "ai-suggested",
      isCompleted: false,
      createdAt: "2024-01-12T11:45:00Z",
      sourceKey: "reminders.source.ai.metro"
    }
  ];

  const [reminders, setReminders] = useState(initialRemindersData);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  
  // Create form state
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "normal"
  });

  const handleMarkAsDone = (reminderId: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, isCompleted: true, completedAt: new Date().toISOString() }
        : reminder
    ));
  };

  const handleSnooze = (reminderId: string, duration: string) => {
    const durations = {
      '10min': 10 * 60 * 1000,
      '1hour': 60 * 60 * 1000,
      '1day': 24 * 60 * 60 * 1000
    };
    
    const snoozeMs = durations[duration as keyof typeof durations];
    const newDueDate = new Date(Date.now() + snoozeMs).toISOString();
    
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, dueDate: newDueDate }
        : reminder
    ));

    const durationText = duration === '10min' ? t('reminders.snooze.10min') : 
                        duration === '1hour' ? t('reminders.snooze.1hour') : 
                        t('reminders.snooze.1day');

    toast({
      title: t('reminders.snooze.title'),
      description: `${t('reminders.snooze.description')} ${durationText}`,
    });
  };

  const handleCreateReminder = () => {
    const newReminder = {
      id: `reminder${Date.now()}`,
      titleKey: "reminders.custom.title",
      descriptionKey: "reminders.custom.description",
      title: createForm.title, // Store custom text
      description: createForm.description,
      dueDate: new Date(createForm.dueDate).toISOString(),
      priority: createForm.priority,
      type: "manual" as const,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      sourceKey: "reminders.source.manual"
    };

    setReminders(prev => [newReminder, ...prev]);
    setCreateForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "normal"
    });
    setIsCreateOpen(false);

    toast({
      title: t('reminders.create.success.title'),
      description: t('reminders.create.success.description'),
    });
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

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getReminderTitle = (reminder: any) => {
    return reminder.title || t(reminder.titleKey);
  };

  const getReminderDescription = (reminder: any) => {
    return reminder.description || t(reminder.descriptionKey);
  };

  const pendingReminders = reminders.filter(r => !r.isCompleted);
  const completedReminders = reminders.filter(r => r.isCompleted);
  const urgentReminders = pendingReminders.filter(r => r.priority === "urgent" || isOverdue(r.dueDate));

  const ReminderCard = ({ reminder, showActions = true }: { reminder: any, showActions?: boolean }) => (
    <Card className={`
      transition-all hover:shadow-md
      ${reminder.isCompleted ? 'opacity-75' : ''}
      ${isOverdue(reminder.dueDate) && !reminder.isCompleted ? 'border-destructive bg-destructive/5' : ''}
      ${reminder.priority === "urgent" && !reminder.isCompleted ? 'border-destructive bg-destructive/5' : ''}
    `}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm">{getPriorityIcon(reminder.priority)}</span>
              <CardTitle className={`text-sm font-medium ${reminder.isCompleted ? 'line-through' : ''}`}>
                {getReminderTitle(reminder)}
              </CardTitle>
              {reminder.type === "ai-suggested" && (
                <Badge variant="outline" className="text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  AI
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={getPriorityColor(reminder.priority)} className="text-xs">
                {t(`reminders.priority.${reminder.priority}`)}
              </Badge>
              {isOverdue(reminder.dueDate) && !reminder.isCompleted && (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {t('reminders.badge.overdue')}
                </Badge>
              )}
              {reminder.isCompleted && (
                <Badge variant="secondary" className="text-xs">
                  <Check className="h-3 w-3 mr-1" />
                  {t('reminders.badge.completed')}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">{getReminderDescription(reminder)}</p>
        
        <div className="space-y-1 text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{t('reminders.due')}: {formatDate(reminder.dueDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{t('reminders.source')}: {t(reminder.sourceKey)}</span>
          </div>
          {reminder.isCompleted && reminder.completedAt && (
            <div className="flex items-center space-x-1">
              <Check className="h-3 w-3" />
              <span>{t('reminders.completed')}: {formatDate(reminder.completedAt)}</span>
            </div>
          )}
        </div>

        {showActions && !reminder.isCompleted && (
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handleMarkAsDone(reminder.id)}
              className="flex-1"
            >
              <Check className="h-3 w-3 mr-1" />
              {t('reminders.button.mark.done')}
            </Button>
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
          <h2 className="text-2xl font-semibold">{t('reminders.title')}</h2>
          <p className="text-muted-foreground">{t('reminders.description')}</p>
        </div>
        
        {/* Floating Quick Add Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
                <Plus className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t('reminders.create.title')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('reminders.form.title')}</label>
                  <Input
                    placeholder={t('reminders.form.title.placeholder')}
                    value={createForm.title}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">{t('reminders.form.description')}</label>
                  <Textarea
                    placeholder={t('reminders.form.description.placeholder')}
                    rows={3}
                    value={createForm.description}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">{t('reminders.form.due.date')}</label>
                  <Input
                    type="datetime-local"
                    value={createForm.dueDate}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">{t('reminders.form.priority')}</label>
                  <Select 
                    value={createForm.priority} 
                    onValueChange={(value) => setCreateForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">{t('reminders.priority.normal')}</SelectItem>
                      <SelectItem value="high">{t('reminders.priority.high')}</SelectItem>
                      <SelectItem value="urgent">{t('reminders.priority.urgent')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    {t('common.cancel')}
                  </Button>
                  <Button 
                    onClick={handleCreateReminder}
                    disabled={!createForm.title || !createForm.dueDate}
                  >
                    {t('reminders.button.create')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Reminder Cards */}
      <div className="space-y-3">
        {pendingReminders.map((reminder) => (
          <Card key={reminder.id} className={`hover:shadow-sm transition-all ${
            isOverdue(reminder.dueDate) ? 'border-l-4 border-l-destructive' : 
            reminder.priority === "urgent" ? 'border-l-4 border-l-warning' : ''
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium">{getReminderTitle(reminder)}</h3>
                    <Badge variant={getPriorityColor(reminder.priority)} className="text-xs">
                      {t(`reminders.priority.${reminder.priority}`).toUpperCase()}
                    </Badge>
                    {reminder.type === "ai-suggested" && (
                      <Badge variant="outline" className="text-xs">
                        <Brain className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                    {isOverdue(reminder.dueDate) && (
                      <Badge variant="destructive" className="text-xs">
                        {t('reminders.badge.overdue')}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{getReminderDescription(reminder)}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{t('reminders.due')}: {formatDate(reminder.dueDate)}</span>
                    <span>•</span>
                    <span>{t(reminder.sourceKey)}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" onClick={() => handleMarkAsDone(reminder.id)}>
                    {t('reminders.button.mark.done')}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {t('reminders.button.snooze')}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem onClick={() => handleSnooze(reminder.id, '10min')}>
                        {t('reminders.snooze.10min')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSnooze(reminder.id, '1hour')}>
                        {t('reminders.snooze.1hour')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSnooze(reminder.id, '1day')}>
                        {t('reminders.snooze.1day')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completed Reminders History */}
      {completedReminders.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">{t('reminders.completed.recently')}</h3>
          <div className="space-y-2">
            {completedReminders.slice(0, 3).map((reminder) => (
              <Card key={reminder.id} className="opacity-75">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-success" />
                      <span className="text-sm line-through">{getReminderTitle(reminder)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {reminder.completedAt && formatDate(reminder.completedAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {pendingReminders.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">{t('reminders.empty.title')}</h3>
          <p className="text-muted-foreground">{t('reminders.empty.description')}</p>
        </div>
      )}
    </div>
  );
};