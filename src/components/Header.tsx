
import { useState } from "react";
import { Bell, Search, Settings, User, Moon, Sun, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "../contexts/TranslationContext";
import kmrlLogo from "@/assets/kmrl-logo.png";

interface HeaderProps {
  onSearchOpen: () => void;
  onNotificationsOpen: () => void;
  onSettingsOpen: () => void;
  onDashboardClick: () => void;
  user?: any;
  onLogout?: () => void;
  unreadNotificationsCount?: number;
}

export const Header = ({ onSearchOpen, onNotificationsOpen, onSettingsOpen, onDashboardClick, user, onLogout, unreadNotificationsCount = 0 }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useTranslation();
  const { toast } = useToast();
  
  // Use passed notification count
  const notificationCount = unreadNotificationsCount;

  const languages = [
    { code: "en", name: t('header.language.english'), available: true },
    { code: "hi", name: t('header.language.hindi'), available: false },
    { code: "ml", name: t('header.language.malayalam'), available: true },
    { code: "kn", name: t('header.language.kannada'), available: false }
  ];

  const handleLanguageChange = (languageCode: string, languageName: string, available: boolean) => {
    if (available) {
      setLanguage(languageCode);
      toast({
        title: t('header.language.changed'),
        description: `${t('header.language.changed.desc')} ${languageName}`,
      });
    } else {
      toast({
        title: t('header.language.coming.soon'),
        description: `${languageName} ${t('header.language.not.available')}`,
        variant: "destructive",
      });
    }
  };

  // Get current language display name
  const currentLanguageName = languages.find(lang => lang.code === language)?.name || t('header.language.english');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-4 h-16 flex items-center justify-between w-full">
        {/* KMRL Logo */}
        <div 
          className="flex items-center space-x-4 cursor-pointer transition-all duration-200 hover:opacity-80"
          onClick={onDashboardClick}
        >
          <img 
            src={kmrlLogo} 
            alt="KMRL Logo" 
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground">{t('brand.name')}</span>
            <span className="text-xs text-muted-foreground font-medium">{t('brand.subtitle')}</span>
          </div>
        </div>

        {/* Central Smart Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder={t('header.search.placeholder')}
              className="pl-12 h-12 border-0 bg-muted/30 rounded-xl text-base placeholder:text-muted-foreground/70 focus:bg-background focus:shadow-lg transition-all duration-200"
              onClick={onSearchOpen}
              readOnly
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                {t('header.badges.voice')}
              </Badge>
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                {t('header.badges.ai')}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium rounded-lg hover:bg-muted/50"
              >
                <Globe className="h-4 w-4 mr-1" />
                {currentLanguageName}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 shadow-lg bg-background border">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code, lang.name, lang.available)}
                  className={`py-2 px-3 ${!lang.available ? 'opacity-50' : ''}`}
                  disabled={!lang.available}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="flex-1">{lang.name}</span>
                  {!lang.available && (
                    <span className="text-xs text-muted-foreground">Soon</span>
                  )}
                  {language === lang.code && lang.available && (
                    <span className="text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg hover:bg-muted/50"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative rounded-lg hover:bg-muted/50"
            onClick={onNotificationsOpen}
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">{notificationCount}</span>
              </div>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative rounded-lg hover:bg-muted/50">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 shadow-lg border-0">
              <div className="px-4 py-3 border-b border-border/50">
                <p className="text-sm font-medium">{user?.name || t('header.user.default.name')}</p>
                <p className="text-xs text-muted-foreground">{user?.email || t('header.user.default.email')}</p>
                <p className="text-xs text-muted-foreground mt-1">{user?.department || t('header.user.default.department')} • {user?.role || t('header.user.default.role')}</p>
              </div>
              <DropdownMenuItem onClick={onSettingsOpen} className="py-3 px-4">
                <Settings className="mr-3 h-4 w-4" />
                {t('header.user.settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive py-3 px-4" onClick={onLogout}>
                {t('header.user.signout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};