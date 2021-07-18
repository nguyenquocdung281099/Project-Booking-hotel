import './style.css'
import { Link } from 'react-router-dom'
import SBadge from '../../badge/badge';

export default function TableDashboard(props) {
    let { name, link, db, button } = props
    let newData = Object.keys(db).map(index => {
        let x = db[index];
        return x;
    });

    function headerProps(data) {
        let header = Object.keys(data);
        return header;
    }

    function generateHeader(data) {
        let res = [];
        for (var i = 0; i < data.length; i++) {
            switch (data[i]) {
                case 'id':
                    res.push(<th style={{ textTransform: 'capitalize' }} key={`${name}.${data[i]}`}>ID</th>)
                    break;
                case 'dateStart':
                    res.push(<th style={{ textTransform: 'capitalize' }} key={`${name}.${data[i]}`}>Date Start</th>)
                    break;
                case 'dateEnd':
                    res.push(<th style={{ textTransform: 'capitalize' }} key={`${name}.${data[i]}`}>Date End</th>)
                    break;
                case 'idtyperoom':
                    res.push(<th style={{ textTransform: 'capitalize' }} key={`${name}.${data[i]}`}>Room Type</th>)
                    break;
                case 'pricePerday':
                    res.push(<th style={{ textTransform: 'capitalize' }} key={`${name}.${data[i]}`}>Price Per Day</th>)
                    break;
                default:
                    res.push(<th style={{ textTransform: 'capitalize' }} key={`${name}.${data[i]}`}>{data[i]}</th>)
                    break;
            }
        }
        return res;
    }
    const typeName = (item) => {
        switch (item) {
            case 1:
                return 'Classic'
            case 2:
                return 'Budget'
            case 3:
                return 'Single'
            case 4:
                return 'Royal Suite'
            case 5:
                return 'Luxury'
            case 6:
                return 'Premium'
            default:
                return ''
        }
    }

    function generatetd(data) {
        let res = [];
        for (var i = 0; i < newData.length; i++) {
            res.push([])
        }

        let tdData = newData;

        for (var j = 0; j < newData.length; j++) {
            for (var k = 0; k < data.length; k++) {
                switch (data[k]) {
                    case 'dateStart':
                    case 'dateEnd':
                    case 'expiryDate':
                        let a = new Date(tdData[j][data[k]])
                        let b = `${a.getDate()}/${a.getMonth() + 1}/${a.getFullYear()}`
                        res[j].push(
                            <td key={`${name}.td.${j}.${data[k]}.${tdData[j][data[k]]}`}>
                                {b}
                            </td>
                        )
                        break;
                    case 'status':
                        let c = SBadge(tdData[j][data[k]])
                        res[j].push(
                            <td key={`${name}.td.${j}.${data[k]}.${tdData[j][data[k]]}`}>
                                {c}
                            </td>
                        )
                        break;
                    case 'price':
                    case 'pricePerday':
                        res[j].push(
                            <td key={`${name}.td.${j}.${data[k]}.${tdData[j][data[k]]}`}>
                                {tdData[j][data[k]]} $
                            </td>
                        )
                        break;
                    case 'idtyperoom':
                        res[j].push(
                            <td key={`${name}.td.${j}.${data[k]}.${tdData[j][data[k]]}`}>
                                {typeName(tdData[j][data[k]])}
                            </td>
                        )
                        break;
                    case 'rating':
                        res[j].push(
                            <td key={`${name}.td.${j}.${data[k]}.${tdData[j][data[k]]}`}>
                                {tdData[j][data[k]]} <i class="fas fa-star"></i>
                            </td>
                        )
                        break;
                    case 'number':
                        res[j].push(
                            <td key={`${name}.td.${j}.${data[k]}.${tdData[j][data[k]]}`}>
                                {tdData[j][data[k]]} <i class="fas fa-user"></i>
                            </td>
                        )
                        break;
                    case 'discount':
                        res[j].push(
                            <td key={`${name}.td.${j}.${data[k]}.${tdData[j][data[k]]}`}>
                                {tdData[j][data[k]]} %
                            </td>
                        )
                        break;
                    default:
                        res[j].push(
                            <td key={`${name}.td.${j}.${data[k]}.${tdData[j][data[k]]}`}>
                                {tdData[j][data[k]]}
                            </td>
                        )
                        break;
                }
            }
        }
        return res;
    }

    function generatetrData(data) {
        let res = [];
        for (var j = 0; j < newData.length; j++) {
            res.push([])
        }

        let trData = newData;
        for (var i = 0; i < trData.length; i++) {
            res[i].push(
                <tr key={`${name}.tr.${i}`}>
                    {data[i]}
                </tr>
            )
        }
        return res;
    }

    let header = headerProps(newData[1])

    let buildHeader = generateHeader(header)

    let buildTd = generatetd(header)

    let buildData = generatetrData(buildTd);

    return (
        <div className="col-12 col-md-12 col-lg-12 col-xl-6">
            <div key={`${name}.card`} className='card'>
                <div className="card-header">
                    <h4 className="card-title d-inline-block">{name}</h4>
                    {button?
                    <Link to={link} className="btn btn-primary float-right">View all</Link>
                    : ("") }
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table key={`${name}.table`} className="table table-striped custom-table">
                            <thead key={`${name}.tablehead`}>
                                <tr>
                                    {buildHeader}
                                </tr>
                            </thead>
                            <tbody key={`${name}.tablebody`}>
                                {buildData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}