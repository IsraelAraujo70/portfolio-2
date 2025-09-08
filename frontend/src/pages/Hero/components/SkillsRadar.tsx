import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const skillsData = [
  {
    skill: 'Attitude Skills',
    value: 9,
    fullMark: 10
  },
  {
    skill: 'Communication Skills',
    value: 8,
    fullMark: 10
  },
  {
    skill: 'Team Skills',
    value: 9,
    fullMark: 10
  },
  {
    skill: 'General Skills',
    value: 8,
    fullMark: 10
  },
  {
    skill: 'Tech Skills',
    value: 9,
    fullMark: 10
  },
  {
    skill: 'Performance Skills',
    value: 8,
    fullMark: 10
  }
];

export default function SkillsRadar() {
  return (
    <div className="w-full h-52 md:h-60">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={skillsData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <defs>
            <linearGradient id="skillsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity={0.8} />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <PolarGrid 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth={1}
            gridType="polygon"
          />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ 
              fontSize: 10, 
              fill: '#94a3b8',
              fontWeight: 500
            }}
            className="text-xs"
          />
          <PolarRadiusAxis 
            domain={[0, 10]} 
            tick={{ 
              fontSize: 8, 
              fill: '#64748b' 
            }}
            tickCount={6}
            angle={90}
          />
          <Radar 
            name="Skills" 
            dataKey="value" 
            stroke="rgb(59, 130, 246)"
            fill="url(#skillsGradient)"
            strokeWidth={2}
            dot={{ 
              fill: 'rgb(59, 130, 246)', 
              strokeWidth: 2, 
              stroke: 'rgba(59, 130, 246, 0.3)',
              r: 4
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}