"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  AlertTriangle,
  Calendar,
  Clock,
  Sprout,
} from "lucide-react"
import Link from "next/link"

// Sample weather data - in a real app, this would come from a weather API
const currentWeather = {
  location: "Muzaffarnagar, UP",
  temperature: 34,
  condition: "Clear",
  humidity: 65,
  windSpeed: 12,
  visibility: 10,
  pressure: 1013,
  uvIndex: 8,
  feelsLike: 38,
}

const weeklyForecast = [
  {
    day: "Today",
    date: "Dec 15",
    high: 34,
    low: 18,
    condition: "Clear",
    icon: Sun,
    rainfall: 0,
    humidity: 65,
    windSpeed: 12,
  },
  {
    day: "Tomorrow",
    date: "Dec 16",
    high: 32,
    low: 16,
    condition: "Partly Cloudy",
    icon: Cloud,
    rainfall: 0,
    humidity: 70,
    windSpeed: 15,
  },
  {
    day: "Sunday",
    date: "Dec 17",
    high: 28,
    low: 14,
    condition: "Thunderstorm",
    icon: CloudRain,
    rainfall: 85,
    humidity: 85,
    windSpeed: 25,
  },
  {
    day: "Monday",
    date: "Dec 18",
    high: 25,
    low: 12,
    condition: "Heavy Rain",
    icon: CloudRain,
    rainfall: 95,
    humidity: 90,
    windSpeed: 30,
  },
  {
    day: "Tuesday",
    date: "Dec 19",
    high: 22,
    low: 10,
    condition: "Light Rain",
    icon: CloudRain,
    rainfall: 40,
    humidity: 80,
    windSpeed: 18,
  },
  {
    day: "Wednesday",
    date: "Dec 20",
    high: 26,
    low: 13,
    condition: "Cloudy",
    icon: Cloud,
    rainfall: 10,
    humidity: 75,
    windSpeed: 16,
  },
  {
    day: "Thursday",
    date: "Dec 21",
    high: 29,
    low: 15,
    condition: "Sunny",
    icon: Sun,
    rainfall: 0,
    humidity: 60,
    windSpeed: 14,
  },
]

const hourlyForecast = [
  { time: "6 AM", temp: 18, condition: "Clear", icon: Sun, rainfall: 0 },
  { time: "9 AM", temp: 24, condition: "Clear", icon: Sun, rainfall: 0 },
  { time: "12 PM", temp: 32, condition: "Sunny", icon: Sun, rainfall: 0 },
  { time: "3 PM", temp: 34, condition: "Sunny", icon: Sun, rainfall: 0 },
  { time: "6 PM", temp: 28, condition: "Clear", icon: Sun, rainfall: 0 },
  { time: "9 PM", temp: 22, condition: "Clear", icon: Cloud, rainfall: 0 },
]

const weatherAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Hailstorm Warning",
    description: "Severe hailstorm expected tomorrow evening. Protect crops and livestock.",
    severity: "High",
    validUntil: "Dec 17, 8 PM",
  },
  {
    id: 2,
    type: "advisory",
    title: "Heavy Rainfall Advisory",
    description: "Heavy rainfall expected for 3 days. Ensure proper drainage in fields.",
    severity: "Medium",
    validUntil: "Dec 20, 6 AM",
  },
]

const farmingAdvice = [
  {
    activity: "Irrigation",
    recommendation: "Reduce irrigation for next 3 days due to expected rainfall",
    icon: Droplets,
  },
  {
    activity: "Harvesting",
    recommendation: "Complete harvesting before Sunday to avoid crop damage",
    icon: Calendar,
  },
  {
    activity: "Spraying",
    recommendation: "Avoid pesticide application during rainy period",
    icon: Wind,
  },
]

export default function WeatherPage() {
  const [selectedView, setSelectedView] = useState<"daily" | "weekly">("weekly")

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
                  <Cloud className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Weather Forecast</h1>
                  <p className="text-sm text-muted-foreground">मौसम पूर्वानुमान</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Change Location
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Weather Alerts */}
        {weatherAlerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {weatherAlerts.map((alert) => (
              <Alert
                key={alert.id}
                className={
                  alert.severity === "High"
                    ? "border-destructive/50 bg-destructive/5"
                    : "border-amber-500/50 bg-amber-50"
                }
              >
                <AlertTriangle
                  className={`h-4 w-4 ${alert.severity === "High" ? "text-destructive" : "text-amber-600"}`}
                />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{alert.title}</p>
                      <p className="text-sm">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Valid until: {alert.validUntil}</p>
                    </div>
                    <Badge variant={alert.severity === "High" ? "destructive" : "default"}>{alert.severity}</Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Current Weather */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg">{currentWeather.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Last updated: 2:30 PM
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Sun className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
                <p className="text-4xl font-bold text-foreground">{currentWeather.temperature}°C</p>
                <p className="text-muted-foreground">{currentWeather.condition}</p>
                <p className="text-sm text-muted-foreground">Feels like {currentWeather.feelsLike}°C</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="font-semibold">{currentWeather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Wind Speed</p>
                    <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Visibility</p>
                    <p className="font-semibold">{currentWeather.visibility} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pressure</p>
                    <p className="font-semibold">{currentWeather.pressure} hPa</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">UV Index</p>
                    <p className="font-semibold">{currentWeather.uvIndex} (Very High)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forecast Tabs */}
        <Tabs defaultValue="weekly" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hourly">Today's Hourly</TabsTrigger>
            <TabsTrigger value="weekly">7-Day Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Forecast - Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {hourlyForecast.map((hour, index) => (
                    <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">{hour.time}</p>
                      <hour.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-semibold text-lg">{hour.temp}°</p>
                      <p className="text-xs text-muted-foreground">{hour.condition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>7-Day Weather Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyForecast.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 text-left">
                          <p className="font-semibold">{day.day}</p>
                          <p className="text-sm text-muted-foreground">{day.date}</p>
                        </div>
                        <day.icon className="w-8 h-8 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">{day.condition}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Droplets className="w-3 h-3" />
                              {day.rainfall}%
                            </span>
                            <span className="flex items-center gap-1">
                              <Wind className="w-3 h-3" />
                              {day.windSpeed} km/h
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{day.high}°</span>
                          <span className="text-muted-foreground">{day.low}°</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Farming Advice */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              Weather-Based Farming Advice
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Recommendations based on current weather conditions and forecast
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {farmingAdvice.map((advice, index) => (
                <div key={index} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <advice.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{advice.activity}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{advice.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
