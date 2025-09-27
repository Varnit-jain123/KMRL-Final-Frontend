import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation Context
interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation hook
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Header
    'header.search.placeholder': 'Search documents, ask AI questions, or use voice commands...',
    'header.language.english': 'English',
    'header.language.malayalam': 'Malayalam',
    'header.language.hindi': 'Hindi',
    'header.language.kannada': 'Kannada',
    'header.language.changed': 'Language changed',
    'header.language.changed.desc': 'Interface language set to',
    'header.language.coming.soon': 'Coming Soon',
    'header.language.not.available': 'translation is not available yet',
    'header.user.settings': 'Settings & Security',
    'header.user.signout': 'Sign Out',
    'header.user.default.name': 'KMRL Employee',
    'header.user.default.email': 'employee@kmrl.kerala.gov.in',
    'header.user.default.department': 'Department',
    'header.user.default.role': 'Employee',
    'header.badges.voice': 'Voice',
    'header.badges.ai': 'AI',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.share': 'Share',
    'common.view.all': 'View All',
    
    // Brand
    'brand.name': 'KMRL',
    'brand.subtitle': 'Document Platform',
    
    // Dashboard
    'dashboard.welcome.title': 'Hello, Employee',
    'dashboard.welcome.subtitle': "Today's overview at a glance",
    'dashboard.actions.upload.title': 'Upload Document',
    'dashboard.actions.upload.subtitle': 'Quick upload with AI processing',
    'dashboard.actions.ai.title': 'AI Features',
    'dashboard.actions.ai.subtitle': 'Generate summaries & insights',
    'dashboard.actions.reminder.title': 'Set Reminder',
    'dashboard.actions.reminder.subtitle': 'Create deadline alerts',
    'dashboard.insights.title': 'AI Insights - Critical Actions',
    'dashboard.alerts.urgent.title': 'Urgent Deadline',
    'dashboard.alerts.urgent.message': 'Q3 Board Report due tomorrow',
    'dashboard.alerts.compliance.title': 'Compliance Alert',
    'dashboard.alerts.compliance.message': 'Safety audit documents pending',
    'dashboard.alerts.priority.title': 'High Priority',
    'dashboard.alerts.priority.message': '5 notices require attention',
    'dashboard.notices.title': 'Recent Notices',
    'dashboard.documents.title': 'Recent Documents',
    'dashboard.notices.board.meeting.title': 'Important: Board Meeting Tomorrow',
    'dashboard.notices.board.meeting.message': 'Monthly board meeting scheduled for 10:00 AM in Conference Room A',
    'dashboard.notices.document.policy.title': 'New Document Upload Policy',
    'dashboard.notices.document.policy.message': 'Updated guidelines for document classification and AI tagging',
    'dashboard.departments.administration': 'Administration',
    'dashboard.departments.it': 'IT',
    'dashboard.documents.q3.report.title': 'Q3 Financial Report 2024',
    'dashboard.documents.q3.report.summary': 'Quarterly financial analysis showing 15% growth in revenue with detailed breakdown of departmental expenses...',
    'dashboard.documents.metro.timeline.title': 'Metro Project Timeline',
    'dashboard.documents.metro.timeline.summary': 'Updated project timeline for Phase 2 metro construction with critical milestones and resource allocation...',
    'dashboard.documents.safety.guidelines.title': 'Safety Guidelines Update',
    'dashboard.documents.safety.guidelines.summary': 'Enhanced safety protocols for construction sites including new equipment requirements and training schedules...',
    'dashboard.tags.finance': 'Finance',
    'dashboard.tags.report': 'Report',
    'dashboard.tags.q3': 'Q3',
    'dashboard.tags.project': 'Project',
    'dashboard.tags.timeline': 'Timeline',
    'dashboard.tags.metro': 'Metro',
    'dashboard.tags.safety': 'Safety',
    'dashboard.tags.guidelines': 'Guidelines',
    'dashboard.tags.construction': 'Construction',
    'dashboard.time.hours.ago.2': '2 hours ago',
    'dashboard.time.hours.ago.5': '5 hours ago',
    'dashboard.time.day.ago.1': '1 day ago',
    'dashboard.time.minutes.ago.30': '30 minutes ago',
    'dashboard.insights.documents.processed': 'Documents Processed Today',
    'dashboard.insights.ai.summaries': 'AI Summaries Generated',
    'dashboard.insights.pending.reviews': 'Pending Reviews',
    
    // Sidebar
    'sidebar.menu': 'Menu',
    'sidebar.dashboard.title': 'Dashboard',
    'sidebar.dashboard.description': 'Overview & insights',
    'sidebar.documents.title': 'Documents',
    'sidebar.documents.description': 'Browse & manage',
    'sidebar.ai.title': 'AI Features',
    'sidebar.ai.description': 'Smart automation',
    'sidebar.notices.title': 'Notices',
    'sidebar.notices.description': 'Announcements',
    'sidebar.reminders.title': 'Reminders',
    'sidebar.reminders.description': 'Tasks & deadlines',
    'sidebar.departments.title': 'Departments',
    'sidebar.departments.description': 'Team contacts',
    'sidebar.history.title': 'History',
    'sidebar.history.description': 'Activity log',
    'sidebar.help.title': 'Help & Support',
    'sidebar.help.description': 'Get assistance',
    'sidebar.settings.title': 'Settings',
    'sidebar.settings.description': 'Security & preferences',
    'sidebar.urgent.items': 'Urgent Items',
    'sidebar.urgent.attention': 'Requires immediate attention',
    'sidebar.footer.platform': 'KMRL Platform',
    'sidebar.footer.copyright': '© 2024 Kochi Metro',
    
    // Documents Section
    'documents.title': 'Documents',
    'documents.button.upload': 'Upload Document',
    'documents.button.open': 'Open',
    'documents.button.share': 'Share',
    'documents.search.placeholder': 'Search documents by title, content, or tags...',
    'documents.filters.title': 'Filters & Categories',
    'documents.filters.departments': 'Departments',
    'documents.filters.file.types': 'File Types',
    'documents.filters.popular.tags': 'Popular Tags',
    'documents.category.all': 'All',
    'documents.category.project.reports': 'Project Reports',
    'documents.category.safety': 'Safety',
    'documents.category.finance': 'Finance',
    'documents.category.training': 'Training',
    'documents.category.operations': 'Operations',
    'documents.file.types.pdf': 'PDF Documents',
    'documents.file.types.word': 'Word Documents',
    'documents.file.types.spreadsheet': 'Spreadsheets',
    'documents.badge.urgent': 'Urgent',
    'documents.no.documents.title': 'No documents found',
    'documents.no.documents.description': 'Try adjusting your search terms or filters',
    'documents.metro.expansion.title': 'Metro Expansion Project Report',
    'documents.metro.expansion.summary': 'Comprehensive analysis of Phase 2 metro expansion including timeline, budget allocation, and technical specifications.',
    'documents.safety.protocol.title': 'Safety Protocol Guidelines',
    'documents.safety.protocol.summary': 'Updated safety measures and compliance requirements for all KMRL operations and construction activities.',
    'documents.budget.allocation.title': 'Budget Allocation Q4 2024',
    'documents.budget.allocation.summary': 'Quarterly financial breakdown showing resource allocation across departments and upcoming projects.',
    'documents.training.manual.title': 'Employee Training Manual',
    'documents.training.manual.summary': 'Complete training guide for new employees covering operations, safety, and company policies.',
    'documents.uploader.engineering': 'Engineering Team',
    'documents.uploader.safety': 'Safety Department',
    'documents.uploader.finance': 'Finance Department',
    'documents.uploader.hr': 'HR Department',
    'documents.tags.metro': 'metro',
    'documents.tags.expansion': 'expansion',
    'documents.tags.engineering': 'engineering',
    'documents.tags.safety': 'safety',
    'documents.tags.protocol': 'protocol',
    'documents.tags.guidelines': 'guidelines',
    'documents.tags.budget': 'budget',
    'documents.tags.finance': 'finance',
    'documents.tags.q4': 'Q4',
    'documents.tags.training': 'training',
    'documents.tags.employee': 'employee',
    'documents.tags.manual': 'manual',

    // AI Features Section
    'ai.features.title': 'AI Features',
    'ai.features.description': 'Leverage cutting-edge AI to automatically process, summarize, and enhance your documents.',
    
    // AI Summaries
    'ai.summaries.title': 'Summaries',
    'ai.summaries.tab': 'Summaries',
    'ai.summaries.generate': 'Generate Summary',
    'ai.summaries.generated': 'AI Generated Summary',
    'ai.summaries.copy': 'Copy',
    'ai.summaries.copied': 'Copied!',
    'ai.summaries.copied.desc': 'Summary copied to clipboard.',
    'ai.summaries.confidence': 'Confidence',
    'ai.summaries.last.processed': 'Last processed',
    'ai.summaries.tips.title': 'AI Summary Tips',
    'ai.summaries.tips.auto': '• Summaries are generated automatically for all documents',
    'ai.summaries.tips.nlp': '• Key points are extracted using advanced NLP',
    'ai.summaries.tips.confidence': '• Confidence scores indicate processing accuracy',

    // AI Podcast
    'ai.podcast.title': 'Podcast',
    'ai.podcast.tab': 'Podcast',
    'ai.podcast.listen': 'Listen',
    'ai.podcast.download': 'Download',
    'ai.podcast.playing': 'Playing Podcast',
    'ai.podcast.playing.desc': 'Starting audio playback of the document summary...',
    'ai.podcast.available': 'Audio summary available in English and Hindi',
    'ai.podcast.last.generated': 'Last generated',
    'ai.podcast.features.title': 'Podcast Features',
    'ai.podcast.features.voice': '• Natural voice synthesis in multiple languages',
    'ai.podcast.features.speed': '• Adjustable playback speed and voice tone',
    'ai.podcast.features.offline': '• Download audio for offline listening',

    // AI Auto-Tagging
    'ai.tagging.title': 'Auto-Tagging',
    'ai.tagging.tab': 'Auto-Tagging',
    'ai.tagging.auto.tag': 'Auto-Tag Document',
    'ai.tagging.last.processed': 'Last processed: Auto-categorized',
    'ai.tagging.instructions.title': 'Auto-Tagging Instructions',
    'ai.tagging.instructions.detect': '• Categories are automatically detected from content',
    'ai.tagging.instructions.manual': '• Manual tag editing is available for fine-tuning',
    'ai.tagging.instructions.confidence': '• High confidence scores indicate accurate tagging',
    'ai.tagging.activated': 'AI Feature',
    'ai.tagging.activated.desc': 'functionality activated',
    'ai.tagging.analyzing': 'AI Auto-Tagging',
    'ai.tagging.analyzing.desc': 'Analyzing document content and generating tags...',
    'ai.tagging.generated': 'Tags Generated',
    'ai.tagging.generated.desc': 'Document has been automatically tagged and categorized.',

    // AI Feature Actions
    'ai.summary.generated': 'Summary Generated',
    'ai.summary.generated.desc': 'AI summary is now displayed below.',
    'ai.summary.generated.content': 'This document contains important financial data for Q3 2024. Key highlights include a 15% increase in revenue, successful completion of metro line expansion project phase 2, and implementation of new safety protocols. The document recommends continued investment in infrastructure development and staff training programs. Critical deadlines identified: Budget review by Jan 25, Safety training completion by Jan 30, and Project milestone review by Feb 5.',

    // AI Document Titles and Content
    'ai.document.q3.report': 'Q3 Financial Report 2024',
    'ai.document.metro.timeline': 'Metro Project Timeline',
    'ai.document.budget.allocation': 'Budget Allocation Q4 2024',
    'ai.document.safety.guidelines': 'Safety Guidelines Update',
    'ai.document.training.manual': 'Employee Training Manual',

    // AI Summary Content
    'ai.summary.q3.content': 'This quarterly report shows strong performance with 15% revenue growth. Key highlights include increased project completions, improved operational efficiency, and successful cost management strategies.',
    'ai.summary.metro.content': 'Phase 2 metro expansion timeline updated with new milestones. Project remains on schedule with 78% completion. Critical path items include station construction and signal system installation.',

    // Key Points
    'ai.keypoints.revenue.growth': '15% revenue growth',
    'ai.keypoints.cost.reduction': 'Cost reduction of 8%',
    'ai.keypoints.projects.completed': '3 major projects completed',
    'ai.keypoints.project.completion': '78% project completion',
    'ai.keypoints.on.schedule': 'On schedule delivery',
    'ai.keypoints.stations.operational': '2 stations operational',

    // Tags in English
    'ai.tags.finance': 'Finance',
    'ai.tags.budget': 'Budget',
    'ai.tags.allocation': 'Allocation',
    'ai.tags.safety': 'Safety',
    'ai.tags.protocol': 'Protocol',
    'ai.tags.guidelines': 'Guidelines',
    'ai.tags.training': 'Training',
    'ai.tags.hr': 'HR',
    'ai.tags.onboarding': 'Onboarding',
    'ai.tags.procedures': 'Procedures',

    // Reminders
    'ai.reminders.budget.review': 'Budget Review Deadline',
    'ai.reminders.safety.training': 'Safety Training Completion',
    'ai.reminders.project.milestone': 'Project Milestone Review',

    // File sizes and measurements
    'ai.file.size.mb': 'MB',
    'ai.file.words': 'words',
    'ai.file.pages': 'pages',
    'ai.duration.minutes': 'minutes',

    // Additional common AI terms
    'ai.processing': 'Processing',
    'ai.analyzing': 'Analyzing',
    'ai.generating': 'Generating',
    'ai.completed': 'Completed',
    'ai.failed': 'Failed',
    'ai.ready': 'Ready',
    'ai.loading': 'Loading',


    // Notices Section
  'notices.title': 'Notices',
  'notices.description': 'Important announcements and updates',
  'notices.button.compose': 'Compose Notice',
  'notices.button.view': 'View',
  'notices.button.view.details': 'View Details',
  'notices.button.mark.read': 'Mark Read',
  'notices.button.share': 'Share',
  'notices.button.archive': 'Archive',
  'notices.button.publish': 'Publish Notice',
  'notices.badge.new': 'New',
  'notices.attachments': 'Attachments',
  'notices.critical.title': 'Critical Notices',
  'notices.empty.title': 'No notices',
  'notices.empty.description': 'No notices have been posted yet',

   // Compose Form
    'notices.compose.title': 'Compose New Notice',
    'notices.compose.form.title': 'Title',
    'notices.compose.form.title.placeholder': 'Enter notice title...',
    'notices.compose.form.message': 'Message',
    'notices.compose.form.message.placeholder': 'Enter notice message...',
    'notices.compose.form.priority': 'Priority',
    'notices.compose.form.department': 'Department',

    // Priority levels
    'notices.priority.all': 'All Priority',
    'notices.priority.normal': 'Normal',
    'notices.priority.high': 'High',
    'notices.priority.urgent': 'Urgent',

    // Departments
    'notices.departments.all': 'All Departments',
    'notices.departments.engineering': 'Engineering Department',
    'notices.departments.safety': 'Safety Department',
    'notices.departments.finance': 'Finance Department',
    'notices.departments.hr': 'HR Department',
    'notices.departments.it': 'IT Department',
    'notices.departments.operations': 'Operations Department',

    // Authors
    'notices.authors.it.admin': 'IT Admin',
    'notices.authors.safety.officer': 'Safety Officer',
    'notices.authors.hr.manager': 'HR Manager',
    'notices.authors.current.user': 'Current User',

    // Filter
    'notices.filter.department': 'Filter by Department',
    'notices.filter.priority': 'Filter by Priority',

    // Sample notices
    'notices.system.maintenance.title': 'System Maintenance Schedule',
    'notices.system.maintenance.message': 'The document management system will undergo maintenance on January 20th from 2:00 AM to 6:00 AM. Please save your work before this time.',
    'notices.safety.protocol.title': 'New Safety Protocol Implementation',
    'notices.safety.protocol.message': 'All employees must complete the updated safety training by January 25th. Please check the training portal for more details.',
    'notices.team.meeting.title': 'Monthly Team Meeting',
    'notices.team.meeting.message': 'The monthly all-hands meeting is scheduled for January 22nd at 10:00 AM in the main conference room.',

    // Reminders Section
    'reminders.title': 'Reminders',
    'reminders.description': 'Manage tasks and deadlines',
    'reminders.due': 'Due',
    'reminders.source': 'Source',
    'reminders.completed': 'Completed',
    'reminders.empty.title': 'No pending reminders',
    'reminders.empty.description': "You're all caught up! Use the + button to create a new reminder.",
    'reminders.completed.recently': 'Recently Completed',

    // Create Form
    'reminders.create.title': 'Create New Reminder',
    'reminders.form.title': 'Title',
    'reminders.form.title.placeholder': 'Enter reminder title...',
    'reminders.form.description': 'Description',
    'reminders.form.description.placeholder': 'Enter description...',
    'reminders.form.due.date': 'Due Date & Time',
    'reminders.form.priority': 'Priority',

    // Buttons
    'reminders.button.create': 'Create Reminder',
    'reminders.button.mark.done': 'Mark as Done',
    'reminders.button.snooze': 'Snooze',

    // Priority levels
    'reminders.priority.normal': 'Normal',
    'reminders.priority.high': 'High',
    'reminders.priority.urgent': 'Urgent',

    // Badges
    'reminders.badge.overdue': 'Overdue',
    'reminders.badge.completed': 'Completed',

    // Snooze options
    'reminders.snooze.title': 'Reminder snoozed',
    'reminders.snooze.description': 'Reminder postponed for',
    'reminders.snooze.10min': '10 minutes',
    'reminders.snooze.1hour': '1 hour',
    'reminders.snooze.1day': '1 day',

    // Success messages
    'reminders.create.success.title': 'Reminder Created',
    'reminders.create.success.description': 'Your reminder has been successfully created.',

    // Sources
    'reminders.source.manual': 'Manual Entry',
    'reminders.source.ai.budget': 'AI Analysis - Budget Allocation Q4 2024.xlsx',
    'reminders.source.ai.metro': 'AI Analysis - Metro Expansion Project Report.pdf',

    // Sample reminders
    'reminders.safety.training.title': 'Submit Safety Training Report',
    'reminders.safety.training.description': 'Complete and submit the quarterly safety training completion report',
    'reminders.budget.review.title': 'Review Budget Allocation Document',
    'reminders.budget.review.description': 'AI detected a deadline in Budget Allocation Q4 2024 document',
    'reminders.team.meeting.title': 'Attend Monthly Team Meeting',
    'reminders.team.meeting.description': 'Monthly all-hands meeting in main conference room',
    'reminders.metro.milestone.title': 'Metro Project Phase 2 Milestone Review',
    'reminders.metro.milestone.description': 'AI detected an important deadline in Metro Expansion Project Report',

    // Departments Section - add to en object
    'departments.title': 'Departments',
    'departments.description': 'Organizational structure and team members',
    'departments.head': 'Head',
    'departments.members': 'members',
    'departments.total.members': 'total members',
    'departments.members.title': 'Department Members',
    'departments.badge.head': 'Head',
    'departments.more.members': 'more members',
    'departments.button.view': 'View Department',
    'departments.stats.departments': 'Departments',
    'departments.stats.total.employees': 'Total Employees',
    'departments.stats.average.size': 'Average Size',
    'departments.stats.largest.dept': 'Largest Dept',

    // Engineering Department
    'departments.engineering.name': 'Engineering Department',
    'departments.engineering.description': 'Responsible for metro system design, construction, and technical operations',
    'departments.engineering.head': 'Dr. Rajesh Kumar',
    'departments.engineering.location': 'Technical Building - Floor 3',
    'departments.engineering.members.head.name': 'Dr. Rajesh Kumar',
    'departments.engineering.members.head.role': 'Chief Engineer',
    'departments.engineering.members.senior.name': 'Priya Nair',
    'departments.engineering.members.senior.role': 'Senior Design Engineer',
    'departments.engineering.members.project.name': 'Arjun Menon',
    'departments.engineering.members.project.role': 'Project Engineer',
    'departments.engineering.members.quality.name': 'Deepika Sharma',
    'departments.engineering.members.quality.role': 'Quality Engineer',

    // Safety Department
    'departments.safety.name': 'Safety Department',
    'departments.safety.description': 'Ensures compliance with safety standards and protocols across all operations',
    'departments.safety.head': 'Suresh Pillai',
    'departments.safety.location': 'Safety Building - Floor 2',
    'departments.safety.members.director.name': 'Suresh Pillai',
    'departments.safety.members.director.role': 'Safety Director',
    'departments.safety.members.inspector.name': 'Kavitha Radhakrishnan',
    'departments.safety.members.inspector.role': 'Safety Inspector',
    'departments.safety.members.coordinator.name': 'Ravi Chandran',
    'departments.safety.members.coordinator.role': 'Safety Coordinator',

    // Finance Department
    'departments.finance.name': 'Finance Department',
    'departments.finance.description': 'Manages budgets, financial planning, and resource allocation',
    'departments.finance.head': 'Lakshmi Nambiar',
    'departments.finance.location': 'Admin Building - Floor 4',
    'departments.finance.members.director.name': 'Lakshmi Nambiar',
    'departments.finance.members.director.role': 'Finance Director',
    'departments.finance.members.accountant.name': 'Vinod Thomas',
    'departments.finance.members.accountant.role': 'Senior Accountant',
    'departments.finance.members.analyst.name': 'Anjali Krishnan',
    'departments.finance.members.analyst.role': 'Budget Analyst',

    // HR Department
    'departments.hr.name': 'HR Department',
    'departments.hr.description': 'Human resources, employee relations, and organizational development',
    'departments.hr.head': 'Meera Shenoy',
    'departments.hr.location': 'Admin Building - Floor 2',
    'departments.hr.members.director.name': 'Meera Shenoy',
    'departments.hr.members.director.role': 'HR Director',
    'departments.hr.members.manager.name': 'Arun Kumar',
    'departments.hr.members.manager.role': 'HR Manager',

    // IT Department
    'departments.it.name': 'IT Department',
    'departments.it.description': 'Information technology infrastructure and digital solutions',
    'departments.it.head': 'Kiran Raj',
    'departments.it.location': 'Tech Center - Floor 1',
    'departments.it.members.director.name': 'Kiran Raj',
    'departments.it.members.director.role': 'IT Director',
    'departments.it.members.admin.name': 'Rohit Varma',
    'departments.it.members.admin.role': 'System Administrator',
    'departments.it.members.developer.name': 'Sita Devi',
    'departments.it.members.developer.role': 'Software Developer',

    // Operations Department
    'departments.operations.name': 'Operations Department',
    'departments.operations.description': 'Daily metro operations, scheduling, and passenger services',
    'departments.operations.head': 'Mohan Das',
    'departments.operations.location': 'Operations Center - Floor 1',
    'departments.operations.members.director.name': 'Mohan Das',
    'departments.operations.members.director.role': 'Operations Director',
    'departments.operations.members.manager.name': 'Geetha Nair',
    'departments.operations.members.manager.role': 'Operations Manager',
    'departments.operations.members.station.name': 'Shankar Menon',
    'departments.operations.members.station.role': 'Station Master',

    // History Section
    'history.title': 'History',
    'history.description': 'Track your downloads and read notices',
    'history.search.placeholder': 'Search history...',
    'history.downloaded': 'Downloaded',
    'history.read': 'Read',
    'history.download.again': 'Download Again',
    'history.view.again': 'View Again',

    // Tabs
    'history.tabs.downloads': 'Downloads',
    'history.tabs.notices': 'Read Notices',

    // Categories
    'history.categories.all': 'All',
    'history.categories.project.reports': 'Project Reports',
    'history.categories.safety': 'Safety',
    'history.categories.finance': 'Finance',
    'history.categories.training': 'Training',
    'history.categories.operations': 'Operations',

    // Departments
    'history.departments.all': 'All',
    'history.departments.it': 'IT Department',
    'history.departments.safety': 'Safety Department',
    'history.departments.hr': 'HR Department',
    'history.departments.finance': 'Finance Department',
    'history.departments.engineering': 'Engineering Department',

    // Priority
    'history.priority.normal': 'Normal',
    'history.priority.high': 'High',
    'history.priority.urgent': 'Urgent',

    // Authors
    'history.authors.it.admin': 'IT Admin',
    'history.authors.safety.officer': 'Safety Officer',
    'history.authors.hr.manager': 'HR Manager',
    'history.authors.finance.director': 'Finance Director',
    'history.authors.safety.coordinator': 'Safety Coordinator',

    // Download History Documents
    'history.downloads.metro.expansion.title': 'Metro Expansion Project Report',
    'history.downloads.safety.protocol.title': 'Safety Protocol Guidelines',
    'history.downloads.budget.allocation.title': 'Budget Allocation Q4 2024',
    'history.downloads.training.manual.title': 'Employee Training Manual',
    'history.downloads.technical.specs.title': 'Technical Specifications Phase 2',

    // Notice History
    'history.notices.system.maintenance.title': 'System Maintenance Schedule',
    'history.notices.safety.protocol.title': 'New Safety Protocol Implementation',
    'history.notices.team.meeting.title': 'Monthly Team Meeting',
    'history.notices.budget.review.title': 'Budget Review Guidelines',
    'history.notices.emergency.drill.title': 'Emergency Drill Schedule',

    // Stats
    'history.stats.total.downloads': 'Total Downloads',
    'history.stats.total.mb': 'Total MB',
    'history.stats.categories': 'Categories',
    'history.stats.this.week': 'This Week',
    'history.stats.total.read': 'Total Read',
    'history.stats.urgent': 'Urgent',
    'history.stats.departments': 'Departments',

    // Empty States
    'history.no.downloads.title': 'No downloads found',
    'history.no.downloads.description': 'Try adjusting your search terms or filters',
    'history.no.notices.title': 'No notices found',
    'history.no.notices.description': 'Try adjusting your search terms or filters',

    // Page Not Found
    'notfound.title': 'Page Not Found',
    'notfound.description': 'The page you are looking for does not exist.',
    'notfound.back.home': 'Back to Home',
  },
  ml: {
    // Header
    // 'header.search.placeholder': 'പ്രമാണങ്ങൾ തിരയുക, AI ചോദ്യങ്ങൾ ചോദിക്കുക, അല്ലെങ്കിൽ വോയ്സ് കമാൻഡുകൾ ഉപയോഗിക്കുക...',
    // 'header.language.english': 'ഇംഗ്ലീഷ്',
    // 'header.language.malayalam': 'മലയാളം',
    // 'header.language.hindi': 'ഹിന്ദി',
    // 'header.language.kannada': 'കന്നഡ',
    'header.language.changed': 'ഭാഷ മാറ്റി',
    'header.language.changed.desc': 'ഇന്റർഫേസ് ഭാഷ സജ്ജമാക്കി',
    'header.language.coming.soon': 'ഉടനെ വരുന്നു',
    'header.language.not.available': 'പരിഭാഷ ഇതുവരെ ലഭ്യമല്ല',
    'header.user.settings': 'ക്രമീകരണങ്ങളും സുരക്ഷയും',
    'header.user.signout': 'പുറത്തുകടക്കുക',
    'header.user.default.name': 'KMRL ജീവനക്കാരൻ',
    'header.user.default.email': 'employee@kmrl.kerala.gov.in',
    'header.user.default.department': 'വകുപ്പ്',
    'header.user.default.role': 'ജീവനക്കാരൻ',
    // 'header.badges.voice': 'ശബ്ദം',
    'header.badges.ai': 'AI',
    
    // Common
    'common.loading': 'ലോഡുചെയ്യുന്നു...',
    'common.error': 'പിശക്',
    'common.success': 'വിജയം',
    'common.cancel': 'റദ്ദാക്കുക',
    'common.save': 'സംരക്ഷിക്കുക',
    'common.delete': 'നീക്കം ചെയ്യുക',
    'common.edit': 'എഡിറ്റ് ചെയ്യുക',
    'common.close': 'അടയ്ക്കുക',
    'common.back': 'തിരികെ',
    'common.next': 'അടുത്തത്',
    'common.previous': 'മുമ്പത്തെ',
    'common.search': 'തിരയുക',
    'common.filter': 'ഫിൽട്ടർ',
    'common.sort': 'ക്രമപ്പെടുത്തുക',
    'common.view': 'കാണുക',
    'common.download': 'ഡൗൺലോഡ് ചെയ്യുക',
    'common.upload': 'അപ്‌ലോഡ് ചെയ്യുക',
    'common.share': 'പങ്കിടുക',
    'common.view.all': 'എല്ലാം കാണുക',
    
    // Brand
    'brand.name': 'KMRL',
    'brand.subtitle': 'ഡോക്യുമെന്റ് പ്ലാറ്റ്ഫോം',
    
    // Dashboard
    'dashboard.welcome.title': 'ഹലോ, ജീവനക്കാരൻ',
    'dashboard.welcome.subtitle': 'ഇന്നത്തെ അവലോകനം ഒറ്റനോട്ടത്തിൽ',
    'dashboard.actions.upload.title': 'ഡോക്യുമെന്റ് അപ്‌ലോഡ് ചെയ്യുക',
    'dashboard.actions.upload.subtitle': 'AI പ്രോസസ്സിംഗുമായി വേഗത്തിലുള്ള അപ്‌ലോഡ്',
    'dashboard.actions.ai.title': 'AI സവിശേഷതകൾ',
    'dashboard.actions.ai.subtitle': 'സംഗ്രഹങ്ങളും ഉൾക്കാഴ്ചകളും സൃഷ്ടിക്കുക',
    'dashboard.actions.reminder.title': 'ഓർമ്മപ്പെടുത്തൽ സജ്ജമാക്കുക',
    'dashboard.actions.reminder.subtitle': 'ഡെഡ്‌ലൈൻ അലേർട്ടുകൾ സൃഷ്ടിക്കുക',
    'dashboard.insights.title': 'AI ഉൾക്കാഴ്ചകൾ - നിർണായക പ്രവർത്തനങ്ങൾ',
    'dashboard.alerts.urgent.title': 'അടിയന്തിര ഡെഡ്‌ലൈൻ',
    'dashboard.alerts.urgent.message': 'Q3 ബോർഡ് റിപ്പോർട്ട് നാളെ അവസാന തീയതി',
    'dashboard.alerts.compliance.title': 'കംപ്ലയൻസ് അലേർട്ട്',
    'dashboard.alerts.compliance.message': 'സുരക്ഷാ ഓഡിറ്റ് ഡോക്യുമെന്റുകൾ തീർപ്പുകൽപ്പിക്കാത്തവ',
    'dashboard.alerts.priority.title': 'ഉയർന്ന മുൻഗണന',
    'dashboard.alerts.priority.message': '5 അറിയിപ്പുകൾക്ക് ശ്രദ്ധ ആവശ്യമാണ്',
    'dashboard.notices.title': 'സമീപകാല അറിയിപ്പുകൾ',
    'dashboard.documents.title': 'സമീപകാല പ്രമാണങ്ങൾ',
    'dashboard.notices.board.meeting.title': 'പ്രധാനം: നാളെ ബോർഡ് മീറ്റിംഗ്',
    'dashboard.notices.board.meeting.message': 'കോൺഫറൻസ് റൂം A-യിൽ രാവിലെ 10:00 ന് പ്രതിമാസ ബോർഡ് മീറ്റിംഗ്',
    'dashboard.notices.document.policy.title': 'പുതിയ ഡോക്യുമെന്റ് അപ്‌ലോഡ് നയം',
    'dashboard.notices.document.policy.message': 'ഡോക്യുമെന്റ് വർഗ്ഗീകരണത്തിനും AI ടാഗിംഗിനുമുള്ള അപ്‌ഡേറ്റ് ചെയ്ത മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    'dashboard.departments.administration': 'ഭരണവിഭാഗം',
    'dashboard.departments.it': 'ഐടി',
    'dashboard.documents.q3.report.title': 'Q3 സാമ്പത്തിക റിപ്പോർട്ട് 2024',
    'dashboard.documents.q3.report.summary': 'വരുമാനത്തിൽ 15% വളർച്ച കാണിക്കുന്ന ത്രൈമാസിക സാമ്പത്തിക വിശകലനം...',
    'dashboard.documents.metro.timeline.title': 'മെട്രോ പ്രോജക്ട് സമയക്രമം',
    'dashboard.documents.metro.timeline.summary': 'ഘട്ടം 2 മെട്രോ നിർമ്മാണത്തിനുള്ള അപ്‌ഡേറ്റ് ചെയ്ത പ്രോജക്ട് ടൈംലൈൻ...',
    'dashboard.documents.safety.guidelines.title': 'സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ അപ്‌ഡേറ്റ്',
    'dashboard.documents.safety.guidelines.summary': 'നിർമ്മാണ സൈറ്റുകൾക്കുള്ള മെച്ചപ്പെടുത്തിയ സുരക്ഷാ പ്രോട്ടോക്കോളുകൾ...',
    'dashboard.tags.finance': 'ധനകാര്യം',
    'dashboard.tags.report': 'റിപ്പോർട്ട്',
    'dashboard.tags.q3': 'Q3',
    'dashboard.tags.project': 'പ്രോജക്ട്',
    'dashboard.tags.timeline': 'സമയക്രമം',
    'dashboard.tags.metro': 'മെട്രോ',
    'dashboard.tags.safety': 'സുരക്ഷ',
    'dashboard.tags.guidelines': 'മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    'dashboard.tags.construction': 'നിർമ്മാണം',
    'dashboard.time.hours.ago.2': '2 മണിക്കൂർ മുമ്പ്',
    'dashboard.time.hours.ago.5': '5 മണിക്കൂർ മുമ്പ്',
    'dashboard.time.day.ago.1': '1 ദിവസം മുമ്പ്',
    'dashboard.time.minutes.ago.30': '30 മിനിറ്റ് മുമ്പ്',
    'dashboard.insights.documents.processed': 'ഇന്ന് പ്രോസസ്സ് ചെയ്ത ഡോക്യുമെന്റുകൾ',
    'dashboard.insights.ai.summaries': 'AI സംഗ്രഹങ്ങൾ സൃഷ്ടിച്ചു',
    'dashboard.insights.pending.reviews': 'തീർപ്പുകൽപ്പിക്കാത്ത അവലോകനങ്ങൾ',
    
    // Sidebar
    'sidebar.menu': 'മെനു',
    'sidebar.dashboard.title': 'ഡാഷ്‌ബോർഡ്',
    'sidebar.dashboard.description': 'അവലോകനവും ഉൾക്കാഴ്ചകളും',
    'sidebar.documents.title': 'പ്രമാണങ്ങൾ',
    'sidebar.documents.description': 'ബ്രൗസ് ചെയ്യുകയും മാനേജ് ചെയ്യുകയും',
    'sidebar.ai.title': 'AI സവിശേഷതകൾ',
    'sidebar.ai.description': 'സ്മാർട്ട് ഓട്ടോമേഷൻ',
    'sidebar.notices.title': 'അറിയിപ്പുകൾ',
    'sidebar.notices.description': 'പ്രഖ്യാപനങ്ങൾ',
    'sidebar.reminders.title': 'ഓർമ്മപ്പെടുത്തലുകൾ',
    'sidebar.reminders.description': 'ടാസ്കുകളും ഡെഡ്‌ലൈനുകളും',
    'sidebar.departments.title': 'വകുപ്പുകൾ',
    'sidebar.departments.description': 'ടീം കോൺടാക്റ്റുകൾ',
    'sidebar.history.title': 'ചരിത്രം',
    'sidebar.history.description': 'പ്രവർത്തന ലോഗ്',
    'sidebar.help.title': 'സഹായവും പിന്തുണയും',
    'sidebar.help.description': 'സഹായം നേടുക',
    'sidebar.settings.title': 'ക്രമീകരണങ്ങൾ',
    'sidebar.settings.description': 'സുരക്ഷയും മുൻഗണനകളും',
    'sidebar.urgent.items': 'അടിയന്തിര ഇനങ്ങൾ',
    'sidebar.urgent.attention': 'ഉടനടി ശ്രദ്ധ ആവശ്യമാണ്',
    'sidebar.footer.platform': 'KMRL പ്ലാറ്റ്ഫോം',
    'sidebar.footer.copyright': '© 2024 കൊച്ചി മെട്രോ',

    // Documents Section
    'documents.title': 'പ്രമാണങ്ങൾ',
    'documents.button.upload': 'ഡോക്യുമെന്റ് അപ്‌ലോഡ് ചെയ്യുക',
    'documents.button.open': 'തുറക്കുക',
    'documents.button.share': 'പങ്കിടുക',
    'documents.search.placeholder': 'ശീർഷകം, ഉള്ളടക്കം അല്ലെങ്കിൽ ടാഗുകൾ ഉപയോഗിച്ച് പ്രമാണങ്ങൾ തിരയുക...',
    'documents.filters.title': 'ഫിൽട്ടറുകളും വിഭാഗങ്ങളും',
    'documents.filters.departments': 'വകുപ്പുകൾ',
    'documents.filters.file.types': 'ഫയൽ തരങ്ങൾ',
    'documents.filters.popular.tags': 'ജനപ്രിയ ടാഗുകൾ',
    'documents.category.all': 'എല്ലാം',
    'documents.category.project.reports': 'പ്രോജക്ട് റിപ്പോർട്ടുകൾ',
    'documents.category.safety': 'സുരക്ഷ',
    'documents.category.finance': 'ധനകാര്യം',
    'documents.category.training': 'പരിശീലനം',
    'documents.category.operations': 'പ്രവർത്തനങ്ങൾ',
    'documents.file.types.pdf': 'PDF പ്രമാണങ്ങൾ',
    'documents.file.types.word': 'Word പ്രമാണങ്ങൾ',
    'documents.file.types.spreadsheet': 'സ്പ്രെഡ്ഷീറ്റുകൾ',
    'documents.badge.urgent': 'അടിയന്തിരം',
    'documents.no.documents.title': 'പ്രമാണങ്ങൾ കണ്ടെത്തിയില്ല',
    'documents.no.documents.description': 'നിങ്ങളുടെ തിരയൽ പദങ്ങൾ അല്ലെങ്കിൽ ഫിൽട്ടറുകൾ ക്രമീകരിക്കാൻ ശ്രമിക്കുക',
    'documents.metro.expansion.title': 'മെട്രോ വിപുലീകരണ പദ്ധതി റിപ്പോർട്ട്',
    'documents.metro.expansion.summary': 'ടൈംലൈൻ, ബജറ്റ് വിഹിതം, സാങ്കേതിക സവിശേഷതകൾ എന്നിവ ഉൾപ്പെടെ ഘട്ടം 2 മെട്രോ വിപുലീകരണത്തിന്റെ സമഗ്ര വിശകലനം.',
    'documents.safety.protocol.title': 'സുരക്ഷാ പ്രോട്ടോക്കോൾ മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    'documents.safety.protocol.summary': 'എല്ലാ KMRL പ്രവർത്തനങ്ങൾക്കും നിർമ്മാണ പ്രവർത്തനങ്ങൾക്കുമുള്ള അപ്‌ഡേറ്റ് ചെയ്ത സുരക്ഷാ നടപടികളും അനുസരണ ആവശ്യകതകളും.',
    'documents.budget.allocation.title': 'ബജറ്റ് വിഹിതം Q4 2024',
    'documents.budget.allocation.summary': 'വകുപ്പുകളിലുടനീളമുള്ള വിഭവ വിഹിതവും വരാനിരിക്കുന്ന പ്രോജക്റ്റുകളും കാണിക്കുന്ന ത്രൈമാസിക സാമ്പത്തിക വിഭജനം.',
    'documents.training.manual.title': 'ജീവനക്കാരുടെ പരിശീലന കൈപ്പുസ്തകം',
    'documents.training.manual.summary': 'പ്രവർത്തനങ്ങൾ, സുരക്ഷ, കമ്പനി നയങ്ങൾ എന്നിവ ഉൾക്കൊള്ളുന്ന പുതിയ ജീവനക്കാർക്കുള്ള സമ്പൂർണ്ണ പരിശീലന ഗൈഡ്.',
    'documents.uploader.engineering': 'എഞ്ചിനീയറിംഗ് ടീം',
    'documents.uploader.safety': 'സുരക്ഷാ വകുപ്പ്',
    'documents.uploader.finance': 'ധനകാര്യ വകുപ്പ്',
    'documents.uploader.hr': 'HR വകുപ്പ്',
    'documents.tags.metro': 'മെട്രോ',
    'documents.tags.expansion': 'വിപുലീകരണം',
    'documents.tags.engineering': 'എഞ്ചിനീയറിംഗ്',
    'documents.tags.safety': 'സുരക്ഷ',
    'documents.tags.protocol': 'പ്രോട്ടോക്കോൾ',
    'documents.tags.guidelines': 'മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    'documents.tags.budget': 'ബജറ്റ്',
    'documents.tags.finance': 'ധനകാര്യം',
    'documents.tags.q4': 'Q4',
    'documents.tags.training': 'പരിശീലനം',
    'documents.tags.employee': 'ജീവനക്കാരൻ',
    'documents.tags.manual': 'കൈപ്പുസ്തകം',

    // AI Features Section
    'ai.features.title': 'AI സവിശേഷതകൾ',
    'ai.features.description': 'നിങ്ങളുടെ പ്രമാണങ്ങൾ സ്വയമേവ പ്രോസസ്സ് ചെയ്യാനും സംഗ്രഹിക്കാനും മെച്ചപ്പെടുത്താനും അത്യാധുനിക AI പ്രയോജനപ്പെടുത്തുക.',
    
    // AI Summaries
    'ai.summaries.title': 'സംഗ്രഹങ്ങൾ',
    'ai.summaries.tab': 'സംഗ്രഹങ്ങൾ',
    'ai.summaries.generate': 'സംഗ്രഹം സൃഷ്ടിക്കുക',
    'ai.summaries.generated': 'AI സൃഷ്ടിച്ച സംഗ്രഹം',
    'ai.summaries.copy': 'പകർത്തുക',
    'ai.summaries.copied': 'പകർത്തി!',
    'ai.summaries.copied.desc': 'സംഗ്രഹം ക്ലിപ്പ്‌ബോർഡിലേക്ക് പകർത്തി.',
    'ai.summaries.confidence': 'വിശ്വാസ്യത',
    'ai.summaries.last.processed': 'അവസാനമായി പ്രോസസ്സ് ചെയ്തത്',
    'ai.summaries.tips.title': 'AI സംഗ്രഹ നുറുങ്ങുകൾ',
    'ai.summaries.tips.auto': '• എല്ലാ പ്രമാണങ്ങൾക്കും സംഗ്രഹങ്ങൾ സ്വയമേവ സൃഷ്ടിക്കപ്പെടുന്നു',
    'ai.summaries.tips.nlp': '• വികസിത NLP ഉപയോഗിച്ച് പ്രധാന പോയിന്റുകൾ എക്‌സ്ട്രാക്റ്റ് ചെയ്യുന്നു',
    'ai.summaries.tips.confidence': '• വിശ്വാസ്യത സ്‌കോറുകൾ പ്രോസസ്സിംഗ് കൃത്യത സൂചിപ്പിക്കുന്നു',

    // AI Podcast
    'ai.podcast.title': 'പോഡ്കാസ്റ്റ്',
    'ai.podcast.tab': 'പോഡ്കാസ്റ്റ്',
    'ai.podcast.listen': 'കേൾക്കുക',
    'ai.podcast.download': 'ഡൗൺലോഡ് ചെയ്യുക',
    'ai.podcast.playing': 'പോഡ്കാസ്റ്റ് പ്ലേ ചെയ്യുന്നു',
    'ai.podcast.playing.desc': 'ഡോക്യുമെന്റ് സംഗ്രഹത്തിന്റെ ഓഡിയോ പ്ലേബാക്ക് ആരംഭിക്കുന്നു...',
    'ai.podcast.available': 'ഇംഗ്ലീഷിലും ഹിന്ദിയിലും ഓഡിയോ സംഗ്രഹം ലഭ്യമാണ്',
    'ai.podcast.last.generated': 'അവസാനമായി സൃഷ്ടിച്ചത്',
    'ai.podcast.features.title': 'പോഡ്കാസ്റ്റ് സവിശേഷതകൾ',
    'ai.podcast.features.voice': '• ഒന്നിലധികം ഭാഷകളിൽ സ്വാഭാവിക ശബ്ദ സിന്തസിസ്',
    'ai.podcast.features.speed': '• ക്രമീകരിക്കാവുന്ന പ്ലേബാക്ക് വേഗതയും വോയ്സ് ടോണും',
    'ai.podcast.features.offline': '• ഓഫ്‌ലൈൻ കേൾക്കാൻ ഓഡിയോ ഡൗൺലോഡ് ചെയ്യുക',

    // AI Auto-Tagging
    'ai.tagging.title': 'സ്വയം-ടാഗിംഗ്',
    'ai.tagging.tab': 'സ്വയം-ടാഗിംഗ്',
    'ai.tagging.auto.tag': 'സ്വയം-ടാഗ് ഡോക്യുമെന്റ്',
    'ai.tagging.last.processed': 'അവസാനമായി പ്രോസസ്സ് ചെയ്തത്: സ്വയം-വർഗ്ഗീകരിച്ചത്',
    'ai.tagging.instructions.title': 'സ്വയം-ടാഗിംഗ് നിർദ്ദേശങ്ങൾ',
    'ai.tagging.instructions.detect': '• ഉള്ളടക്കത്തിൽ നിന്ന് വിഭാഗങ്ങൾ സ്വയമേവ കണ്ടെത്തുന്നു',
    'ai.tagging.instructions.manual': '• കൃത്യമായ ക്രമീകരണത്തിനായി മാനുവൽ ടാഗ് എഡിറ്റിംഗ് ലഭ്യമാണ്',
    'ai.tagging.instructions.confidence': '• ഉയർന്ന വിശ്വാസ്യത സ്‌കോറുകൾ കൃത്യമായ ടാഗിംഗ് സൂചിപ്പിക്കുന്നു',
    'ai.tagging.activated': 'AI ഫീച്ചർ',
    'ai.tagging.activated.desc': 'പ്രവർത്തനം സജീവമാക്കി',
    'ai.tagging.analyzing': 'AI സ്വയം-ടാഗിംഗ്',
    'ai.tagging.analyzing.desc': 'ഡോക്യുമെന്റ് ഉള്ളടക്കം വിശകലനം ചെയ്യുകയും ടാഗുകൾ സൃഷ്ടിക്കുകയും ചെയ്യുന്നു...',
    'ai.tagging.generated': 'ടാഗുകൾ സൃഷ്ടിച്ചു',
    'ai.tagging.generated.desc': 'ഡോക്യുമെന്റ് സ്വയമേവ ടാഗ് ചെയ്യുകയും വർഗ്ഗീകരിക്കുകയും ചെയ്തു.',

    // AI Feature Actions
    'ai.summary.generated': 'സംഗ്രഹം സൃഷ്ടിച്ചു',
    'ai.summary.generated.desc': 'AI സംഗ്രഹം ഇപ്പോൾ താഴെ പ്രദർശിപ്പിച്ചിരിക്കുന്നു.',
    'ai.summary.generated.content': '2024 Q3-ലെ പ്രധാന സാമ്പത്തിക ഡാറ്റ ഈ പ്രമാണത്തിൽ അടങ്ങിയിരിക്കുന്നു. പ്രധാന ഹൈലൈറ്റുകളിൽ വരുമാനത്തിൽ 15% വർധന, മെട്രോ ലൈൻ വിപുലീകരണ പദ്ധതി ഘട്ടം 2 ന്റെ വിജയകരമായ പൂർത്തീകരണം, പുതിയ സുരക്ഷാ പ്രോട്ടോക്കോളുകളുടെ നടപ്പാക്കൽ എന്നിവ ഉൾപ്പെടുന്നു. അടിസ്ഥാന സൗകര്യ വികസനത്തിലും ജീവനക്കാരുടെ പരിശീലന പരിപാടികളിലും തുടർന്നുള്ള നിക്ഷേപം ഈ പ്രമാണം ശുപാർശ ചെയ്യുന്നു.',

    // AI Document Titles and Content
    'ai.document.q3.report': 'Q3 സാമ്പത്തിക റിപ്പോർട്ട് 2024',
    'ai.document.metro.timeline': 'മെട്രോ പ്രോജക്റ്റ് സമയക്രമം',
    'ai.document.budget.allocation': 'ബജറ്റ് വിഹിതം Q4 2024',
    'ai.document.safety.guidelines': 'സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ അപ്‌ഡേറ്റ്',
    'ai.document.training.manual': 'ജീവനക്കാരുടെ പരിശീലന കൈപ്പുസ്തകം',

    // AI Summary Content
    'ai.summary.q3.content': 'ഈ ത്രൈമാസിക റിപ്പോർട്ട് 15% വരുമാന വളർച്ചയോടുകൂടിയ ശക്തമായ പ്രകടനം കാണിക്കുന്നു. പ്രധാന ഹൈലൈറ്റുകളിൽ വർധിച്ച പ്രോജക്റ്റ് പൂർത്തീകരണങ്ങൾ, മെച്ചപ്പെട്ട പ്രവർത്തന കാര്യക്ഷമത, വിജയകരമായ ചെലവ് മാനേജ്മെന്റ് തന്ത്രങ്ങൾ എന്നിവ ഉൾപ്പെടുന്നു.',
    'ai.summary.metro.content': 'പുതിയ നാഴികക്കല്ലുകളോടുകൂടിയ ഘട്ടം 2 മെട്രോ വിപുലീകരണ സമയക്രമം അപ്‌ഡേറ്റ് ചെയ്തു. 78% പൂർത്തീകരണത്തോടുകൂടി പ്രോജക്റ്റ് ഷെഡ്യൂളിൽ തുടരുന്നു. നിർണായക പാത ഇനങ്ങളിൽ സ്റ്റേഷൻ നിർമ്മാണവും സിഗ്നൽ സിസ്റ്റം ഇൻസ്റ്റാളേഷനും ഉൾപ്പെടുന്നു.',

    // Key Points
    'ai.keypoints.revenue.growth': '15% വരുമാന വളർച്ച',
    'ai.keypoints.cost.reduction': '8% ചെലവ് കുറവ്',
    'ai.keypoints.projects.completed': '3 പ്രധാന പ്രോജക്റ്റുകൾ പൂർത്തിയായി',
    'ai.keypoints.project.completion': '78% പ്രോജക്റ്റ് പൂർത്തീകരണം',
    'ai.keypoints.on.schedule': 'ഷെഡ്യൂളിൽ ഡെലിവറി',
    'ai.keypoints.stations.operational': '2 സ്റ്റേഷനുകൾ പ്രവർത്തനസജ്ജം',

    // Tags in Malayalam
    'ai.tags.finance': 'ധനകാര്യം',
    'ai.tags.budget': 'ബജറ്റ്',
    'ai.tags.allocation': 'വിഹിതം',
    'ai.tags.safety': 'സുരക്ഷ',
    'ai.tags.protocol': 'പ്രോട്ടോക്കോൾ',
    'ai.tags.guidelines': 'മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    'ai.tags.training': 'പരിശീലനം',
    'ai.tags.hr': 'HR',
    'ai.tags.onboarding': 'ഓൺബോർഡിംഗ്',
    'ai.tags.procedures': 'നടപടിക്രമങ്ങൾ',

    // Reminders
    'ai.reminders.budget.review': 'ബജറ്റ് അവലോകന അവസാന തീയതി',
    'ai.reminders.safety.training': 'സുരക്ഷാ പരിശീലനം പൂർത്തീകരണം',
    'ai.reminders.project.milestone': 'പ്രോജക്റ്റ് നാഴികക്കല്ല് അവലോകനം',

    // File sizes and measurements
    'ai.file.size.mb': 'MB',
    'ai.file.words': 'വാക്കുകൾ',
    'ai.file.pages': 'പേജുകൾ',
    'ai.duration.minutes': 'മിനിറ്റ്',

    // Additional common AI terms
    'ai.processing': 'പ്രോസസ്സിംഗ്',
    'ai.analyzing': 'വിശകലനം ചെയ്യുന്നു',
    'ai.generating': 'സൃഷ്ടിക്കുന്നു',
    'ai.completed': 'പൂർത്തിയായി',
    'ai.failed': 'പരാജയപ്പെട്ടു',
    'ai.ready': 'തയ്യാർ',
    'ai.loading': 'ലോഡുചെയ്യുന്നു',

    // Notices Section
    'notices.title': 'അറിയിപ്പുകൾ',
    'notices.description': 'പ്രധാന പ്രഖ്യാപനങ്ങളും അപ്‌ഡേറ്റുകളും',
    'notices.button.compose': 'അറിയിപ്പ് രചിക്കുക',
    'notices.button.view': 'കാണുക',
    'notices.button.view.details': 'വിവരങ്ങൾ കാണുക',
    'notices.button.mark.read': 'വായിച്ചതായി അടയാളപ്പെടുത്തുക',
    'notices.button.share': 'പങ്കിടുക',
    'notices.button.archive': 'ആർക്കൈവ് ചെയ്യുക',
    'notices.button.publish': 'അറിയിപ്പ് പ്രസിദ്ധീകരിക്കുക',
    'notices.badge.new': 'പുതിയത്',
    'notices.attachments': 'അറ്റാച്ച്‌മെന്റുകൾ',
    'notices.critical.title': 'നിർണായക അറിയിപ്പുകൾ',
    'notices.empty.title': 'അറിയിപ്പുകൾ ഇല്ല',
    'notices.empty.description': 'ഇതുവരെ അറിയിപ്പുകൾ പോസ്റ്റ് ചെയ്തിട്ടില്ല',

    // Compose Form
    'notices.compose.title': 'പുതിയ അറിയിപ്പ് രചിക്കുക',
    'notices.compose.form.title': 'ശീർഷകം',
    'notices.compose.form.title.placeholder': 'അറിയിപ്പിന്റെ ശീർഷകം നൽകുക...',
    'notices.compose.form.message': 'സന്ദേശം',
    'notices.compose.form.message.placeholder': 'അറിയിപ്പിന്റെ സന്ദേശം നൽകുക...',
    'notices.compose.form.priority': 'മുൻഗണന',
    'notices.compose.form.department': 'വകുപ്പ്',

    // Priority levels
    'notices.priority.all': 'എല്ലാ മുൻഗണനകളും',
    'notices.priority.normal': 'സാധാരണ',
    'notices.priority.high': 'ഉയർന്നത്',
    'notices.priority.urgent': 'അടിയന്തിരം',

    // Departments
    'notices.departments.all': 'എല്ലാ വകുപ്പുകളും',
    'notices.departments.engineering': 'എഞ്ചിനീയറിംഗ് വകുപ്പ്',
    'notices.departments.safety': 'സുരക്ഷാ വകുപ്പ്',
    'notices.departments.finance': 'ധനകാര്യ വകുപ്പ്',
    'notices.departments.hr': 'HR വകുപ്പ്',
    'notices.departments.it': 'ഐടി വകുപ്പ്',
    'notices.departments.operations': 'പ്രവർത്തന വകുപ്പ്',

    // Authors
    'notices.authors.it.admin': 'ഐടി അഡ്‌മിൻ',
    'notices.authors.safety.officer': 'സുരക്ഷാ ഓഫീസർ',
    'notices.authors.hr.manager': 'HR മാനേജർ',
    'notices.authors.current.user': 'നിലവിലെ ഉപയോക്താവ്',

    // Filter
    'notices.filter.department': 'വകുപ്പ് അടിസ്ഥാനത്തിൽ ഫിൽട്ടർ ചെയ്യുക',
    'notices.filter.priority': 'മുൻഗണന അടിസ്ഥാനത്തിൽ ഫിൽട്ടർ ചെയ്യുക',

    // Sample notices
    'notices.system.maintenance.title': 'സിസ്റ്റം മെയിന്റനൻസ് ഷെഡ്യൂൾ',
    'notices.system.maintenance.message': 'ജനുവരി 20-ന് രാവിലെ 2:00 മുതൽ 6:00 വരെ ഡോക്യുമെന്റ് മാനേജ്മെന്റ് സിസ്റ്റം മെയിന്റനൻസിന് വിധേയമാകും. ഈ സമയത്തിന് മുമ്പ് നിങ്ങളുടെ ജോലി സേവ് ചെയ്യുക.',
    'notices.safety.protocol.title': 'പുതിയ സുരക്ഷാ പ്രോട്ടോക്കോൾ നടപ്പാക്കൽ',
    'notices.safety.protocol.message': 'എല്ലാ ജീവനക്കാരും ജനുവരി 25-നകം അപ്‌ഡേറ്റ് ചെയ്ത സുരക്ഷാ പരിശീലനം പൂർത്തിയാക്കണം. കൂടുതൽ വിവരങ്ങൾക്ക് പരിശീലന പോർട്ടൽ പരിശോധിക്കുക.',
    'notices.team.meeting.title': 'പ്രതിമാസ ടീം മീറ്റിംഗ്',
    'notices.team.meeting.message': 'പ്രതിമാസ എല്ലാവരുടെയും മീറ്റിംഗ് ജനുവരി 22-ന് രാവിലെ 10:00-ന് മെയിൻ കോൺഫറൻസ് റൂമിൽ നിശ്ചയിച്ചിരിക്കുന്നു.',

    // Reminders Section
    'reminders.title': 'ഓർമ്മപ്പെടുത്തലുകൾ',
    'reminders.description': 'ടാസ്കുകളും അവസാന തീയതികളും മാനേജ് ചെയ്യുക',
    'reminders.due': 'അവസാന തീയതി',
    'reminders.source': 'ഉറവിടം',
    'reminders.completed': 'പൂർത്തിയായി',
    'reminders.empty.title': 'തീർപ്പാക്കാനുള്ള ഓർമ്മപ്പെടുത്തലുകൾ ഇല്ല',
    'reminders.empty.description': 'നിങ്ങൾ എല്ലാം പൂർത്തിയാക്കി! പുതിയ ഓർമ്മപ്പെടുത്തൽ സൃഷ്ടിക്കാൻ + ബട്ടൺ ഉപയോഗിക്കുക.',
    'reminders.completed.recently': 'അടുത്തിടെ പൂർത്തിയാക്കിയത്',

    // Create Form
    'reminders.create.title': 'പുതിയ ഓർമ്മപ്പെടുത്തൽ സൃഷ്ടിക്കുക',
    'reminders.form.title': 'ശീർഷകം',
    'reminders.form.title.placeholder': 'ഓർമ്മപ്പെടുത്തലിന്റെ ശീർഷകം നൽകുക...',
    'reminders.form.description': 'വിവരണം',
    'reminders.form.description.placeholder': 'വിവരണം നൽകുക...',
    'reminders.form.due.date': 'അവസാന തീയതിയും സമയവും',
    'reminders.form.priority': 'മുൻഗണന',

    // Buttons
    'reminders.button.create': 'ഓർമ്മപ്പെടുത്തൽ സൃഷ്ടിക്കുക',
    'reminders.button.mark.done': 'പൂർത്തിയായി എന്ന് അടയാളപ്പെടുത്തുക',
    'reminders.button.snooze': 'സ്‌നൂസ്',

    // Priority levels
    'reminders.priority.normal': 'സാധാരണ',
    'reminders.priority.high': 'ഉയർന്നത്',
    'reminders.priority.urgent': 'അടിയന്തിരം',

    // Badges
    'reminders.badge.overdue': 'കാലാവധി കഴിഞ്ഞു',
    'reminders.badge.completed': 'പൂർത്തിയായി',

    // Snooze options
    'reminders.snooze.title': 'ഓർമ്മപ്പെടുത്തൽ സ്‌നൂസ് ചെയ്തു',
    'reminders.snooze.description': 'ഓർമ്മപ്പെടുത്തൽ മാറ്റിവെച്ചു',
    'reminders.snooze.10min': '10 മിനിറ്റ്',
    'reminders.snooze.1hour': '1 മണിക്കൂർ',
    'reminders.snooze.1day': '1 ദിവസം',

    // Success messages
    'reminders.create.success.title': 'ഓർമ്മപ്പെടുത്തൽ സൃഷ്ടിച്ചു',
    'reminders.create.success.description': 'നിങ്ങളുടെ ഓർമ്മപ്പെടുത്തൽ വിജയകരമായി സൃഷ്ടിച്ചു.',

    // Sources
    'reminders.source.manual': 'മാനുവൽ എൻട്രി',
    'reminders.source.ai.budget': 'AI വിശകലനം - ബജറ്റ് വിഹിതം Q4 2024.xlsx',
    'reminders.source.ai.metro': 'AI വിശകലനം - മെട്രോ വിപുലീകരണ പദ്ധതി റിപ്പോർട്ട്.pdf',

    // Sample reminders
    'reminders.safety.training.title': 'സുരക്ഷാ പരിശീലന റിപ്പോർട്ട് സമർപ്പിക്കുക',
    'reminders.safety.training.description': 'ത്രൈമാസിക സുരക്ഷാ പരിശീലന പൂർത്തീകരണ റിപ്പോർട്ട് പൂർത്തിയാക്കി സമർപ്പിക്കുക',
    'reminders.budget.review.title': 'ബജറ്റ് വിഹിത ഡോക്യുമെന്റ് അവലോകനം ചെയ്യുക',
    'reminders.budget.review.description': 'AI, Q4 2024 ബജറ്റ് വിഹിത ഡോക്യുമെന്റിൽ അവസാന തീയതി കണ്ടെത്തി',
    'reminders.team.meeting.title': 'പ്രതിമാസ ടീം മീറ്റിംഗിൽ പങ്കെടുക്കുക',
    'reminders.team.meeting.description': 'പ്രധാന കോൺഫറൻസ് റൂമിൽ നടക്കുന്ന പ്രതിമാസ എല്ലാ ജീവനക്കാരുടെയും മീറ്റിംഗ്',
    'reminders.metro.milestone.title': 'മെട്രോ പ്രോജക്റ്റ് ഘട്ടം 2 നാഴികക്കല്ല് അവലോകനം',
    'reminders.metro.milestone.description': 'AI, മെട്രോ വിപുലീകരണ പദ്ധതി റിപ്പോർട്ടിൽ ഒരു പ്രധാന അവസാന തീയതി കണ്ടെത്തി',

    // Departments Section - add to ml object
    'departments.title': 'വകുപ്പുകൾ',
    'departments.description': 'സംഘടനാ ഘടനയും ടീം അംഗങ്ങളും',
    'departments.head': 'തലവൻ',
    'departments.members': 'അംഗങ്ങൾ',
    'departments.total.members': 'മൊത്തം അംഗങ്ങൾ',
    'departments.members.title': 'വകുപ്പ് അംഗങ്ങൾ',
    'departments.badge.head': 'തലവൻ',
    'departments.more.members': 'കൂടുതൽ അംഗങ്ങൾ',
    'departments.button.view': 'വകുപ്പ് കാണുക',
    'departments.stats.departments': 'വകുപ്പുകൾ',
    'departments.stats.total.employees': 'മൊത്തം ജീവനക്കാർ',
    'departments.stats.average.size': 'ശരാശരി വലുപ്പം',
    'departments.stats.largest.dept': 'ഏറ്റവും വലിയ വകുപ്പ്',

    // Engineering Department
    'departments.engineering.name': 'എഞ്ചിനീയറിംഗ് വകുപ്പ്',
    'departments.engineering.description': 'മെട്രോ സിസ്റ്റം ഡിസൈൻ, നിർമ്മാണം, സാങ്കേതിക പ്രവർത്തനങ്ങൾ എന്നിവയുടെ ഉത്തരവാദിത്തം',
    'departments.engineering.head': 'ഡോ. രാജേഷ് കുമാർ',
    'departments.engineering.location': 'ടെക്നിക്കൽ ബിൽഡിംഗ് - ഫ്ലോർ 3',
    'departments.engineering.members.head.name': 'ഡോ. രാജേഷ് കുമാർ',
    'departments.engineering.members.head.role': 'ചീഫ് എഞ്ചിനീയർ',
    'departments.engineering.members.senior.name': 'പ്രിയ നായർ',
    'departments.engineering.members.senior.role': 'സീനിയർ ഡിസൈൻ എഞ്ചിനീയർ',
    'departments.engineering.members.project.name': 'അർജുൻ മേനോൻ',
    'departments.engineering.members.project.role': 'പ്രോജക്ട് എഞ്ചിനീയർ',
    'departments.engineering.members.quality.name': 'ദീപിക ശർമ്മ',
    'departments.engineering.members.quality.role': 'ഗുണനിലവാര എഞ്ചിനീയർ',

    // Safety Department
    'departments.safety.name': 'സുരക്ഷാ വകുപ്പ്',
    'departments.safety.description': 'എല്ലാ പ്രവർത്തനങ്ങളിലും സുരക്ഷാ മാനദണ്ഡങ്ങളും പ്രോട്ടോക്കോളുകളും പാലിക്കുന്നത് ഉറപ്പാക്കുന്നു',
    'departments.safety.head': 'സുരേഷ് പിള്ള',
    'departments.safety.location': 'സേഫ്റ്റി ബിൽഡിംഗ് - ഫ്ലോർ 2',
    'departments.safety.members.director.name': 'സുരേഷ് പിള്ള',
    'departments.safety.members.director.role': 'സുരക്ഷാ ഡയറക്ടർ',
    'departments.safety.members.inspector.name': 'കവിത രാധാകൃഷ്ണൻ',
    'departments.safety.members.inspector.role': 'സുരക്ഷാ ഇൻസ്പെക്ടർ',
    'departments.safety.members.coordinator.name': 'രവി ചന്ദ്രൻ',
    'departments.safety.members.coordinator.role': 'സുരക്ഷാ കോർഡിനേറ്റർ',

    // Finance Department
    'departments.finance.name': 'ധനകാര്യ വകുപ്പ്',
    'departments.finance.description': 'ബജറ്റുകൾ, സാമ്പത്തിക ആസൂത്രണം, വിഭവ വിഹിതം എന്നിവ കൈകാര്യം ചെയ്യുന്നു',
    'departments.finance.head': 'ലക്ഷ്മി നമ്പ്യാർ',
    'departments.finance.location': 'അഡ്മിൻ ബിൽഡിംഗ് - ഫ്ലോർ 4',
    'departments.finance.members.director.name': 'ലക്ഷ്മി നമ്പ്യാർ',
    'departments.finance.members.director.role': 'ധനകാര്യ ഡയറക്ടർ',
    'departments.finance.members.accountant.name': 'വിനോദ് തോമസ്',
    'departments.finance.members.accountant.role': 'സീനിയർ അക്കൗണ്ടന്റ്',
    'departments.finance.members.analyst.name': 'അഞ്ജലി കൃഷ്ണൻ',
    'departments.finance.members.analyst.role': 'ബജറ്റ് അനലിസ്റ്റ്',

    // HR Department
    'departments.hr.name': 'HR വകുപ്പ്',
    'departments.hr.description': 'മനുഷ്യ വിഭവശേഷി, ജീവനക്കാരുടെ ബന്ധങ്ങൾ, സംഘടനാ വികസനം',
    'departments.hr.head': 'മീര ഷെനോയ്',
    'departments.hr.location': 'അഡ്മിൻ ബിൽഡിംഗ് - ഫ്ലോർ 2',
    'departments.hr.members.director.name': 'മീര ഷെനോയ്',
    'departments.hr.members.director.role': 'HR ഡയറക്ടർ',
    'departments.hr.members.manager.name': 'അരുൺ കുമാർ',
    'departments.hr.members.manager.role': 'HR മാനേജർ',

    // IT Department
    'departments.it.name': 'ഐടി വകുപ്പ്',
    'departments.it.description': 'വിവര സാങ്കേതിക അടിസ്ഥാന സൗകര്യങ്ങളും ഡിജിറ്റൽ സമാധാനങ്ങളും',
    'departments.it.head': 'കിരൺ രാജ്',
    'departments.it.location': 'ടെക് സെന്റർ - ഫ്ലോർ 1',
    'departments.it.members.director.name': 'കിരൺ രാജ്',
    'departments.it.members.director.role': 'ഐടി ഡയറക്ടർ',
    'departments.it.members.admin.name': 'രോഹിത് വർമ്മ',
    'departments.it.members.admin.role': 'സിസ്റ്റം അഡ്മിനിസ്ട്രേറ്റർ',
    'departments.it.members.developer.name': 'സീത ദേവി',
    'departments.it.members.developer.role': 'സോഫ്റ്റ്‌വെയർ ഡെവലപ്പർ',

    // Operations Department
    'departments.operations.name': 'പ്രവർത്തന വകുപ്പ്',
    'departments.operations.description': 'ദൈനംദിന മെട്രോ പ്രവർത്തനങ്ങൾ, ഷെഡ്യൂളിംഗ്, യാത്രക്കാരുടെ സേവനങ്ങൾ',
    'departments.operations.head': 'മോഹൻ ദാസ്',
    'departments.operations.location': 'ഓപ്പറേഷൻസ് സെന്റർ - ഫ്ലോർ 1',
    'departments.operations.members.director.name': 'മോഹൻ ദാസ്',
    'departments.operations.members.director.role': 'ഓപ്പറേഷൻസ് ഡയറക്ടർ',
    'departments.operations.members.manager.name': 'ഗീത നായർ',
    'departments.operations.members.manager.role': 'ഓപ്പറേഷൻസ് മാനേജർ',
    'departments.operations.members.station.name': 'ശങ്കർ മേനോൻ',
    'departments.operations.members.station.role': 'സ്റ്റേഷൻ മാസ്റ്റർ',    

    // History Section
    'history.title': 'ചരിത്രം',
    'history.description': 'നിങ്ങളുടെ ഡൗൺലോഡുകളും വായിച്ച അറിയിപ്പുകളും ട്രാക്ക് ചെയ്യുക',
    'history.search.placeholder': 'ചരിത്രം തിരയുക...',
    'history.downloaded': 'ഡൗൺലോഡ് ചെയ്തത്',
    'history.read': 'വായിച്ചത്',
    'history.download.again': 'വീണ്ടും ഡൗൺലോഡ് ചെയ്യുക',
    'history.view.again': 'വീണ്ടും കാണുക',

    // Tabs
    'history.tabs.downloads': 'ഡൗൺലോഡുകൾ',
    'history.tabs.notices': 'വായിച്ച അറിയിപ്പുകൾ',

    // Categories
    'history.categories.all': 'എല്ലാം',
    'history.categories.project.reports': 'പ്രോജക്ട് റിപ്പോർട്ടുകൾ',
    'history.categories.safety': 'സുരക്ഷ',
    'history.categories.finance': 'ധനകാര്യം',
    'history.categories.training': 'പരിശീലനം',
    'history.categories.operations': 'പ്രവർത്തനങ്ങൾ',

    // Departments
    'history.departments.all': 'എല്ലാം',
    'history.departments.it': 'ഐടി വകുപ്പ്',
    'history.departments.safety': 'സുരക്ഷാ വകുപ്പ്',
    'history.departments.hr': 'HR വകുപ്പ്',
    'history.departments.finance': 'ധനകാര്യ വകുപ്പ്',
    'history.departments.engineering': 'എഞ്ചിനീയറിംഗ് വകുപ്പ്',

    // Priority
    'history.priority.normal': 'സാധാരണ',
    'history.priority.high': 'ഉയർന്നത്',
    'history.priority.urgent': 'അടിയന്തിരം',

    // Authors
    'history.authors.it.admin': 'ഐടി അഡ്‌മിൻ',
    'history.authors.safety.officer': 'സുരക്ഷാ ഓഫീസർ',
    'history.authors.hr.manager': 'HR മാനേജർ',
    'history.authors.finance.director': 'ധനകാര്യ ഡയറക്ടർ',
    'history.authors.safety.coordinator': 'സുരക്ഷാ കോർഡിനേറ്റർ',

    // Download History Documents
    'history.downloads.metro.expansion.title': 'മെട്രോ വിപുലീകരണ പദ്ധതി റിപ്പോർട്ട്',
    'history.downloads.safety.protocol.title': 'സുരക്ഷാ പ്രോട്ടോക്കോൾ മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    'history.downloads.budget.allocation.title': 'ബജറ്റ് വിഹിതം Q4 2024',
    'history.downloads.training.manual.title': 'ജീവനക്കാരുടെ പരിശീലന കൈപ്പുസ്തകം',
    'history.downloads.technical.specs.title': 'ടെക്നിക്കൽ സ്പെസിഫിക്കേഷനുകൾ ഘട്ടം 2',

    // Notice History
    'history.notices.system.maintenance.title': 'സിസ്റ്റം മെയിന്റനൻസ് ഷെഡ്യൂൾ',
    'history.notices.safety.protocol.title': 'പുതിയ സുരക്ഷാ പ്രോട്ടോക്കോൾ നടപ്പാക്കൽ',
    'history.notices.team.meeting.title': 'പ്രതിമാസ ടീം മീറ്റിംഗ്',
    'history.notices.budget.review.title': 'ബജറ്റ് അവലോകന മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    'history.notices.emergency.drill.title': 'എമർജൻസി ഡ്രിൽ ഷെഡ്യൂൾ',

    // Stats
    'history.stats.total.downloads': 'മൊത്തം ഡൗൺലോഡുകൾ',
    'history.stats.total.mb': 'മൊത്തം MB',
    'history.stats.categories': 'വിഭാഗങ്ങൾ',
    'history.stats.this.week': 'ഈ ആഴ്ച',
    'history.stats.total.read': 'മൊത്തം വായിച്ചത്',
    'history.stats.urgent': 'അടിയന്തിരം',
    'history.stats.departments': 'വകുപ്പുകൾ',

    // Empty States
    'history.no.downloads.title': 'ഡൗൺലോഡുകൾ കണ്ടെത്തിയില്ല',
    'history.no.downloads.description': 'നിങ്ങളുടെ തിരയൽ പദങ്ങൾ അല്ലെങ്കിൽ ഫിൽട്ടറുകൾ ക്രമീകരിക്കാൻ ശ്രമിക്കുക',
    'history.no.notices.title': 'അറിയിപ്പുകൾ കണ്ടെത്തിയില്ല',
    'history.no.notices.description': 'നിങ്ങളുടെ തിരയൽ പദങ്ങൾ അല്ലെങ്കിൽ ഫിൽട്ടറുകൾ ക്രമീകരിക്കാൻ ശ്രമിക്കുക',

    // Page Not Found
    'notfound.title': 'പേജ് കണ്ടെത്തിയില്ല',
    'notfound.description': 'നിങ്ങൾ തിരയുന്ന പേജ് നിലവിലില്ല.',
    'notfound.back.home': 'ഹോമിലേക്ക് മടങ്ങുക',


  }
};

// Translation Provider Component
export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    // Get language from localStorage or default to 'en'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kmrl-language') || 'en';
    }
    return 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kmrl-language', language);
    }
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[language as keyof typeof translations]?.[key] || translations.en[key];
    return translation || key;
  };

  const contextValue = {
    language,
    setLanguage,
    t
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};