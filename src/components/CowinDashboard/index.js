// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  process: 'PROCESS',
  failure: 'FAILED',
}

class CowinDashboard extends Component {
  state = {
    vaccinationCoverage: [],
    vaccinationByGender: [],
    vaccinationByAge: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getTheVaccinationCoverageData = data => ({
    dose1: data.dose_1,
    dose2: data.dose_2,
    vaccineDate: data.vaccine_date,
  })

  getTheVaccinationByAge = data => ({
    age: data.age,
    count: data.count,
  })

  getTheVaccinationByGender = data => ({
    count: data.count,
    gender: data.gender,
  })

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.process})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const vaccinationCoverageInWeek = fetchedData.last_7_days_vaccination.map(
        each => this.getTheVaccinationCoverageData(each),
      )
      const vaccinationByAge = fetchedData.vaccination_by_age.map(each =>
        this.getTheVaccinationByAge(each),
      )
      const vaccinationByGender = fetchedData.vaccination_by_gender.map(each =>
        this.getTheVaccinationByGender(each),
      )
      this.setState({
        vaccinationCoverage: vaccinationCoverageInWeek,
        vaccinationByGender,
        vaccinationByAge,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTheVaccinationCoverage = () => {
    const {
      vaccinationCoverage,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage vaccinationCoverageData={vaccinationCoverage} />
        <VaccinationByGender vaccinationByGenderData={vaccinationByGender} />
        <VaccinationByAge vaccinationByAgeData={vaccinationByAge} />
      </>
    )
  }

  renderTheLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderTheFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image-size"
      />
      <h1 className="heading">Something went wrong</h1>
    </div>
  )

  renderTheVaccinationViews = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTheVaccinationCoverage()
      case apiStatusConstants.process:
        return this.renderTheLoader()
      case apiStatusConstants.failure:
        return this.renderTheFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-container">
        <nav className="navbar-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="website-name">co-WIN</h1>
        </nav>
        <h1 className="heading">CoWIN Vaccination in India"</h1>
        {this.renderTheVaccinationViews()}
      </div>
    )
  }
}

export default CowinDashboard
