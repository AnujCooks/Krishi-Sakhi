"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Leaf,
  Cloud,
  Sprout,
  FileText,
  TrendingUp,
  MapPin,
  Bell,
  ArrowUp,
  ArrowDown,
  Thermometer,
  Droplets,
  AlertTriangle,
  X,
  Calculator,
  Calendar,
  Wheat,
} from "lucide-react"
import Link from "next/link"

const translations = {
  en: {
    title: "Krishi Sakhi",
    subtitle: "Farmer's Friend",
    alerts: "Alerts",
    viewForecast: "View Forecast",
    criticalAlerts: "Critical Alerts",
    marketSnapshot: "Market Snapshot - Today's Prices",
    pestControl: "Pest & Disease Control",
    pestControlHindi: "कीट एवं रोग नियंत्रण",
    weatherForecast: "Weather Forecast",
    weatherForecastHindi: "मौसम पूर्वानुमान",
    farmInputs: "Farm Inputs",
    farmInputsHindi: "कृषि इनपुट",
    govSubsidies: "Government Subsidies",
    govSubsidiesHindi: "सरकारी सब्सिडी",
    marketTrends: "Market Trends",
    marketTrendsHindi: "बाजार के रुझान",
    quickTools: "Quick Tools",
    quickToolsHindi: "त्वरित उपकरण",
    fertilizerCalc: "Fertilizer Calculator",
    cropAdvisory: "Crop Advisory",
    harvestPlanner: "Harvest Planner",
  },
  hi: {
    title: "कृषि सखी",
    subtitle: "किसान का मित्र",
    alerts: "अलर्ट",
    viewForecast: "पूर्वानुमान देखें",
    criticalAlerts: "महत्वपूर्ण अलर्ट",
    marketSnapshot: "बाजार स्नैपशॉट - आज की कीमतें",
    pestControl: "कीट एवं रोग नियंत्रण",
    pestControlHindi: "Pest & Disease Control",
    weatherForecast: "मौसम पूर्वानुमान",
    weatherForecastHindi: "Weather Forecast",
    farmInputs: "कृषि इनपुट",
    farmInputsHindi: "Farm Inputs",
    govSubsidies: "सरकारी सब्सिडी",
    govSubsidiesHindi: "Government Subsidies",
    marketTrends: "बाजार के रुझान",
    marketTrendsHindi: "Market Trends",
    quickTools: "त्वरित उपकरण",
    quickToolsHindi: "Quick Tools",
    fertilizerCalc: "उर्वरक कैलकुलेटर",
    cropAdvisory: "फसल सलाह",
    harvestPlanner: "फसल योजनाकार",
  },
  ml: {
    title: "കൃഷി സഖി",
    subtitle: "കർഷകന്റെ സുഹൃത്ത്",
    alerts: "അലേർട്ടുകൾ",
    viewForecast: "പ്രവചനം കാണുക",
    criticalAlerts: "പ്രധാന അലേർട്ടുകൾ",
    marketSnapshot: "മാർക്കറ്റ് സ്നാപ്പ്ഷോട്ട് - ഇന്നത്തെ വിലകൾ",
    pestControl: "കീടനാശിനി നിയന്ത്രണം",
    pestControlHindi: "कीट नियंत्रण",
    weatherForecast: "കാലാവസ്ഥാ പ്രവചനം",
    weatherForecastHindi: "കാലാവസ്ഥ",
    farmInputs: "കാർഷിക ഇൻപുട്ടുകൾ",
    farmInputsHindi: "കൃഷി സാമഗ്രികൾ",
    govSubsidies: "സർക്കാർ സബ്സിഡികൾ",
    govSubsidiesHindi: "സർക്കാർ പദ്ധതികൾ",
    marketTrends: "മാർക്കറ്റ് ട്രെൻഡുകൾ",
    marketTrendsHindi: "വിപണി പ്രവണതകൾ",
    quickTools: "ദ്രുത ഉപകരണങ്ങൾ",
    quickToolsHindi: "ഉപകരണങ്ങൾ",
    fertilizerCalc: "വളം കാൽക്കുലേറ്റർ",
    cropAdvisory: "വിള ഉപദേശം",
    harvestPlanner: "വിളവെടുപ്പ് പ്ലാനർ",
  },
}

const alertsData = [
  {
    id: 1,
    type: "weather",
    severity: "high",
    title: "Hailstorm Warning",
    titleHi: "ओलावृष्टि चेतावनी",
    titleMl: "കന്മഴ മുന്നറിയിപ്പ്",
    message: "Hailstorm warning issued for tomorrow",
    messageHi: "कल के लिए ओलावृष्टि की चेतावनी जारी",
    messageMl: "നാളെയ്ക്കുള്ള കന്മഴ മുന്നറിയിപ്പ്",
    urgent: true,
    timestamp: new Date(),
  },
  {
    id: 2,
    type: "subsidy",
    severity: "medium",
    title: "New Wheat Subsidy Scheme",
    titleHi: "नई गेहूं सब्सिडी योजना",
    titleMl: "പുതിയ ഗോതമ്പ് സബ്സിഡി പദ്ധതി",
    message: "New wheat subsidy scheme announced",
    messageHi: "नई गेहूं सब्सिडी योजना की घोषणा",
    messageMl: "പുതിയ ഗോതമ്പ് സബ്സിഡി പദ്ധതി പ്രഖ്യാപിച്ചു",
    urgent: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 3,
    type: "market",
    severity: "low",
    title: "Rice Prices Rising",
    titleHi: "चावल की कीमतें बढ़ रही हैं",
    titleMl: "അരി വില വർധിക്കുന്നു",
    message: "Rice prices increased by 5% this week",
    messageHi: "इस सप्ताह चावल की कीमतें 5% बढ़ीं",
    messageMl: "ഈ ആഴ്ച അരി വില 5% വർധിച്ചു",
    urgent: false,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
]

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "hi" | "ml">("en")
  const [showAlerts, setShowAlerts] = useState(false)
  const [alerts, setAlerts] = useState(alertsData)
  const [showQuickTools, setShowQuickTools] = useState(false)

  const t = translations[language]

  const dismissAlert = (alertId: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId))
  }

  const getAlertText = (alert: any, field: "title" | "message") => {
    if (language === "hi") return alert[`${field}Hi`]
    if (language === "ml") return alert[`${field}Ml`]
    return alert[field]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{t.title}</h1>
                <p className="text-sm text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={language === "en" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage("en")}
                  className="text-xs px-2 py-1"
                >
                  EN
                </Button>
                <Button
                  variant={language === "hi" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage("hi")}
                  className="text-xs px-2 py-1"
                >
                  हिं
                </Button>
                <Button
                  variant={language === "ml" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage("ml")}
                  className="text-xs px-2 py-1"
                >
                  മല
                </Button>
              </div>

              <Dialog open={showAlerts} onOpenChange={setShowAlerts}>
                <DialogTrigger asChild>
                  <Button size="sm" className="relative">
                    <Bell className="w-4 h-4 mr-2" />
                    {t.alerts}
                    {alerts.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
                        {alerts.length}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t.criticalAlerts}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {alerts.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        {language === "hi" ? "कोई अलर्ट नहीं" : language === "ml" ? "അലേർട്ടുകൾ ഇല്ല" : "No alerts"}
                      </p>
                    ) : (
                      alerts.map((alert) => (
                        <Alert
                          key={alert.id}
                          className={
                            alert.severity === "high"
                              ? "border-destructive/50 bg-destructive/5"
                              : alert.severity === "medium"
                                ? "border-amber-500/50 bg-amber-50"
                                : "border-blue-500/50 bg-blue-50"
                          }
                        >
                          <AlertTriangle
                            className={`h-4 w-4 ${
                              alert.severity === "high"
                                ? "text-destructive"
                                : alert.severity === "medium"
                                  ? "text-amber-600"
                                  : "text-blue-600"
                            }`}
                          />
                          <AlertDescription>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold">{getAlertText(alert, "title")}</p>
                                <p className="text-sm">{getAlertText(alert, "message")}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {alert.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {alert.urgent && (
                                  <Badge variant="destructive">
                                    {language === "hi" ? "तत्काल" : language === "ml" ? "അടിയന്തിരം" : "Urgent"}
                                  </Badge>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => dismissAlert(alert.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Location & Weather Banner */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Muzaffarnagar, UP</span>
                </div>
                <div className="flex items-center gap-4 text-foreground">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    <span className="text-2xl font-bold">34°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span>65% Humidity</span>
                  </div>
                  <span className="text-muted-foreground">Clear Skies</span>
                </div>
              </div>
              <Link href="/weather">
                <Button variant="outline" size="sm">
                  {t.viewForecast}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card className="mb-6 border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-destructive flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {t.criticalAlerts}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.slice(0, 2).map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-destructive/20"
              >
                <span className="text-sm">⚠️ {getAlertText(alert, "message")}</span>
                <Badge variant={alert.urgent ? "destructive" : "secondary"}>
                  {alert.urgent
                    ? language === "hi"
                      ? "तत्काल"
                      : language === "ml"
                        ? "അടിയന്തിരം"
                        : "Urgent"
                    : language === "hi"
                      ? "नया"
                      : language === "ml"
                        ? "പുതിയത്"
                        : "New"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Snapshot */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {t.marketSnapshot}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Wheat</p>
                <p className="text-lg font-bold text-foreground">₹2,200</p>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <ArrowUp className="w-3 h-3" />
                  <span className="text-xs">+50</span>
                </div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Rice</p>
                <p className="text-lg font-bold text-foreground">₹3,100</p>
                <div className="flex items-center justify-center gap-1 text-red-600">
                  <ArrowDown className="w-3 h-3" />
                  <span className="text-xs">-25</span>
                </div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Sugarcane</p>
                <p className="text-lg font-bold text-foreground">₹350</p>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <ArrowUp className="w-3 h-3" />
                  <span className="text-xs">+15</span>
                </div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Cotton</p>
                <p className="text-lg font-bold text-foreground">₹6,800</p>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <ArrowUp className="w-3 h-3" />
                  <span className="text-xs">+100</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pest & Disease Control */}
          <Link href="/pest-disease">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t.pestControl}</CardTitle>
                <p className="text-sm text-muted-foreground">{t.pestControlHindi}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "hi"
                    ? "फसल की कीट एवं रोगों को पहचानें और सुरक्षित करें"
                    : language === "ml"
                      ? "വിളയ്ക്കുള്ള കീടുകളും രോഗുകളും പിജ്ജുക്കുക"
                      : "Identify and manage crop pests and diseases with detailed solutions and prevention tips."}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">500+ Pests</Badge>
                  <Badge variant="secondary">Organic Solutions</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Weather Forecast */}
          <Link href="/weather">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t.weatherForecast}</CardTitle>
                <p className="text-sm text-muted-foreground">{t.weatherForecastHindi}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "hi"
                    ? "सटीक मौसम अनुमान और चेतावनियाँ प्राप्त करें"
                    : language === "ml"
                      ? "സാധാരണമായ കാലാവസ്ഥാ പ്രവചനം പെടുക്കുക"
                      : "Get accurate weather predictions and alerts for better farm planning and crop protection."}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">7-Day Forecast</Badge>
                  <Badge variant="secondary">Alerts</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Farm Inputs */}
          <Link href="/farm-inputs">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Sprout className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t.farmInputs}</CardTitle>
                <p className="text-sm text-muted-foreground">{t.farmInputsHindi}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "hi"
                    ? "सर्वश्रेष्ठ बीज, उर्वरक और कृषि योजना उपकरण पाएं"
                    : language === "ml"
                      ? "സരഭാഗ്യകരമായ ബീജങ്ങൾ, ഉരുവരകൾ ഏകും കാർഷിക യോജനാ ഉപകരണങ്ങൾ കിട്ടുക"
                      : "Find the best seeds, fertilizers, and farming equipment with expert recommendations."}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Seed Varieties</Badge>
                  <Badge variant="secondary">Calculator</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Government Subsidies */}
          <Link href="/subsidies">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t.govSubsidies}</CardTitle>
                <p className="text-sm text-muted-foreground">{t.govSubsidiesHindi}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "hi"
                    ? "सरकारी योजनाओं, सब्सिडी और आवेदन निर्देशक प्राप्त करें"
                    : language === "ml"
                      ? "സർക്കാർ പദ്ധതികൾ, സബ്സിഡികൾ ഏകും ആവേശനി നിർദ്ദേശങ്ങൾ പെടുക്കുക"
                      : "Access information about government schemes, subsidies, and step-by-step application guides."}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">50+ Schemes</Badge>
                  <Badge variant="secondary">Easy Apply</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Market Trends */}
          <Link href="/market-trends">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t.marketTrends}</CardTitle>
                <p className="text-sm text-muted-foreground">{t.marketTrendsHindi}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "hi"
                    ? "आज की बाजार की कीमतें एवं रुझान अनुदर्शन करें"
                    : language === "ml"
                      ? "ഇന്നത്തെ വിപണി വിലകൾ ഏകും രുജ്ജാനം കാണുക"
                      : "Track live market prices, trends, and get alerts for the best selling opportunities."}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Live Prices</Badge>
                  <Badge variant="secondary">Price Alerts</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Dialog open={showQuickTools} onOpenChange={setShowQuickTools}>
            <DialogTrigger asChild>
              <Card className="bg-accent/5 border-accent/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg text-accent">{t.quickTools}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t.quickToolsHindi}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calculator className="w-4 h-4" />
                    <span>{t.fertilizerCalc}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sprout className="w-4 h-4" />
                    <span>{t.cropAdvisory}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{t.harvestPlanner}</span>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t.quickTools}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/farm-inputs?tab=calculator">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <Calculator className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{t.fertilizerCalc}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {language === "hi"
                          ? "अपनी फसल के लिए उर्वरक की मात्रा की गणना करें"
                          : language === "ml"
                            ? "നിങ്ങളുടെ വിളയ്ക്കുള്ള വളത്തിന്റെ അളവ് കണക്കാക്കുക"
                            : "Calculate fertilizer requirements for your crop"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <Sprout className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{t.cropAdvisory}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {language === "hi"
                        ? "मौसम के आधार पर फसल की सलाह प्राप्त करें"
                        : language === "ml"
                          ? "കാലാവസ്ഥയെ അടിസ്ഥാനമാക്കി വിള ഉപദേശം നേടുക"
                          : "Get weather-based crop recommendations"}
                    </p>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        {language === "hi"
                          ? "आज की सलाह: बारिश से पहले कटाई पूरी करें"
                          : language === "ml"
                            ? "ഇന്നത്തെ ഉപദേശം: മഴയ്ക്ക് മുമ്പ് വിളവെടുപ്പ് പൂർത്തിയാക്കുക"
                            : "Today's advice: Complete harvesting before rain"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                      <Wheat className="w-6 h-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-lg">{t.harvestPlanner}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {language === "hi"
                        ? "अपनी फसल की कटाई की योजना बनाएं"
                        : language === "ml"
                          ? "നിങ്ങളുടെ വിളവെടുപ്പ് ആസൂത്രണം ചെയ്യുക"
                          : "Plan your crop harvesting schedule"}
                    </p>
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">
                        {language === "hi"
                          ? "गेहूं: 15-20 दिन में तैयार"
                          : language === "ml"
                            ? "ഗോതമ്പ്: 15-20 ദിവസത്തിൽ തയ്യാർ"
                            : "Wheat: Ready in 15-20 days"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
