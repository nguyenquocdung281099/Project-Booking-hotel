import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react';
import { changeFilter, getBookingDB } from '../../../../../../redux/action';
import './style.css'

export default function SortBooking(props) {

    const dispatch = useDispatch();

    const filter = useSelector((state) => state.bookingDB.filter);

    const initialOptionSort = { sort: '', order: '' }
    const [values, setValues] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('userName');

    const debounceSearchInput = useRef(null)

    function handleChangeSort(e) {
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
            setValues(initialOptionSort)
        }
    }

    function handleSearchInput(e) {
        const inputValue = e.target.value
        setSearchInput(inputValue);

        if (!props.handleSearch) return;

        if (debounceSearchInput.current) {
            clearTimeout(debounceSearchInput.current)
        }

        debounceSearchInput.current = setTimeout(() => {
            let string = '{"' + searchType + '_like":"' + inputValue + '"}'
            let a = JSON.parse(string)
            let b = {
                key: searchType,
                value: inputValue
            }
            console.log(a)
            console.log(b)
            props.handleSearch(b)
        }, 1000)
    }

    function handleSearchType(e) {
        setSearchType(e.target.value)
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
                        onChange={handleChangeSort}
                        value={values.sort}
                    >
                        <option hidden>Sort</option>
                        <option value="status">Status</option>
                        <option value="dateStart">Date Start</option>
                        <option value="dateEnd">Date End</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="inputOrder" className="sr-only">Order</label>
                    <select
                        id="inputOrder"
                        name="order"
                        className="form-control"
                        onChange={handleChangeSort}
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
                            onClick={handleChangeSort}
                        >
                            {" "}
                            Clear sort, order
                        </button>
                    )}
                </div>
                <div className="form-group footable-filtering-search">
                    <label className="sr-only">Search</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            onChange={handleSearchInput}
                            value={searchInput}
                        >
                        </input>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputSearchType" className="sr-only">Search Type</label>
                    <select
                        id="inputSearchType"
                        name="inputSearchType"
                        className="form-control"
                        onChange={handleSearchType}
                        value={searchType}
                    >
                        <option value="userName" selected>User Name</option>
                        <option value="id">ID Booking</option>
                    </select>
                </div>
            </div>
        </>
    )
}