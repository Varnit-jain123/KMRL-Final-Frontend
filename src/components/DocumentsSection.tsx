import { useState } from "react";
import { FileText, Download, Brain, Volume2, Search, Filter, Tag, Calendar, User, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "../contexts/TranslationContext";

interface DocumentsSectionProps {
  onDocumentClick: (docId: string) => void;
  onUploadClick?: () => void;
}

export const DocumentsSection = ({ onDocumentClick, onUploadClick }: DocumentsSectionProps) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  // Mock uploaded documents with AI features - using translation keys
  const uploadedDocuments = [
    {
      id: "doc1",
      titleKey: "documents.metro.expansion.title",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      uploaderKey: "documents.uploader.engineering",
      categoryKey: "documents.category.project.reports",
      tags: ["documents.tags.metro", "documents.tags.expansion", "documents.tags.engineering"],
      summaryKey: "documents.metro.expansion.summary",
      isUrgent: true,
      aiGenerated: true
    },
    {
      id: "doc2", 
      titleKey: "documents.safety.protocol.title",
      type: "DOCX",
      size: "1.8 MB", 
      uploadDate: "2024-01-12",
      uploaderKey: "documents.uploader.safety",
      categoryKey: "documents.category.safety",
      tags: ["documents.tags.safety", "documents.tags.protocol", "documents.tags.guidelines"],
      summaryKey: "documents.safety.protocol.summary",
      isUrgent: false,
      aiGenerated: true
    },
    {
      id: "doc3",
      titleKey: "documents.budget.allocation.title",
      type: "XLSX", 
      size: "512 KB",
      uploadDate: "2024-01-10",
      uploaderKey: "documents.uploader.finance",
      categoryKey: "documents.category.finance",
      tags: ["documents.tags.budget", "documents.tags.finance", "documents.tags.q4"],
      summaryKey: "documents.budget.allocation.summary",
      isUrgent: false,
      aiGenerated: true
    },
    {
      id: "doc4",
      titleKey: "documents.training.manual.title",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: "2024-01-08", 
      uploaderKey: "documents.uploader.hr",
      categoryKey: "documents.category.training",
      tags: ["documents.tags.training", "documents.tags.employee", "documents.tags.manual"],
      summaryKey: "documents.training.manual.summary",
      isUrgent: false,
      aiGenerated: true
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

  const filteredDocuments = uploadedDocuments.filter(doc => {
    const title = t(doc.titleKey);
    const translatedTags = doc.tags.map(tag => t(tag));
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         translatedTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || t(doc.categoryKey) === t(categories.find(c => c.key === selectedCategory)?.labelKey || "");
    return matchesSearch && matchesCategory;
  });

  const handlePlayAudio = (docId: string) => {
    if (playingAudio === docId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(docId);
      setTimeout(() => setPlayingAudio(null), 5000);
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4 text-primary" />;
  };

  const DocumentCard = ({ doc }: { doc: typeof uploadedDocuments[0] }) => (
    <Card className="hover:shadow-sm transition-all cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {getFileIcon(doc.type)}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm truncate">{t(doc.titleKey)}</h3>
              <div className="flex items-center space-x-1 ml-2">
                {doc.isUrgent && <Badge variant="destructive" className="text-xs">{t('documents.badge.urgent')}</Badge>}
                <Badge variant="outline" className="text-xs">{doc.type}</Badge>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-2">
              <Badge variant="secondary" className="text-xs">{t(doc.categoryKey)}</Badge>
              <Badge variant="secondary" className="text-xs">{new Date(doc.uploadDate).toLocaleDateString()}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => onDocumentClick(doc.id)}>{t('documents.button.open')}</Button>
                <Button variant="outline" size="sm">{t('documents.button.share')}</Button>
                <Button variant="outline" size="sm">
                  {playingAudio === doc.id ? (
                    <Pause className="h-3 w-3" onClick={() => handlePlayAudio(doc.id)} />
                  ) : (
                    <Play className="h-3 w-3" onClick={() => handlePlayAudio(doc.id)} />
                  )}
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">{doc.size}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-full">
      {/* Left Panel - Filters */}
      <div className="w-80 border-r bg-muted/5 p-6">
        <h3 className="font-medium mb-4">{t('documents.filters.title')}</h3>
        
        {/* Department Folders */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-muted-foreground">{t('documents.filters.departments')}</h4>
          {categories.slice(1).map((category) => (
            <Button 
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category.key)}
            >
              {t(category.labelKey)}
            </Button>
          ))}
        </div>

        {/* File Types */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-muted-foreground">{t('documents.filters.file.types')}</h4>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            {t('documents.file.types.pdf')}
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            {t('documents.file.types.word')}
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            {t('documents.file.types.spreadsheet')}
          </Button>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">{t('documents.filters.popular.tags')}</h4>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs cursor-pointer">{t('documents.tags.engineering')}</Badge>
            <Badge variant="outline" className="text-xs cursor-pointer">{t('documents.tags.safety')}</Badge>
            <Badge variant="outline" className="text-xs cursor-pointer">{t('documents.tags.budget')}</Badge>
            <Badge variant="outline" className="text-xs cursor-pointer">{t('documents.tags.training')}</Badge>
          </div>
        </div>
      </div>

      {/* Right Panel - Document List */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">{t('documents.title')}</h2>
          <Button onClick={() => onUploadClick?.()}>
            <FileText className="h-4 w-4 mr-2" />
            {t('documents.button.upload')}
          </Button>
        </div>

        {/* Smart Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t('documents.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Document Cards */}
        <div className="space-y-3">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('documents.no.documents.title')}</h3>
              <p className="text-muted-foreground">{t('documents.no.documents.description')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};