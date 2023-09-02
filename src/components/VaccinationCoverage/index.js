// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverageData} = props
  console.log(vaccinationCoverageData)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}K`
    }
    return `${number.toString()}K`
  }

  return (
    <div className="vaccination-coverage-container">
      <h1 className="heading">Vaccination Coverage</h1>
      <ResponsiveContainer width={1000} height={300}>
        <BarChart
          data={vaccinationCoverageData}
          margin={{top: 5}}
          width={1000}
          height={300}
        >
          <XAxis
            data_key="vaccineDate"
            tick={{stroke: 'grey', strokeWidth: 1, fontFamily: 'Roboto'}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'grey',
              strokeWidth: 0.5,
              fontSize: 20,
              fontFamily: 'Roboto',
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
              fontFamily: 'Roboto',
              fontSize: 20,
              textAlign: 'center',
            }}
          />
          <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
