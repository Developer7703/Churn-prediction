'use client'

import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface RiskGaugeProps {
  score: number
  level: 'low' | 'medium' | 'high'
}

export default function RiskGauge({ score, level }: RiskGaugeProps) {
  const gaugeData = useMemo(
    () => [
      { name: 'Risk', value: score },
      { name: 'Safe', value: 100 - score },
    ],
    [score]
  )

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return '#10b981' // Green
      case 'medium':
        return '#f59e0b' // Amber
      case 'high':
        return '#ef4444' // Red
      default:
        return '#6b7280' // Gray
    }
  }

  const getLevelText = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1)
  }

  const riskColor = getLevelColor(level)
  const safeColor = '#e5e7eb'

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ResponsiveContainer width={280} height={280}>
        <PieChart>
          <Pie
            data={gaugeData}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={110}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={riskColor} />
            <Cell fill={safeColor} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center content */}
      <div className="absolute flex flex-col items-center gap-2">
        <div className="text-4xl font-bold text-black">{Math.round(score)}</div>
        <div className="text-sm text-gray-600">Risk Score</div>
      </div>

      {/* Level badge */}
      <div className="mt-4 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: riskColor }}
          ></div>
          <span
            className="font-semibold text-sm"
            style={{ color: riskColor }}
          >
            {getLevelText(level)} Risk
          </span>
        </div>
      </div>
    </div>
  )
}
