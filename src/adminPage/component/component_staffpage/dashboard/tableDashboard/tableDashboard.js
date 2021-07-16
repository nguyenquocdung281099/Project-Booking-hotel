import './style.css'
import {Link} from 'react-router-dom'

export default function TableDashboard(props) {
    let {name, link, db} = props 

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
            res.push(<th style={{textTransform: 'capitalize'}} key={`${name}.${data[i]}`}>{data[i]}</th>)
        }
        return res;
    }

    function generatetd(data) {
        let res = [];
        for (var i = 0; i < newData.length; i++) {
            res.push([])
        }

        let tdData = newData;

        for (var j = 0; j < newData.length; j++) {
            for (var k = 0; k < data.length; k++) {
                res[j].push(
                    <td key={`${name}.td.${j}.${data[k]}.${tdData[j][data[k]]}`}>
                        {tdData[j][data[k]]}
                    </td>
                )
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
                <tr >
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
        <div class="col-12 col-md-12 col-lg-12 col-xl-6">
            <div class="card-header">
                <h4 class="card-title d-inline-block">{name}</h4>
                <Link to={link} class="btn btn-primary float-right">View all</Link>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-striped custom-table">
                        <thead>
                            <tr>
                                {buildHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {buildData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}