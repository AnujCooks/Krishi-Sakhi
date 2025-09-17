"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Leaf, Bug, AlertTriangle, Shield, Sprout, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample pest data - in a real app, this would come from a database
const pestData = [
  {
    id: 1,
    name: "Stem Borer",
    hindiName: "तना छेदक",
    crop: "Sugarcane",
    severity: "High",
    image: "/sugarcane-stem-borer-damage.jpg",
    symptoms: [
      "Dead heart formation in young plants",
      "Holes in stem with frass (insect waste)",
      "Yellowing and drying of central leaves",
      "Stunted plant growth",
    ],
    organicControl: [
      "Release Trichogramma parasitoids @ 50,000/ha",
      "Apply neem oil 3ml/liter water",
      "Use pheromone traps @ 5 traps/acre",
      "Encourage natural predators like spiders",
    ],
    chemicalControl: [
      "Chlorantraniliprole 18.5% SC @ 150ml/acre",
      "Cartap hydrochloride 4G @ 25kg/acre",
      "Fipronil 0.3% GR @ 25kg/acre",
    ],
    prevention: [
      "Use resistant varieties like Co 0238, Co 86032",
      "Avoid excessive nitrogen fertilization",
      "Maintain proper field sanitation",
      "Remove and destroy affected plant parts",
    ],
  },
  {
    id: 2,
    name: "Brown Plant Hopper",
    hindiName: "भूरा फुदका",
    crop: "Rice",
    severity: "High",
    image: "/rice-brown-plant-hopper-damage.jpg",
    symptoms: [
      "Yellowing and browning of leaves",
      "Hopper burn - circular patches of dried plants",
      "Stunted plant growth",
      "Reduced tillering",
    ],
    organicControl: [
      "Apply neem cake @ 250kg/ha",
      "Use yellow sticky traps",
      "Encourage natural enemies like spiders",
      "Apply neem oil 5ml/liter water",
    ],
    chemicalControl: [
      "Imidacloprid 17.8% SL @ 100ml/acre",
      "Thiamethoxam 25% WG @ 100g/acre",
      "Buprofezin 25% SC @ 400ml/acre",
    ],
    prevention: [
      "Use resistant varieties like Swarna-Sub1",
      "Avoid excessive nitrogen application",
      "Maintain proper water management",
      "Remove weeds from field borders",
    ],
  },
  {
    id: 3,
    name: "Bollworm",
    hindiName: "कपास का कीड़ा",
    crop: "Cotton",
    severity: "Medium",
    image: "/cotton-bollworm-damage.jpg",
    symptoms: [
      "Holes in cotton bolls",
      "Damaged squares and flowers",
      "Presence of caterpillars in bolls",
      "Reduced cotton quality",
    ],
    organicControl: [
      "Release Chrysoperla carnea @ 50,000/ha",
      "Apply Bt spray @ 2g/liter water",
      "Use pheromone traps",
      "Apply neem-based pesticides",
    ],
    chemicalControl: [
      "Emamectin benzoate 5% SG @ 200g/acre",
      "Spinosad 45% SC @ 160ml/acre",
      "Chlorantraniliprole 20% SC @ 60ml/acre",
    ],
    prevention: [
      "Grow Bt cotton varieties",
      "Maintain refuge crops",
      "Regular field monitoring",
      "Destroy crop residues after harvest",
    ],
  },
]

const crops = ["All Crops", "Sugarcane", "Rice", "Cotton", "Wheat", "Maize"]
const severityLevels = ["All", "High", "Medium", "Low"]

export default function PestDiseasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("All Crops")
  const [selectedSeverity, setSelectedSeverity] = useState("All")
  const [selectedPest, setSelectedPest] = useState<(typeof pestData)[0] | null>(null)

  const filteredPests = pestData.filter((pest) => {
    const matchesSearch =
      pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pest.hindiName.includes(searchTerm) ||
      pest.crop.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCrop = selectedCrop === "All Crops" || pest.crop === selectedCrop
    const matchesSeverity = selectedSeverity === "All" || pest.severity === selectedSeverity

    return matchesSearch && matchesCrop && matchesSeverity
  })

  if (selectedPest) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPest(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to List
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bug className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{selectedPest.name}</h1>
                  <p className="text-sm text-muted-foreground">{selectedPest.hindiName}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          {/* Pest Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Image
                    src={selectedPest.image || "/placeholder.svg"}
                    alt={`${selectedPest.name} damage`}
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Sprout className="w-3 h-3" />
                      {selectedPest.crop}
                    </Badge>
                    <Badge
                      variant={
                        selectedPest.severity === "High"
                          ? "destructive"
                          : selectedPest.severity === "Medium"
                            ? "default"
                            : "secondary"
                      }
                      className="flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {selectedPest.severity} Risk
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Eye className="w-5 h-5 text-primary" />
                    Key Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedPest.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Control Methods */}
          <Tabs defaultValue="organic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="organic" className="flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Organic Control
              </TabsTrigger>
              <TabsTrigger value="chemical" className="flex items-center gap-2">
                <Bug className="w-4 h-4" />
                Chemical Control
              </TabsTrigger>
              <TabsTrigger value="prevention" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Prevention
              </TabsTrigger>
            </TabsList>

            <TabsContent value="organic">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Organic & Natural Control Methods</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Environment-friendly solutions that are safe for beneficial insects and soil health.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPest.organicControl.map((method, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary">{index + 1}</span>
                        </div>
                        <p className="text-sm">{method}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chemical">
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Chemical Control Methods</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Use chemical pesticides only when necessary and follow label instructions carefully.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPest.chemicalControl.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/20"
                      >
                        <div className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-destructive">{index + 1}</span>
                        </div>
                        <p className="text-sm">{method}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>⚠️ Safety Warning:</strong> Always wear protective equipment, follow dosage instructions,
                      and observe pre-harvest intervals before applying chemicals.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prevention">
              <Card>
                <CardHeader>
                  <CardTitle className="text-accent">Prevention & Management</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Preventive measures to reduce pest occurrence and build long-term resistance.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPest.prevention.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg border border-accent/20"
                      >
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-accent">{index + 1}</span>
                        </div>
                        <p className="text-sm">{method}</p>
                      </div>
                    ))}
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
                  <Bug className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Pest & Disease Control</h1>
                  <p className="text-sm text-muted-foreground">कीट एवं रोग नियंत्रण</p>
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
                  placeholder="Search pests by name, crop, or symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {severityLevels.map((level) => (
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
            Showing {filteredPests.length} pest{filteredPests.length !== 1 ? "s" : ""}
            {selectedCrop !== "All Crops" && ` for ${selectedCrop}`}
            {selectedSeverity !== "All" && ` with ${selectedSeverity.toLowerCase()} severity`}
          </p>
        </div>

        {/* Pest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPests.map((pest) => (
            <Card
              key={pest.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedPest(pest)}
            >
              <CardContent className="p-0">
                <Image
                  src={pest.image || "/placeholder.svg"}
                  alt={`${pest.name} damage`}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {pest.name}
                    </h3>
                    <Badge
                      variant={
                        pest.severity === "High" ? "destructive" : pest.severity === "Medium" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {pest.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{pest.hindiName}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {pest.crop}
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-xs">
                      View Details →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPests.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Bug className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No pests found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find relevant pest information.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
