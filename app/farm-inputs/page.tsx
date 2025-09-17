"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Sprout, Calculator, MapPin, Phone, Star, Truck, Calendar, Beaker, ShoppingCart } from "lucide-react"
import Link from "next/link"

// Sample seed data
const seedVarieties = [
  {
    id: 1,
    name: "HD-3086 (Wheat)",
    hindiName: "एचडी-3086 गेहूं",
    crop: "Wheat",
    type: "High Yield",
    duration: "120-125 days",
    yield: "45-50 quintals/hectare",
    sowingTime: "November - December",
    features: ["Disease resistant", "Drought tolerant", "High protein content"],
    price: "₹45/kg",
    availability: "Available",
  },
  {
    id: 2,
    name: "Pusa Basmati 1121",
    hindiName: "पूसा बासमती 1121",
    crop: "Rice",
    type: "Premium Quality",
    duration: "140-145 days",
    yield: "35-40 quintals/hectare",
    sowingTime: "June - July",
    features: ["Long grain", "Aromatic", "Export quality"],
    price: "₹120/kg",
    availability: "Available",
  },
  {
    id: 3,
    name: "Co 0238 (Sugarcane)",
    hindiName: "को 0238 गन्ना",
    crop: "Sugarcane",
    type: "High Sugar Content",
    duration: "12-14 months",
    yield: "800-900 quintals/hectare",
    sowingTime: "February - March",
    features: ["High sugar recovery", "Disease resistant", "Good ratoon"],
    price: "₹8/bud",
    availability: "Limited",
  },
]

// Sample supplier data
const suppliers = [
  {
    id: 1,
    name: "Krishi Seva Kendra",
    hindiName: "कृषि सेवा केंद्र",
    type: "Government",
    location: "Muzaffarnagar",
    distance: "2.5 km",
    phone: "+91-9876543210",
    rating: 4.5,
    products: ["Seeds", "Fertilizers", "Pesticides"],
    verified: true,
  },
  {
    id: 2,
    name: "Bharat Agro Center",
    hindiName: "भारत एग्रो सेंटर",
    type: "Private",
    location: "Civil Lines, Muzaffarnagar",
    distance: "3.8 km",
    phone: "+91-9876543211",
    rating: 4.2,
    products: ["Seeds", "Fertilizers", "Equipment"],
    verified: true,
  },
  {
    id: 3,
    name: "Kisan Mitra Store",
    hindiName: "किसान मित्र स्टोर",
    type: "Private",
    location: "Sadar Bazaar, Muzaffarnagar",
    distance: "5.2 km",
    phone: "+91-9876543212",
    rating: 4.0,
    products: ["Seeds", "Organic Fertilizers"],
    verified: false,
  },
]

export default function FarmInputsPage() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [landSize, setLandSize] = useState("")
  const [soilType, setSoilType] = useState("")
  const [fertilizerResult, setFertilizerResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("seeds")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get("tab")
    if (tab === "calculator") {
      setActiveTab("calculator")
    }
  }, [])

  const calculateFertilizer = () => {
    if (!selectedCrop || !landSize || !soilType) return

    // Sample calculation logic - in real app, this would be more sophisticated
    const baseNPK = {
      Wheat: { N: 120, P: 60, K: 40 },
      Rice: { N: 100, P: 50, K: 50 },
      Sugarcane: { N: 200, P: 80, K: 120 },
      Cotton: { N: 150, P: 75, K: 75 },
    }

    const cropNPK = baseNPK[selectedCrop as keyof typeof baseNPK] || { N: 100, P: 50, K: 50 }
    const area = Number.parseFloat(landSize)

    const result = {
      nitrogen: Math.round((cropNPK.N * area) / 2.47), // Convert hectare to acre
      phosphorus: Math.round((cropNPK.P * area) / 2.47),
      potassium: Math.round((cropNPK.K * area) / 2.47),
      urea: Math.round((cropNPK.N * area * 2.17) / 2.47), // Urea contains ~46% N
      dap: Math.round((cropNPK.P * area * 2.17) / 2.47), // DAP contains ~46% P2O5
      mop: Math.round((cropNPK.K * area * 1.67) / 2.47), // MOP contains ~60% K2O
    }

    setFertilizerResult(result)
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
                  <Sprout className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Farm Inputs</h1>
                  <p className="text-sm text-muted-foreground">कृषि इनपुट</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="seeds" className="flex items-center gap-2">
              <Sprout className="w-4 h-4" />
              Seeds & Varieties
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Fertilizer Calculator
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Local Suppliers
            </TabsTrigger>
          </TabsList>

          {/* Seeds & Varieties Tab */}
          <TabsContent value="seeds">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Seed Varieties</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    High-yield and disease-resistant varieties suitable for your region
                  </p>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seedVarieties.map((seed) => (
                  <Card key={seed.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{seed.crop}</Badge>
                        <Badge
                          variant={seed.availability === "Available" ? "default" : "secondary"}
                          className={seed.availability === "Available" ? "bg-green-100 text-green-800" : ""}
                        >
                          {seed.availability}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{seed.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{seed.hindiName}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{seed.duration}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expected Yield</p>
                          <p className="font-medium">{seed.yield}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-muted-foreground text-sm mb-2">Sowing Time</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{seed.sowingTime}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-muted-foreground text-sm mb-2">Key Features</p>
                        <div className="flex flex-wrap gap-1">
                          {seed.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-lg font-bold text-primary">{seed.price}</p>
                          <p className="text-xs text-muted-foreground">per kg</p>
                        </div>
                        <Button size="sm" className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Find Suppliers
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Fertilizer Calculator Tab */}
          <TabsContent value="calculator">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    Fertilizer Calculator
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Calculate optimal NPK requirements for your crop and land size
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="crop">Select Crop</Label>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Wheat">Wheat (गेहूं)</SelectItem>
                        <SelectItem value="Rice">Rice (धान)</SelectItem>
                        <SelectItem value="Sugarcane">Sugarcane (गन्ना)</SelectItem>
                        <SelectItem value="Cotton">Cotton (कपास)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="landSize">Land Size (in acres)</Label>
                    <Input
                      id="landSize"
                      type="number"
                      placeholder="Enter land size"
                      value={landSize}
                      onChange={(e) => setLandSize(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay Soil (चिकनी मिट्टी)</SelectItem>
                        <SelectItem value="loamy">Loamy Soil (दोमट मिट्टी)</SelectItem>
                        <SelectItem value="sandy">Sandy Soil (बलुई मिट्टी)</SelectItem>
                        <SelectItem value="black">Black Soil (काली मिट्टी)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={calculateFertilizer}
                    className="w-full"
                    disabled={!selectedCrop || !landSize || !soilType}
                  >
                    Calculate Fertilizer Requirements
                  </Button>
                </CardContent>
              </Card>

              {fertilizerResult && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-primary" />
                      Fertilizer Recommendations
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      For {landSize} acres of {selectedCrop} on {soilType} soil
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{fertilizerResult.nitrogen}</p>
                        <p className="text-sm text-muted-foreground">kg Nitrogen (N)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{fertilizerResult.phosphorus}</p>
                        <p className="text-sm text-muted-foreground">kg Phosphorus (P)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{fertilizerResult.potassium}</p>
                        <p className="text-sm text-muted-foreground">kg Potassium (K)</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Recommended Fertilizers:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Urea (46% N)</span>
                          <span className="font-bold">{fertilizerResult.urea} kg</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">DAP (46% P₂O₅)</span>
                          <span className="font-bold">{fertilizerResult.dap} kg</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium">MOP (60% K₂O)</span>
                          <span className="font-bold">{fertilizerResult.mop} kg</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">
                        <strong>Note:</strong> These are general recommendations. Consider soil testing for precise
                        requirements and consult local agricultural experts.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Local Suppliers Tab */}
          <TabsContent value="suppliers">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verified Suppliers Near You</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Government and private suppliers for seeds, fertilizers, and farming equipment
                  </p>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suppliers.map((supplier) => (
                  <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={supplier.type === "Government" ? "default" : "secondary"}>
                            {supplier.type}
                          </Badge>
                          {supplier.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{supplier.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{supplier.hindiName}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{supplier.location}</span>
                        <Badge variant="outline" className="ml-auto">
                          {supplier.distance}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{supplier.phone}</span>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Available Products:</p>
                        <div className="flex flex-wrap gap-1">
                          {supplier.products.map((product, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" className="flex-1">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Truck className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
