'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RiskGauge from '@/components/risk-gauge'

interface FormData {
  age: string
  gender: string
  monthlyUsage: string
  monthlyTransactions: string
  subscriptionType: string
}

export default function ChurnRiskDashboard() {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    monthlyUsage: '',
    monthlyTransactions: '',
    subscriptionType: '',
  })

  // State for API Results
  const [riskScore, setRiskScore] = useState<number>(0)
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low')
  const [loading, setLoading] = useState(false)
  const [hasPredicted, setHasPredicted] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // --- THE BACKEND CONNECTION ---
  const handlePredict = async () => {
    if (!formData.age || !formData.monthlyUsage) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)

    try {
      // 1. Prepare data payload (matching what Python expects)
      const payload = {
        age: parseInt(formData.age),
        gender: formData.gender,
        monthlyUsage: parseFloat(formData.monthlyUsage),
        monthlyTransactions: parseInt(formData.monthlyTransactions),
        subscriptionType: formData.subscriptionType
      }

      // 2. SEND DATA TO RENDER BACKEND
      // *** PASTE YOUR RENDER URL HERE ***
      const response = await fetch('https://churn-prediction-3wzf.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.error) {
        alert("Backend Error: " + data.error)
        return
      }

      // 3. Update UI with Real ML Results
      setRiskScore(data.risk_score)
      
      if (data.risk_score < 30) setRiskLevel('low')
      else if (data.risk_score < 60) setRiskLevel('medium')
      else setRiskLevel('high')

      setHasPredicted(true)

    } catch (error) {
      console.error("Connection failed:", error)
      alert("Could not connect to the Backend. Is Render awake?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold text-black mb-2">Customer Churn Risk Dashboard</h1>
          <p className="text-gray-600">Analyze customer retention risk with AI-powered insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Customer Profile</CardTitle>
              <CardDescription className="text-gray-600">
                Enter customer details to assess churn risk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age" type="number" placeholder="e.g., 35"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usage">Monthly Usage (hours)</Label>
                <Input
                  id="usage" type="number" placeholder="e.g., 45"
                  value={formData.monthlyUsage}
                  onChange={(e) => handleInputChange('monthlyUsage', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactions">Monthly Transactions</Label>
                <Input
                  id="transactions" type="number" placeholder="e.g., 15"
                  value={formData.monthlyTransactions}
                  onChange={(e) => handleInputChange('monthlyTransactions', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subscription">Subscription Type</Label>
                <Select value={formData.subscriptionType} onValueChange={(value) => handleInputChange('subscriptionType', value)}>
                  <SelectTrigger><SelectValue placeholder="Select subscription" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PREDICT BUTTON */}
              <button 
                onClick={handlePredict}
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
              >
                {loading ? 'Processing...' : 'Analyze Churn Risk'}
              </button>

            </CardContent>
          </Card>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Churn Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <RiskGauge score={hasPredicted ? riskScore : 0} level={hasPredicted ? riskLevel : 'low'} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}