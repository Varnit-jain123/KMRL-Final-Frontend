import { useState } from "react";
import { History, Download, Eye, Calendar, FileText, Bell, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "../contexts/TranslationContext";

interface HistorySectionProps {}

export const HistorySection = ({}: HistorySectionProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("downloads");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Mock history data with translation keys
  const downloadHistory = [
    {
      id: "dl1",
      documentTitleKey: "history.downloads.metro.expansion",
      documentType: "PDF",
      downloadDate: "2024-01-15T14:30:00Z",
      fileSize: "2.4 MB",
      categoryKey: "documents.category.project.reports"
    },
    {
      id: "dl2",
      documentTitleKey: "history.downloads.safety.protocol",
      documentType: "DOCX",
      downloadDate: "2024-01-14T09:15:00Z",
      fileSize: "1.8 MB",
      categoryKey: "documents.category.safety"
    },
    {
      id: "dl3",
      documentTitleKey: "history.downloads.budget.allocation",
      documentType: "XLSX",
      downloadDate: "2024-01-13T16:45:00Z",
      fileSize: "512 KB",
      categoryKey: "documents.category.finance"
    },
    {
      id: "dl4",
      documentTitleKey: "history.downloads.training.manual",
      documentType: "PDF",
      downloadDate: "2024-01-12T11:20:00Z",
      fileSize: "3.2 MB",
      categoryKey: "documents.category.training"
    },
    {
      id: "dl5",
      documentTitleKey: "history.downloads.technical.specs",
      documentType: "PDF",
      downloadDate: "2024-01-11T13:10:00Z",
      fileSize: "4.1 MB",
      categoryKey: "documents.category.project.reports"
    }
  ];

  const noticesHistory = [
    {
      id: "nh1",
      noticeTitleKey: "history.notices.system.maintenance",
      readDate: "2024-01-15T10:00:00Z",
      priority: "high",
      departmentKey: "history.departments.it",
      authorKey: "history.authors.it.admin"
    },
    {
      id: "nh2",
      noticeTitleKey: "history.notices.safety.protocol",
      readDate: "2024-01-14T15:30:00Z",
      priority: "urgent",
      departmentKey: "history.departments.safety",
      authorKey: "history.authors.safety.officer"
    },
    {
      id: "nh3",
      noticeTitleKey: "history.notices.team.meeting",
      readDate: "2024-01-13T12:15:00Z",
      priority: "normal",
      departmentKey: "history.departments.hr",
      authorKey: "history.authors.hr.manager"
    },
    {
      id: "nh4",
      noticeTitleKey: "history.notices.budget.review",
      readDate: "2024-01-12T09:45:00Z",
      priority: "normal",
      departmentKey: "history.departments.finance",
      authorKey: "history.authors.finance.director"
    },
    {
      id: "nh5",
      noticeTitleKey: "history.notices.emergency.drill",
      readDate: "2024-01-11T14:20:00Z",
      priority: "high",
      departmentKey: "history.departments.safety",
      authorKey: "history.authors.safety.coordinator"
    }
  ];

  const categories = [
    { key: "All", labelKey: "documents.category.all" },
    { key: "Project Reports", labelKey: "documents.category.project.reports" },
    { key: "Safety", labelKey: "documents.category.safety" },
    { key: "Finance", labelKey: "documents.category.finance" },
    { key: "Training", labelKey: "documents.category.training" },
    { key: "Operations", labelKey: "documents.category.operations" }
  ];

  const departments = [
    { key: "All", labelKey: "history.filter.all" },
    { key: "IT Department", labelKey: "history.departments.it" },
    { key: "Safety Department", labelKey: "history.departments.safety" },
    { key: "HR Department", labelKey: "history.departments.hr" },
    { key: "Finance Department", labelKey: "history.departments.finance" },
    { key: "Engineering Department", labelKey: "history.departments.engineering" }
  ];

  const filteredDownloads = downloadHistory.filter(item => {
    const title = t(item.documentTitleKey);
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || t(item.categoryKey) === t(categories.find(c => c.key === selectedCategory)?.labelKey || "");
    return matchesSearch && matchesCategory;
  });

  const filteredNotices = noticesHistory.filter(item => {
    const title = t(item.noticeTitleKey);
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || t(item.departmentKey) === t(departments.find(d => d.key === selectedDepartment)?.labelKey || "");
    return matchesSearch && matchesDepartment;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4 text-primary" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      default: return "secondary";
    }
  };

  const getPriorityLabel = (priority: string) => {
    return t(`history.priority.${priority}`);
  };

  const DownloadHistoryCard = ({ item }: { item: typeof downloadHistory[0] }) => (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {getFileIcon(item.documentType)}
            <div>
              <h4 className="font-medium text-sm">{t(item.documentTitleKey)}</h4>
              <p className="text-xs text-muted-foreground">
                {item.documentType} • {item.fileSize}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {t(item.categoryKey)}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Download className="h-3 w-3" />
            <span>{t('history.downloaded')}: {formatDate(item.downloadDate)}</span>
          </div>
          <Button variant="outline" size="sm" className="h-6 text-xs">
            {t('history.download.again')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const NoticeHistoryCard = ({ item }: { item: typeof noticesHistory[0] }) => (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Bell className="h-4 w-4 text-primary" />
            <div>
              <h4 className="font-medium text-sm">{t(item.noticeTitleKey)}</h4>
              <p className="text-xs text-muted-foreground">
                {t(item.departmentKey)} • {t(item.authorKey)}
              </p>
            </div>
          </div>
          <Badge variant={getPriorityColor(item.priority)} className="text-xs">
            {getPriorityLabel(item.priority)}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>{t('history.read')}: {formatDate(item.readDate)}</span>
          </div>
          <Button variant="outline" size="sm" className="h-6 text-xs">
            {t('history.view.again')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{t('history.title')}</h2>
          <p className="text-muted-foreground">{t('history.subtitle')}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t('history.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          {activeTab === "downloads" ? (
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.key} value={category.key}>
                    {t(category.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.key} value={department.key}>
                    {t(department.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="downloads">
            <Download className="h-4 w-4 mr-1" />
            {t('history.tabs.downloads')} ({downloadHistory.length})
          </TabsTrigger>
          <TabsTrigger value="notices">
            <Bell className="h-4 w-4 mr-1" />
            {t('history.tabs.notices')} ({noticesHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="downloads" className="space-y-4">
          {filteredDownloads.length > 0 ? (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {downloadHistory.length}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('history.stats.total.downloads')}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(downloadHistory.reduce((acc, item) => {
                        const size = parseFloat(item.fileSize);
                        return acc + (item.fileSize.includes('MB') ? size : size / 1024);
                      }, 0) * 10) / 10}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('history.stats.total.mb')}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {new Set(downloadHistory.map(item => item.categoryKey)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('history.stats.categories')}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {downloadHistory.filter(item => {
                        const downloadDate = new Date(item.downloadDate);
                        const sevenDaysAgo = new Date();
                        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                        return downloadDate >= sevenDaysAgo;
                      }).length}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('history.stats.this.week')}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Downloads List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDownloads.map((item) => (
                  <DownloadHistoryCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('history.no.downloads.title')}</h3>
              <p className="text-muted-foreground">{t('history.no.downloads.description')}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notices" className="space-y-4">
          {filteredNotices.length > 0 ? (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {noticesHistory.length}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('history.stats.total.read')}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {noticesHistory.filter(item => item.priority === "urgent").length}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('history.stats.urgent')}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {new Set(noticesHistory.map(item => item.departmentKey)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('history.stats.departments')}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {noticesHistory.filter(item => {
                        const readDate = new Date(item.readDate);
                        const sevenDaysAgo = new Date();
                        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                        return readDate >= sevenDaysAgo;
                      }).length}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('history.stats.this.week')}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Notices List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotices.map((item) => (
                  <NoticeHistoryCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('history.no.notices.title')}</h3>
              <p className="text-muted-foreground">{t('history.no.notices.description')}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};