import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { changeFilter, searchBookingDB } from '../../../../../../redux/action';
import './style.css'

export default function SortBooking(props) {

    const dispatch = useDispatch();

    const filter = useSelector((state) => state.bookingDB.filter);
    const search = useSelector((state) => state.bookingDB.search);

    const initialOptionSort = { sort: '', order: '' }
    const searchInputDef = ''
    const searchTypeDef = ''
    const [values, setValues] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('');

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
        setSearchInput(e.target.value);
    }

    function handleSearchType(e) {
        setSearchType(e.target.value)
    }

    function handleSearch(data1, data2) {
        if (data1 !== '' && data2 !== '') {
            let string = '{"' + data1 + '_like":"' + data2 + '"}'
            let a = JSON.parse(string)
            dispatch(searchBookingDB({ ...search, ...a }));
        }
    }
    
    function handleResetSearch() {
        dispatch(searchBookingDB({}))
        setSearchType(searchTypeDef)
        setSearchInput(searchInputDef)
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
                            placeholder="Search"
                            onChange={handleSearchInput}
                            value={searchInput}
                        >
                        </input>
                        <div className="input-group-btn">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleSearch(searchType, searchInput)}
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
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
                        <option hidden>Search Type</option>
                        <option value="userName">User Name</option>
                        <option value="id">ID Booking</option>
                    </select>
                </div>
                <div className="form-group row col-auto">
                    {Object.keys(search).length !== 0 && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleResetSearch()}
                        >
                            {" "}
                            Clear search
                        </button>
                    )}
                </div>
            </div>

        </>
    )
}