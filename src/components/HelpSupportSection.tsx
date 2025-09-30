import { useState } from "react";
import { HelpCircle, Video, BookOpen, MessageCircle, Search, ChevronRight, Play, FileText, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "../contexts/TranslationContext";

interface HelpSupportSectionProps {}

export const HelpSupportSection = ({}: HelpSupportSectionProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("tutorials");
  const [searchTerm, setSearchTerm] = useState("");
  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "general",
    message: "",
    urgency: "normal"
  });

  // Tutorial videos with translation keys
  const tutorialVideos = [
    {
      id: "tutorial1",
      titleKey: "help.tutorials.getting.started.title",
      duration: "5:32",
      descriptionKey: "help.tutorials.getting.started.description",
      thumbnail: "/api/placeholder/300/180",
      categoryKey: "help.tutorials.category.getting.started"
    },
    {
      id: "tutorial2",
      titleKey: "help.tutorials.ai.features.title",
      duration: "7:45",
      descriptionKey: "help.tutorials.ai.features.description",
      thumbnail: "/api/placeholder/300/180",
      categoryKey: "help.tutorials.category.ai.features"
    },
    {
      id: "tutorial3",
      titleKey: "help.tutorials.notifications.title",
      duration: "4:18",
      descriptionKey: "help.tutorials.notifications.description",
      thumbnail: "/api/placeholder/300/180",
      categoryKey: "help.tutorials.category.notifications"
    },
    {
      id: "tutorial4",
      titleKey: "help.tutorials.collaboration.title",
      duration: "6:23",
      descriptionKey: "help.tutorials.collaboration.description",
      thumbnail: "/api/placeholder/300/180",
      categoryKey: "help.tutorials.category.collaboration"
    }
  ];

  // FAQ data with translation keys
  const faqData = [
    {
      categoryKey: "help.faq.category.general",
      questions: [
        {
          id: "faq1",
          questionKey: "help.faq.general.upload.question",
          answerKey: "help.faq.general.upload.answer"
        },
        {
          id: "faq2",
          questionKey: "help.faq.general.formats.question",
          answerKey: "help.faq.general.formats.answer"
        },
        {
          id: "faq3",
          questionKey: "help.faq.general.ai.summary.question",
          answerKey: "help.faq.general.ai.summary.answer"
        }
      ]
    },
    {
      categoryKey: "help.faq.category.ai.features",
      questions: [
        {
          id: "faq4",
          questionKey: "help.faq.ai.tags.accuracy.question",
          answerKey: "help.faq.ai.tags.accuracy.answer"
        },
        {
          id: "faq5",
          questionKey: "help.faq.ai.disable.question",
          answerKey: "help.faq.ai.disable.answer"
        }
      ]
    },
    {
      categoryKey: "help.faq.category.security",
      questions: [
        {
          id: "faq6",
          questionKey: "help.faq.security.data.question",
          answerKey: "help.faq.security.data.answer"
        },
        {
          id: "faq7",
          questionKey: "help.faq.security.access.question",
          answerKey: "help.faq.security.access.answer"
        }
      ]
    }
  ];

  // Troubleshooting with translation keys
  const troubleshootingSteps = [
    {
      issueKey: "help.troubleshooting.upload.issue",
      solutionKeys: [
        "help.troubleshooting.upload.solution.1",
        "help.troubleshooting.upload.solution.2",
        "help.troubleshooting.upload.solution.3",
        "help.troubleshooting.upload.solution.4",
        "help.troubleshooting.upload.solution.5"
      ]
    },
    {
      issueKey: "help.troubleshooting.ai.issue",
      solutionKeys: [
        "help.troubleshooting.ai.solution.1",
        "help.troubleshooting.ai.solution.2",
        "help.troubleshooting.ai.solution.3",
        "help.troubleshooting.ai.solution.4",
        "help.troubleshooting.ai.solution.5"
      ]
    },
    {
      issueKey: "help.troubleshooting.access.issue",
      solutionKeys: [
        "help.troubleshooting.access.solution.1",
        "help.troubleshooting.access.solution.2",
        "help.troubleshooting.access.solution.3",
        "help.troubleshooting.access.solution.4",
        "help.troubleshooting.access.solution.5"
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => {
      const question = t(q.questionKey);
      const answer = t(q.answerKey);
      return question.toLowerCase().includes(searchTerm.toLowerCase()) ||
             answer.toLowerCase().includes(searchTerm.toLowerCase());
    })
  })).filter(category => category.questions.length > 0);

  const handleSubmitSupport = () => {
    console.log("Support form submitted:", supportForm);
    setSupportForm({
      subject: "",
      category: "general",
      message: "",
      urgency: "normal"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{t('help.title')}</h2>
        <p className="text-muted-foreground">{t('help.subtitle')}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("tutorials")}>
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">{t('help.quick.video.tutorials')}</h3>
            <p className="text-sm text-muted-foreground">{t('help.quick.video.description')}</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("faq")}>
          <CardContent className="p-4 text-center">
            <HelpCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">{t('help.quick.faq')}</h3>
            <p className="text-sm text-muted-foreground">{t('help.quick.faq.description')}</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("contact")}>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">{t('help.quick.contact')}</h3>
            <p className="text-sm text-muted-foreground">{t('help.quick.contact.description')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tutorials">
            <Video className="h-4 w-4 mr-1" />
            {t('help.tabs.tutorials')}
          </TabsTrigger>
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-1" />
            {t('help.tabs.faq')}
          </TabsTrigger>
          <TabsTrigger value="troubleshooting">
            <FileText className="h-4 w-4 mr-1" />
            {t('help.tabs.troubleshooting')}
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageCircle className="h-4 w-4 mr-1" />
            {t('help.tabs.contact')}
          </TabsTrigger>
        </TabsList>

        {/* Video Tutorials */}
        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorialVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                  <Badge className="absolute top-2 right-2">{video.duration}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium line-clamp-2">{t(video.titleKey)}</h3>
                    <Badge variant="outline" className="text-xs">{t(video.categoryKey)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{t(video.descriptionKey)}</p>
                  <Button variant="outline" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    {t('help.button.watch.tutorial')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('help.search.faq.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-6">
            {filteredFAQ.map((category, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-3">{t(category.categoryKey)}</h3>
                <Accordion type="multiple" className="space-y-2">
                  {category.questions.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        {t(faq.questionKey)}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {t(faq.answerKey)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Troubleshooting */}
        <TabsContent value="troubleshooting" className="space-y-4">
          <h3 className="text-lg font-medium">{t('help.troubleshooting.title')}</h3>
          
          <div className="space-y-4">
            {troubleshootingSteps.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base text-destructive">{t(item.issueKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {item.solutionKeys.map((solutionKey, solutionIndex) => (
                      <div key={solutionIndex} className="flex items-start space-x-2">
                        <span className="text-sm font-medium text-primary mt-0.5">{solutionIndex + 1}.</span>
                        <span className="text-sm">{t(solutionKey)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contact Support */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t('help.contact.info.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('help.contact.email.label')}</p>
                    <p className="text-sm text-muted-foreground">support@kmrl.gov.in</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('help.contact.phone.label')}</p>
                    <p className="text-sm text-muted-foreground">+91-484-2533-800</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('help.contact.chat.label')}</p>
                    <p className="text-sm text-muted-foreground">{t('help.contact.chat.hours')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t('help.contact.form.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('help.contact.form.subject')}</label>
                  <Input
                    placeholder={t('help.contact.form.subject.placeholder')}
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">{t('help.contact.form.category')}</label>
                    <select
                      className="w-full p-2 border rounded-md text-sm"
                      value={supportForm.category}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="general">{t('help.contact.form.category.general')}</option>
                      <option value="technical">{t('help.contact.form.category.technical')}</option>
                      <option value="account">{t('help.contact.form.category.account')}</option>
                      <option value="ai-features">{t('help.contact.form.category.ai')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t('help.contact.form.urgency')}</label>
                    <select
                      className="w-full p-2 border rounded-md text-sm"
                      value={supportForm.urgency}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, urgency: e.target.value }))}
                    >
                      <option value="normal">{t('help.contact.form.urgency.normal')}</option>
                      <option value="high">{t('help.contact.form.urgency.high')}</option>
                      <option value="urgent">{t('help.contact.form.urgency.urgent')}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">{t('help.contact.form.message')}</label>
                  <Textarea
                    placeholder={t('help.contact.form.message.placeholder')}
                    rows={4}
                    value={supportForm.message}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleSubmitSupport}
                  disabled={!supportForm.subject || !supportForm.message}
                >
                  {t('help.contact.form.submit')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};