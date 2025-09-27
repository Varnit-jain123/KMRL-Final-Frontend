import { useState } from "react";
import { Users, User, Mail, Phone, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "../contexts/TranslationContext";

interface DepartmentsSectionProps {}

// Mock departments data with translation keys
const departments = [
  {
    id: "dept1",
    nameKey: "departments.engineering.name",
    descriptionKey: "departments.engineering.description",
    headKey: "departments.engineering.head",
    locationKey: "departments.engineering.location",
    memberCount: 45,
    members: [
      {
        id: "emp1",
        nameKey: "departments.engineering.members.head.name",
        roleKey: "departments.engineering.members.head.role",
        email: "rajesh.kumar@kmrl.com",
        phone: "+91 9876543210",
        avatar: "",
        isHead: true
      },
      {
        id: "emp2", 
        nameKey: "departments.engineering.members.senior.name",
        roleKey: "departments.engineering.members.senior.role",
        email: "priya.nair@kmrl.com",
        phone: "+91 9876543211",
        avatar: "",
        isHead: false
      },
      {
        id: "emp3",
        nameKey: "departments.engineering.members.project.name",
        roleKey: "departments.engineering.members.project.role",
        email: "arjun.menon@kmrl.com", 
        phone: "+91 9876543212",
        avatar: "",
        isHead: false
      },
      {
        id: "emp4",
        nameKey: "departments.engineering.members.quality.name",
        roleKey: "departments.engineering.members.quality.role",
        email: "deepika.sharma@kmrl.com",
        phone: "+91 9876543213", 
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept2",
    nameKey: "departments.safety.name",
    descriptionKey: "departments.safety.description",
    headKey: "departments.safety.head",
    locationKey: "departments.safety.location",
    memberCount: 28,
    members: [
      {
        id: "emp5",
        nameKey: "departments.safety.members.director.name",
        roleKey: "departments.safety.members.director.role",
        email: "suresh.pillai@kmrl.com",
        phone: "+91 9876543214",
        avatar: "",
        isHead: true
      },
      {
        id: "emp6",
        nameKey: "departments.safety.members.inspector.name",
        roleKey: "departments.safety.members.inspector.role",
        email: "kavitha.r@kmrl.com",
        phone: "+91 9876543215",
        avatar: "",
        isHead: false
      },
      {
        id: "emp7",
        nameKey: "departments.safety.members.coordinator.name",
        roleKey: "departments.safety.members.coordinator.role",
        email: "ravi.chandran@kmrl.com",
        phone: "+91 9876543216",
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept3",
    nameKey: "departments.finance.name",
    descriptionKey: "departments.finance.description",
    headKey: "departments.finance.head",
    locationKey: "departments.finance.location",
    memberCount: 22,
    members: [
      {
        id: "emp8",
        nameKey: "departments.finance.members.director.name",
        roleKey: "departments.finance.members.director.role",
        email: "lakshmi.nambiar@kmrl.com",
        phone: "+91 9876543217",
        avatar: "",
        isHead: true
      },
      {
        id: "emp9",
        nameKey: "departments.finance.members.accountant.name",
        roleKey: "departments.finance.members.accountant.role",
        email: "vinod.thomas@kmrl.com",
        phone: "+91 9876543218",
        avatar: "",
        isHead: false
      },
      {
        id: "emp10",
        nameKey: "departments.finance.members.analyst.name",
        roleKey: "departments.finance.members.analyst.role",
        email: "anjali.krishnan@kmrl.com",
        phone: "+91 9876543219",
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept4",
    nameKey: "departments.hr.name",
    descriptionKey: "departments.hr.description",
    headKey: "departments.hr.head",
    locationKey: "departments.hr.location",
    memberCount: 18,
    members: [
      {
        id: "emp11",
        nameKey: "departments.hr.members.director.name",
        roleKey: "departments.hr.members.director.role",
        email: "meera.shenoy@kmrl.com",
        phone: "+91 9876543220",
        avatar: "",
        isHead: true
      },
      {
        id: "emp12",
        nameKey: "departments.hr.members.manager.name",
        roleKey: "departments.hr.members.manager.role",
        email: "arun.kumar@kmrl.com",
        phone: "+91 9876543221",
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept5",
    nameKey: "departments.it.name",
    descriptionKey: "departments.it.description",
    headKey: "departments.it.head",
    locationKey: "departments.it.location",
    memberCount: 35,
    members: [
      {
        id: "emp13",
        nameKey: "departments.it.members.director.name",
        roleKey: "departments.it.members.director.role",
        email: "kiran.raj@kmrl.com",
        phone: "+91 9876543222",
        avatar: "",
        isHead: true
      },
      {
        id: "emp14",
        nameKey: "departments.it.members.admin.name",
        roleKey: "departments.it.members.admin.role",
        email: "rohit.varma@kmrl.com",
        phone: "+91 9876543223",
        avatar: "",
        isHead: false
      },
      {
        id: "emp15",
        nameKey: "departments.it.members.developer.name",
        roleKey: "departments.it.members.developer.role",
        email: "sita.devi@kmrl.com",
        phone: "+91 9876543224",
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept6",
    nameKey: "departments.operations.name",
    descriptionKey: "departments.operations.description",
    headKey: "departments.operations.head",
    locationKey: "departments.operations.location",
    memberCount: 120,
    members: [
      {
        id: "emp16",
        nameKey: "departments.operations.members.director.name",
        roleKey: "departments.operations.members.director.role",
        email: "mohan.das@kmrl.com", 
        phone: "+91 9876543225",
        avatar: "",
        isHead: true
      },
      {
        id: "emp17",
        nameKey: "departments.operations.members.manager.name",
        roleKey: "departments.operations.members.manager.role",
        email: "geetha.nair@kmrl.com",
        phone: "+91 9876543226",
        avatar: "",
        isHead: false
      },
      {
        id: "emp18",
        nameKey: "departments.operations.members.station.name",
        roleKey: "departments.operations.members.station.role",
        email: "shankar.menon@kmrl.com",
        phone: "+91 9876543227",
        avatar: "",
        isHead: false
      }
    ]
  }
];

export const DepartmentsSection = ({}: DepartmentsSectionProps) => {
  const { t } = useTranslation();
  const [selectedDepartment, setSelectedDepartment] = useState<typeof departments[0] | null>(null);

  const getInitials = (nameKey: string) => {
    const name = t(nameKey);
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{t('departments.title')}</h2>
          <p className="text-muted-foreground">{t('departments.description')}</p>
        </div>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((department) => (
          <Card key={department.id} className="hover:shadow-sm transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium">{t(department.nameKey)}</h3>
                <Badge variant="secondary" className="text-xs">
                  {department.memberCount}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {t(department.descriptionKey)}
              </p>
              
              <div className="space-y-2 text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{t('departments.head')}: {t(department.headKey)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{t(department.locationKey)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{department.memberCount} {t('departments.members')}</span>
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full" onClick={() => setSelectedDepartment(department)}>
                    {t('departments.button.view')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      {t(department.nameKey)}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Department Info */}
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{t(department.descriptionKey)}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{t('departments.head')}: {t(department.headKey)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{t(department.locationKey)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{department.memberCount} {t('departments.total.members')}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Department Members */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">{t('departments.members.title')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {department.members.map((member) => (
                          <Card key={member.id} className={member.isHead ? "border-primary bg-primary/5" : ""}>
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>{getInitials(member.nameKey)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="font-medium text-sm">{t(member.nameKey)}</h4>
                                    {member.isHead && (
                                      <Badge variant="default" className="text-xs">{t('departments.badge.head')}</Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-2">{t(member.roleKey)}</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex items-center space-x-1">
                                      <Mail className="h-3 w-3 text-muted-foreground" />
                                      <span>{member.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Phone className="h-3 w-3 text-muted-foreground" />
                                      <span>{member.phone}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {department.members.length < department.memberCount && (
                          <Card className="border-dashed">
                            <CardContent className="p-4 text-center">
                              <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">
                                +{department.memberCount - department.members.length} {t('departments.more.members')}
                              </p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {departments.length}
            </div>
            <div className="text-sm text-muted-foreground">{t('departments.stats.departments')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {departments.reduce((sum, dept) => sum + dept.memberCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">{t('departments.stats.total.employees')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(departments.reduce((sum, dept) => sum + dept.memberCount, 0) / departments.length)}
            </div>
            <div className="text-sm text-muted-foreground">{t('departments.stats.average.size')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {departments.find(d => d.memberCount === Math.max(...departments.map(dept => dept.memberCount)))?.memberCount}
            </div>
            <div className="text-sm text-muted-foreground">{t('departments.stats.largest.dept')}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
