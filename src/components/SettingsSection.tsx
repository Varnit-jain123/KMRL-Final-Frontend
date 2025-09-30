import { useState } from "react";
import { Settings, Shield, User, Bell, Palette, Globe, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useTranslation } from "../contexts/TranslationContext";
import { SecuritySection } from "./SecuritySection";

interface SettingsSectionProps {}

export const SettingsSection = ({}: SettingsSectionProps) => {
  const { theme, setTheme } = useTheme();
  const { t, language: currentLang, setLanguage: changeLanguage } = useTranslation();
  const [activeTab, setActiveTab] = useState("preferences");
  const [notifications, setNotifications] = useState({
    documents: true,
    reminders: true,
    notices: true,
    aiProcessing: false
  });
  const [preferences, setPreferences] = useState({
    autoSave: true,
    compactView: false,
    showTips: true,
    autoLogout: 30
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{t('settings.title')}</h2>
          <p className="text-muted-foreground">{t('settings.subtitle')}</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preferences">
            <User className="h-4 w-4 mr-1" />
            {t('settings.tabs.preferences')}
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-1" />
            {t('settings.tabs.security')}
          </TabsTrigger>
          <TabsTrigger value="access">
            <Lock className="h-4 w-4 mr-1" />
            {t('settings.tabs.access')}
          </TabsTrigger>
        </TabsList>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  {t('settings.appearance.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">{t('settings.appearance.dark.mode')}</span>
                    <p className="text-xs text-muted-foreground">{t('settings.appearance.dark.mode.description')}</p>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">{t('settings.appearance.compact.view')}</span>
                    <p className="text-xs text-muted-foreground">{t('settings.appearance.compact.view.description')}</p>
                  </div>
                  <Switch
                    checked={preferences.compactView}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, compactView: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('settings.appearance.language')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={currentLang === "en" ? "default" : "outline"}
                      size="sm"
                      onClick={() => changeLanguage("en")}
                    >
                      English
                    </Button>
                    <Button
                      variant={currentLang === "ml" ? "default" : "outline"}
                      size="sm"
                      onClick={() => changeLanguage("ml")}
                    >
                      മലയാളം
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  {t('settings.notifications.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('settings.notifications.documents')}</span>
                    <Switch
                      checked={notifications.documents}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, documents: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('settings.notifications.reminders')}</span>
                    <Switch
                      checked={notifications.reminders}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, reminders: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('settings.notifications.notices')}</span>
                    <Switch
                      checked={notifications.notices}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, notices: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('settings.notifications.ai.processing')}</span>
                    <Switch
                      checked={notifications.aiProcessing}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, aiProcessing: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* General Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.preferences.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">{t('settings.preferences.auto.save')}</span>
                    <p className="text-xs text-muted-foreground">{t('settings.preferences.auto.save.description')}</p>
                  </div>
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, autoSave: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">{t('settings.preferences.show.tips')}</span>
                    <p className="text-xs text-muted-foreground">{t('settings.preferences.show.tips.description')}</p>
                  </div>
                  <Switch
                    checked={preferences.showTips}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, showTips: checked }))
                    }
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{t('settings.preferences.auto.logout')}</span>
                    <Badge variant="secondary">{preferences.autoLogout}</Badge>
                  </div>
                  <Slider
                    value={[preferences.autoLogout]}
                    onValueChange={(value) => 
                      setPreferences(prev => ({ ...prev, autoLogout: value[0] }))
                    }
                    max={120}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data & Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.data.privacy.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  {t('settings.data.export')}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('settings.data.privacy.settings')}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  {t('settings.data.usage.policy')}
                </Button>
                
                <Separator />
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>{t('settings.footer.version')}</p>
                  <p>{t('settings.footer.copyright')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <SecuritySection />
        </TabsContent>

        {/* Access Control Tab */}
        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.access.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">{t('settings.access.current.role')}</h4>
                  <Badge variant="default" className="text-sm">{t('settings.access.role.document.manager')}</Badge>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-3">{t('settings.access.permissions')}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('settings.access.permission.upload')}</span>
                      <Badge variant="secondary" className="text-xs">{t('settings.access.status.allowed')}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('settings.access.permission.notices')}</span>
                      <Badge variant="secondary" className="text-xs">{t('settings.access.status.allowed')}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('settings.access.permission.reminders')}</span>
                      <Badge variant="secondary" className="text-xs">{t('settings.access.status.allowed')}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('settings.access.permission.ai')}</span>
                      <Badge variant="secondary" className="text-xs">{t('settings.access.status.allowed')}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('settings.access.permission.department')}</span>
                      <Badge variant="outline" className="text-xs">{t('settings.access.departments.engineering.it')}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('settings.access.permission.admin')}</span>
                      <Badge variant="destructive" className="text-xs">{t('settings.access.status.restricted')}</Badge>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <Button variant="outline" className="w-full">
                  {t('settings.access.request.changes')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button variant="outline">
          {t('settings.button.reset')}
        </Button>
        <Button>
          {t('settings.button.save')}
        </Button>
      </div>
    </div>
  );
};