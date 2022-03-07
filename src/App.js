import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { handlerSchedule } from './services/handlerShedule'
import refresh from './refresh.png'

function App() {
  const [data, setData] = useState([])
  const [takeOptions, setTakeOptions] = useState({})
  useEffect(() => {
    handleRefresh()
  }, [])
  const handleCellClick = (event, time, motorcycles, obj) => {
    handlerSchedule.getSchedule().then(data => setData(data))
    const timeToTake = takeOptions[time]
    if (!timeToTake && motorcycles === 0) return
    if (timeToTake) {
      handlerSchedule.increase(time).then(r => {
        setData(data.map(e => e.time === time ? { ...e, motorcycles: r.motorcycles } : e))
      })
      setTakeOptions({ ...takeOptions, [time]: false })
    }
    else {
      handlerSchedule.decrease(time).then(r => {
        setData(data.map(e => e.time === time ? { ...e, motorcycles: r.motorcycles } : e))
      })
      setTakeOptions({ ...takeOptions, [time]: true })
    }
  }
  const handleRefresh = () => {
    handlerSchedule.getSchedule().then(data => setData(data))
  }
  return (
    <div className="container-fluid">

      <table class="table table-bordered">
        <thead>
          <th className='th-refresh'>
            <div onClick={handleRefresh} className="refresh">
              <img src={refresh} alt="" />
            </div>
          </th>
          <tr>
            <th>Time</th>
            <th>Motorcycles</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(e => (
            <tr
              className={e.motorcycles === 0 && 'bg-danger' || takeOptions[e.time] && 'bg-success' || !takeOptions[e.time] && 'bg-light'}
              onClick={(ev) => handleCellClick(ev, e.time, e.motorcycles, e)}>
              <td>{e.time}</td>
              <td>{e.motorcycles}</td>
              <td>{e.motorcycles === 0 && !takeOptions[e.time] ? 'Unavailable' : '' || takeOptions[e.time] && 'Taken' || !takeOptions[e.time] && 'Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
