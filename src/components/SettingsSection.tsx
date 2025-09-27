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
import { SecuritySection } from "./SecuritySection";

interface SettingsSectionProps {}

export const SettingsSection = ({}: SettingsSectionProps) => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("preferences");
  const [language, setLanguage] = useState("english");
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
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="text-muted-foreground">Customize your KMRL platform experience</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preferences">
            <User className="h-4 w-4 mr-1" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-1" />
            Security
          </TabsTrigger>
          <TabsTrigger value="access">
            <Lock className="h-4 w-4 mr-1" />
            Access Control
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
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Dark Mode</span>
                    <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Compact View</span>
                    <p className="text-xs text-muted-foreground">Show more content in less space</p>
                  </div>
                  <Switch
                    checked={preferences.compactView}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, compactView: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={language === "english" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("english")}
                    >
                      English
                    </Button>
                    <Button
                      variant={language === "hindi" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("hindi")}
                    >
                      हिंदी
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
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Document uploads</span>
                    <Switch
                      checked={notifications.documents}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, documents: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reminders</span>
                    <Switch
                      checked={notifications.reminders}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, reminders: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Important notices</span>
                    <Switch
                      checked={notifications.notices}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, notices: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI processing</span>
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
                <CardTitle>General Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Auto-save drafts</span>
                    <p className="text-xs text-muted-foreground">Automatically save work in progress</p>
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
                    <span className="text-sm font-medium">Show tips</span>
                    <p className="text-xs text-muted-foreground">Display helpful tips and guidance</p>
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
                    <span className="text-sm font-medium">Auto-logout (minutes)</span>
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
                <CardTitle>Data & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Data Usage Policy
                </Button>
                
                <Separator />
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>KMRL Document Platform v2.1</p>
                  <p>© 2024 Kerala Metro Rail Limited</p>
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
              <CardTitle>Role-Based Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Current Role</h4>
                  <Badge variant="default" className="text-sm">Document Manager</Badge>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Permissions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Upload Documents</span>
                      <Badge variant="secondary" className="text-xs">Allowed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Create Notices</span>
                      <Badge variant="secondary" className="text-xs">Allowed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Manage Reminders</span>
                      <Badge variant="secondary" className="text-xs">Allowed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Access AI Features</span>
                      <Badge variant="secondary" className="text-xs">Allowed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Department Access</span>
                      <Badge variant="outline" className="text-xs">Engineering, IT</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Admin Functions</span>
                      <Badge variant="destructive" className="text-xs">Restricted</Badge>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <Button variant="outline" className="w-full">
                  Request Permission Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button>
          Save All Settings
        </Button>
      </div>
    </div>
  );
};