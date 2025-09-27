import { useState } from "react";
import { FileText, Download, Brain, Volume2, Search, Filter, Tag, Calendar, User, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface DocumentsSectionProps {
  onDocumentClick: (docId: string) => void;
  onUploadClick?: () => void;
}

// Mock uploaded documents with AI features
const uploadedDocuments = [
  {
    id: "doc1",
    title: "Metro Expansion Project Report",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    uploader: "Engineering Team",
    category: "Project Reports",
    tags: ["metro", "expansion", "engineering"],
    summary: "Comprehensive analysis of Phase 2 metro expansion including timeline, budget allocation, and technical specifications.",
    isUrgent: true,
    aiGenerated: true
  },
  {
    id: "doc2", 
    title: "Safety Protocol Guidelines",
    type: "DOCX",
    size: "1.8 MB", 
    uploadDate: "2024-01-12",
    uploader: "Safety Department",
    category: "Safety",
    tags: ["safety", "protocol", "guidelines"],
    summary: "Updated safety measures and compliance requirements for all KMRL operations and construction activities.",
    isUrgent: false,
    aiGenerated: true
  },
  {
    id: "doc3",
    title: "Budget Allocation Q4 2024",
    type: "XLSX", 
    size: "512 KB",
    uploadDate: "2024-01-10",
    uploader: "Finance Department",
    category: "Finance",
    tags: ["budget", "finance", "Q4"],
    summary: "Quarterly financial breakdown showing resource allocation across departments and upcoming projects.",
    isUrgent: false,
    aiGenerated: true
  },
  {
    id: "doc4",
    title: "Employee Training Manual",
    type: "PDF",
    size: "3.2 MB",
    uploadDate: "2024-01-08", 
    uploader: "HR Department",
    category: "Training",
    tags: ["training", "employee", "manual"],
    summary: "Complete training guide for new employees covering operations, safety, and company policies.",
    isUrgent: false,
    aiGenerated: true
  }
];

const categories = ["All", "Project Reports", "Safety", "Finance", "Training", "Operations"];

export const DocumentsSection = ({ onDocumentClick, onUploadClick }: DocumentsSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const filteredDocuments = uploadedDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
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
              <h3 className="font-medium text-sm truncate">{doc.title}</h3>
              <div className="flex items-center space-x-1 ml-2">
                {doc.isUrgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                <Badge variant="outline" className="text-xs">{doc.type}</Badge>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-2">
              <Badge variant="secondary" className="text-xs">{doc.category}</Badge>
              <Badge variant="secondary" className="text-xs">{new Date(doc.uploadDate).toLocaleDateString()}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => onDocumentClick(doc.id)}>Open</Button>
                <Button variant="outline" size="sm">Share</Button>
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
        <h3 className="font-medium mb-4">Filters & Categories</h3>
        
        {/* Department Folders */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-muted-foreground">Departments</h4>
          {categories.slice(1).map((category) => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* File Types */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-muted-foreground">File Types</h4>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            PDF Documents
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Word Documents
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Spreadsheets
          </Button>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Popular Tags</h4>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs cursor-pointer">engineering</Badge>
            <Badge variant="outline" className="text-xs cursor-pointer">safety</Badge>
            <Badge variant="outline" className="text-xs cursor-pointer">budget</Badge>
            <Badge variant="outline" className="text-xs cursor-pointer">training</Badge>
          </div>
        </div>
      </div>

      {/* Right Panel - Document List */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Documents</h2>
          <Button onClick={() => onUploadClick?.()}>
            <FileText className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Smart Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documents by title, content, or tags..."
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
              <h3 className="text-lg font-medium mb-2">No documents found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};