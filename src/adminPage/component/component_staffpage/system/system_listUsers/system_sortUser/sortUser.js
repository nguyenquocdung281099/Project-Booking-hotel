import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { changeFilter } from '../../../../../../redux/action';
import './style.css'

export default function SortUser() {

    const dispatch = useDispatch();
    const filter = useSelector((state) => state.userDB.filter);
    const initialOption = { sort: '', order: '' }
    const [values, setValues] = useState({});
    function handleChange(e) {
        if (e.target.name === 'sort') {
            dispatch(
                changeFilter({
                    ...filter,
                    _sort: e.target.value,
                })
            );
            setValues({
                ...values,
                sort: e.target.value,
            });
        } else if (e.target.name === 'order') {
            dispatch(
                changeFilter({
                    ...filter,
                    _order: e.target.value,
                })
            );
            setValues({
                ...values,
                order: e.target.value,
            });
        } else {
            dispatch(changeFilter({}))
            setValues(initialOption)
        }
    }
    return (
        <>
            <div className="form-inline">
                <div className="form-group">
                    <label for="inputSort" className="sr-only">Sort</label>
                        <select
                            id="inputSort"
                            name="sort"
                            className="form-control"
                            onChange={handleChange}
                            value={values.sort}
                        >
                            <option hidden>Sort</option>
                            <option value="idRole">Role</option>
                        </select>
                </div>
                <div className="form-group">
                    <label for="inputOrder" className="sr-only">Order</label>
                        <select
                            id="inputOrder"
                            name="order"
                            className="form-control"
                            onChange={handleChange}
                            value={values.order}
                        >
                            <option hidden>Order</option>
                            <option value="asc" >Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                </div>
                <div className="form-group row col-auto">
                    {Object.keys(filter).length !== 0 && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleChange}
                        >
                            {" "}
                            Clear sort, order
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}