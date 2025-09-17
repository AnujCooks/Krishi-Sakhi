"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Bell,
  MapPin,
  Calendar,
  BarChart3,
  Target,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample market data
const currentPrices = [
  {
    crop: "Wheat",
    hindiName: "गेहूं",
    currentPrice: 2200,
    previousPrice: 2150,
    change: 50,
    changePercent: 2.3,
    unit: "quintal",
    mandi: "Muzaffarnagar",
    lastUpdated: "2 hours ago",
  },
  {
    crop: "Rice",
    hindiName: "धान",
    currentPrice: 3100,
    previousPrice: 3125,
    change: -25,
    changePercent: -0.8,
    unit: "quintal",
    mandi: "Muzaffarnagar",
    lastUpdated: "1 hour ago",
  },
  {
    crop: "Sugarcane",
    hindiName: "गन्ना",
    currentPrice: 350,
    previousPrice: 335,
    change: 15,
    changePercent: 4.5,
    unit: "quintal",
    mandi: "Muzaffarnagar",
    lastUpdated: "3 hours ago",
  },
  {
    crop: "Cotton",
    hindiName: "कपास",
    currentPrice: 6800,
    previousPrice: 6700,
    change: 100,
    changePercent: 1.5,
    unit: "quintal",
    mandi: "Muzaffarnagar",
    lastUpdated: "1 hour ago",
  },
  {
    crop: "Maize",
    hindiName: "मक्का",
    currentPrice: 1850,
    previousPrice: 1820,
    change: 30,
    changePercent: 1.6,
    unit: "quintal",
    mandi: "Muzaffarnagar",
    lastUpdated: "2 hours ago",
  },
  {
    crop: "Mustard",
    hindiName: "सरसों",
    currentPrice: 5200,
    previousPrice: 5150,
    change: 50,
    changePercent: 1.0,
    unit: "quintal",
    mandi: "Muzaffarnagar",
    lastUpdated: "4 hours ago",
  },
]

// Sample price trend data for charts
const wheatTrendData = [
  { date: "Dec 8", price: 2100 },
  { date: "Dec 9", price: 2120 },
  { date: "Dec 10", price: 2110 },
  { date: "Dec 11", price: 2150 },
  { date: "Dec 12", price: 2140 },
  { date: "Dec 13", price: 2180 },
  { date: "Dec 14", price: 2200 },
]

const riceTrendData = [
  { date: "Dec 8", price: 3200 },
  { date: "Dec 9", price: 3180 },
  { date: "Dec 10", price: 3150 },
  { date: "Dec 11", price: 3140 },
  { date: "Dec 12", price: 3120 },
  { date: "Dec 13", price: 3110 },
  { date: "Dec 14", price: 3100 },
]

const mandis = ["Muzaffarnagar", "Meerut", "Saharanpur", "Shamli", "Baghpat", "Ghaziabad"]

const priceAlerts = [
  {
    id: 1,
    crop: "Wheat",
    targetPrice: 2250,
    currentPrice: 2200,
    status: "active",
    createdDate: "Dec 10, 2024",
  },
  {
    id: 2,
    crop: "Cotton",
    targetPrice: 7000,
    currentPrice: 6800,
    status: "active",
    createdDate: "Dec 12, 2024",
  },
]

export default function MarketTrendsPage() {
  const [selectedMandi, setSelectedMandi] = useState("Muzaffarnagar")
  const [selectedCrop, setSelectedCrop] = useState("Wheat")
  const [targetPrice, setTargetPrice] = useState("")
  const [alertCrop, setAlertCrop] = useState("")

  const selectedTrendData = selectedCrop === "Wheat" ? wheatTrendData : riceTrendData

  const createPriceAlert = () => {
    if (!alertCrop || !targetPrice) return
    // In a real app, this would save to database
    alert(`Price alert created for ${alertCrop} at ₹${targetPrice}/quintal`)
    setAlertCrop("")
    setTargetPrice("")
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
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Market Trends</h1>
                  <p className="text-sm text-muted-foreground">बाजार के रुझान</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedMandi} onValueChange={setSelectedMandi}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mandis.map((mandi) => (
                    <SelectItem key={mandi} value={mandi}>
                      {mandi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="live-prices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live-prices" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Live Prices
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Price Trends
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Price Alerts
            </TabsTrigger>
          </TabsList>

          {/* Live Prices Tab */}
          <TabsContent value="live-prices">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Live Mandi Prices - {selectedMandi}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Agricultural Produce Market Committee</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Real-time prices from verified mandis. Prices are per quintal unless specified.
                  </p>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPrices.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.crop}</h3>
                          <p className="text-sm text-muted-foreground">{item.hindiName}</p>
                        </div>
                        <Badge
                          variant={item.change >= 0 ? "default" : "destructive"}
                          className={
                            item.change >= 0
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {item.change >= 0 ? (
                            <ArrowUp className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDown className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(item.changePercent)}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-3xl font-bold text-foreground">₹{item.currentPrice.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">per {item.unit}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Previous:</span>
                          <span>₹{item.previousPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Change:</span>
                          <span className={item.change >= 0 ? "text-green-600" : "text-red-600"}>
                            {item.change >= 0 ? "+" : ""}₹{item.change}
                          </span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>Updated {item.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Price Trends Tab */}
          <TabsContent value="trends">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Price Trends Analysis</CardTitle>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Wheat">Wheat</SelectItem>
                        <SelectItem value="Rice">Rice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    7-day price movement for {selectedCrop} in {selectedMandi} mandi
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`₹${value}`, "Price"]}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly High</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-600">₹2,200</p>
                    <p className="text-sm text-muted-foreground">Reached on Dec 14</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Low</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-red-600">₹2,100</p>
                    <p className="text-sm text-muted-foreground">Reached on Dec 8</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Average Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">₹2,143</p>
                    <p className="text-sm text-muted-foreground">7-day average</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Price Alerts Tab */}
          <TabsContent value="alerts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Create Price Alert
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Get notified when your crop reaches your target price</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="alertCrop">Select Crop</Label>
                    <Select value={alertCrop} onValueChange={setAlertCrop}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentPrices.map((crop) => (
                          <SelectItem key={crop.crop} value={crop.crop}>
                            {crop.crop} ({crop.hindiName})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetPrice">Target Price (₹ per quintal)</Label>
                    <Input
                      id="targetPrice"
                      type="number"
                      placeholder="Enter target price"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(e.target.value)}
                    />
                  </div>

                  <Button onClick={createPriceAlert} className="w-full" disabled={!alertCrop || !targetPrice}>
                    <Bell className="w-4 h-4 mr-2" />
                    Create Alert
                  </Button>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>How it works:</strong> You'll receive SMS and app notifications when the market price
                      reaches or exceeds your target price.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Active Price Alerts
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Your current price alerts and their status</p>
                </CardHeader>
                <CardContent>
                  {priceAlerts.length > 0 ? (
                    <div className="space-y-4">
                      {priceAlerts.map((alert) => (
                        <div key={alert.id} className="p-4 bg-muted/50 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{alert.crop}</h4>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Active
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Target Price:</span>
                              <span className="font-medium">₹{alert.targetPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Current Price:</span>
                              <span>₹{alert.currentPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Created:</span>
                              <span>{alert.createdDate}</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                Edit Alert
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 text-red-600 bg-transparent">
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Active Alerts</h3>
                      <p className="text-muted-foreground">Create your first price alert to get notified.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
