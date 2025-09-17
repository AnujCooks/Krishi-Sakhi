"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  FileText,
  Search,
  ExternalLink,
  CheckCircle,
  Users,
  IndianRupee,
  Calendar,
  AlertCircle,
  Download,
} from "lucide-react"
import Link from "next/link"

// Sample subsidy schemes data
const subsidySchemes = [
  {
    id: 1,
    name: "PM-KISAN",
    hindiName: "प्रधानमंत्री किसान सम्मान निधि",
    category: "Income Support",
    level: "Central",
    amount: "₹6,000 per year",
    description: "Direct income support to small and marginal farmers",
    benefits: [
      "₹2,000 every 4 months directly to bank account",
      "No application fee required",
      "Covers all small and marginal farmers",
    ],
    eligibility: [
      "Small and marginal farmers with cultivable land up to 2 hectares",
      "Name should be in land records",
      "Valid Aadhaar card required",
      "Bank account linked with Aadhaar",
    ],
    documents: ["Aadhaar Card", "Bank Account Details", "Land Records (Khatauni/Khesra)", "Passport Size Photo"],
    applicationSteps: [
      "Visit PM-KISAN official website",
      "Click on 'Farmer Registration'",
      "Fill personal and land details",
      "Upload required documents",
      "Submit application and note registration number",
    ],
    officialLink: "https://pmkisan.gov.in",
    status: "Active",
    deadline: "No deadline - Ongoing",
  },
  {
    id: 2,
    name: "PM Fasal Bima Yojana",
    hindiName: "प्रधानमंत्री फसल बीमा योजना",
    category: "Crop Insurance",
    level: "Central",
    amount: "Up to ₹2 lakh coverage",
    description: "Comprehensive crop insurance scheme for farmers",
    benefits: [
      "Premium subsidy up to 90% by government",
      "Coverage for pre-sowing to post-harvest losses",
      "Quick settlement of claims",
      "Use of technology for yield estimation",
    ],
    eligibility: [
      "All farmers (sharecroppers and tenant farmers included)",
      "Farmers growing notified crops in notified areas",
      "Both loanee and non-loanee farmers eligible",
    ],
    documents: [
      "Aadhaar Card",
      "Bank Account Details",
      "Land Records",
      "Sowing Certificate (for non-loanee farmers)",
      "Loan Sanction Letter (for loanee farmers)",
    ],
    applicationSteps: [
      "Visit nearest bank or insurance company",
      "Fill crop insurance application form",
      "Submit required documents",
      "Pay farmer's share of premium",
      "Receive policy document",
    ],
    officialLink: "https://pmfby.gov.in",
    status: "Active",
    deadline: "Before sowing season",
  },
  {
    id: 3,
    name: "Kisan Credit Card",
    hindiName: "किसान क्रेडिट कार्ड",
    category: "Credit Support",
    level: "Central",
    amount: "Up to ₹3 lakh at 4% interest",
    description: "Easy credit access for farmers at subsidized interest rates",
    benefits: [
      "Interest subvention up to 3%",
      "No collateral required up to ₹1.6 lakh",
      "Flexible repayment based on harvesting cycle",
      "Coverage for crop production and maintenance",
    ],
    eligibility: [
      "All farmers (individual/joint borrowers)",
      "Tenant farmers and sharecroppers",
      "Self Help Group members",
      "Age between 18-75 years",
    ],
    documents: [
      "KCC Application Form",
      "Identity Proof (Aadhaar/Voter ID)",
      "Address Proof",
      "Land Records",
      "Income Certificate",
    ],
    applicationSteps: [
      "Visit nearest bank branch",
      "Fill KCC application form",
      "Submit required documents",
      "Bank verification and processing",
      "KCC issuance after approval",
    ],
    officialLink: "https://www.nabard.org/kcc",
    status: "Active",
    deadline: "No deadline - Ongoing",
  },
  {
    id: 4,
    name: "Soil Health Card Scheme",
    hindiName: "मृदा स्वास्थ्य कार्ड योजना",
    category: "Soil Testing",
    level: "Central",
    amount: "Free soil testing",
    description: "Free soil testing and nutrient management recommendations",
    benefits: [
      "Free soil testing every 2 years",
      "Customized fertilizer recommendations",
      "Improved soil health and productivity",
      "Reduced input costs",
    ],
    eligibility: [
      "All farmers with agricultural land",
      "No land size restriction",
      "Both individual and group applications accepted",
    ],
    documents: ["Land Records", "Aadhaar Card", "Application Form"],
    applicationSteps: [
      "Contact local agriculture department",
      "Fill soil health card application",
      "Provide land details and soil samples",
      "Wait for laboratory analysis",
      "Receive soil health card with recommendations",
    ],
    officialLink: "https://soilhealth.dac.gov.in",
    status: "Active",
    deadline: "No deadline - Ongoing",
  },
]

const categories = [
  "All Categories",
  "Income Support",
  "Crop Insurance",
  "Credit Support",
  "Soil Testing",
  "Equipment Subsidy",
]
const levels = ["All Levels", "Central", "State", "District"]

export default function SubsidiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedScheme, setSelectedScheme] = useState<(typeof subsidySchemes)[0] | null>(null)

  const filteredSchemes = subsidySchemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.hindiName.includes(searchTerm) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || scheme.category === selectedCategory
    const matchesLevel = selectedLevel === "All Levels" || scheme.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  if (selectedScheme) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedScheme(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Schemes
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{selectedScheme.name}</h1>
                  <p className="text-sm text-muted-foreground">{selectedScheme.hindiName}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          {/* Scheme Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedScheme.category}</Badge>
                      <Badge variant={selectedScheme.level === "Central" ? "default" : "secondary"}>
                        {selectedScheme.level}
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {selectedScheme.status}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{selectedScheme.name}</CardTitle>
                  <p className="text-muted-foreground mb-4">{selectedScheme.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-600">{selectedScheme.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="text-sm">{selectedScheme.deadline}</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" asChild>
                    <a href={selectedScheme.officialLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Online
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Form
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Check Status
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="benefits" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="application">How to Apply</TabsTrigger>
            </TabsList>

            <TabsContent value="benefits">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Scheme Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedScheme.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eligibility">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedScheme.eligibility.map((criteria, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-white">{index + 1}</span>
                        </div>
                        <p className="text-sm">{criteria}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedScheme.documents.map((document, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200"
                      >
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium">{document}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        <strong>Important:</strong> Ensure all documents are self-attested and carry original documents
                        for verification.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="application">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-primary" />
                    Application Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedScheme.applicationSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary-foreground">{index + 1}</span>
                        </div>
                        <p className="text-sm pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Ready to apply?</p>
                        <p className="text-sm text-muted-foreground">
                          Visit the official website to start your application
                        </p>
                      </div>
                      <Button asChild>
                        <a href={selectedScheme.officialLink} target="_blank" rel="noopener noreferrer">
                          Apply Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Government Subsidies</h1>
                  <p className="text-sm text-muted-foreground">सरकारी सब्सिडी</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search schemes by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredSchemes.length} scheme{filteredSchemes.length !== 1 ? "s" : ""}
            {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
            {selectedLevel !== "All Levels" && ` at ${selectedLevel} level`}
          </p>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card
              key={scheme.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedScheme(scheme)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{scheme.category}</Badge>
                    <Badge variant={scheme.level === "Central" ? "default" : "secondary"}>{scheme.level}</Badge>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {scheme.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{scheme.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{scheme.hindiName}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{scheme.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">{scheme.amount}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs">
                    View Details →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No schemes found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find relevant government schemes.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
