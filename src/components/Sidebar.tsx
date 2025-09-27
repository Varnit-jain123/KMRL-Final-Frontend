import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Upload,
  Search,
  Brain,
  Bell,
  Clock,
  Users,
  Shield,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  urgentCount: number;
  unreadCounts?: {
    documents?: number;
    notices?: number;
    reminders?: number;
    notifications?: number;
  };
}

const menuItems = [
  {
    section: "dashboard",
    label: "Dashboard",
    icon: Home,
    description: "Overview & insights"
  },
  {
    section: "documents",
    label: "Documents",
    icon: FileText,
    description: "Browse & manage",
    hasUrgent: true
  },
  {
    section: "ai-features",
    label: "AI Features",
    icon: Brain,
    description: "Smart automation"
  },
  {
    section: "notices",
    label: "Notices",
    icon: Bell,
    description: "Announcements",
    hasUrgent: true
  },
  {
    section: "reminders",
    label: "Reminders",
    icon: Clock,
    description: "Tasks & deadlines",
    hasUrgent: true
  },
  {
    section: "departments",
    label: "Departments",
    icon: Users,
    description: "Team contacts"
  },
  {
    section: "history",
    label: "History",
    icon: History,
    description: "Activity log"
  },
  {
    section: "help",
    label: "Help & Support",
    icon: HelpCircle,
    description: "Get assistance"
  },
  {
    section: "settings",
    label: "Settings",
    icon: Settings,
    description: "Security & preferences"
  }
];

export const Sidebar = ({ onNavigate, activeSection, urgentCount, unreadCounts = {} }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (section: string) => activeSection === section;

  return (
    <TooltipProvider>
      <aside className={`
        ${isCollapsed ? 'w-16' : 'w-72'} 
        bg-sidebar/50 backdrop-blur-sm border-r border-sidebar-border/50
        flex flex-col h-full transition-all duration-300 ease-in-out
        sticky top-16 z-40
      `}>
      {/* Minimal Header */}
      <div className="p-6 border-b border-sidebar-border/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-sm font-medium text-sidebar-foreground/70 uppercase tracking-wider">Menu</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground rounded-full h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Urgent Items Alert */}
      {urgentCount > 0 && !isCollapsed && (
        <div className="mx-4 mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              {urgentCount} Urgent Items
            </span>
          </div>
          <p className="text-xs text-destructive/80 mt-1">
            Requires immediate attention
          </p>
        </div>
      )}

      {/* Clean Navigation Menu */}
      <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.section);
          const sectionCount = unreadCounts[item.section as keyof typeof unreadCounts] || 0;
          const hasCount = sectionCount > 0;

          const buttonElement = (
            <Button
              variant="ghost"
              className={`
                w-full justify-start h-auto rounded-xl group relative
                ${isCollapsed ? "p-3" : "p-4"}
                ${active 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }
                transition-all duration-300
              `}
              onClick={() => onNavigate(item.section)}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'w-full'}`}>
                <div className={`flex items-center ${isCollapsed ? '' : 'space-x-4 flex-1'}`}>
                  <IconComponent className={`h-5 w-5 ${active ? 'text-primary-foreground' : 'text-sidebar-foreground/70 group-hover:text-sidebar-foreground'}`} />
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item.label}</span>
                        {hasCount && (
                          <Badge variant={active ? "secondary" : "default"} className="text-xs h-5 px-2">
                            {sectionCount}
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 ${active ? 'text-primary-foreground/80' : 'text-sidebar-foreground/50'}`}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {isCollapsed && hasCount && (
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">{sectionCount}</span>
                </div>
              )}
            </Button>
          );

          return (
            <div key={item.section} className="relative">
              {isCollapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    {buttonElement}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    <p>{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                buttonElement
              )}
            </div>
          );
        })}
      </nav>

      {/* Minimal Footer */}
      <div className="p-6 border-t border-sidebar-border/50">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/40 space-y-1">
            <p className="font-medium">KMRL Platform</p>
            <p>© 2024 Kochi Metro</p>
          </div>
        )}
      </div>
    </aside>
    </TooltipProvider>
  );
};