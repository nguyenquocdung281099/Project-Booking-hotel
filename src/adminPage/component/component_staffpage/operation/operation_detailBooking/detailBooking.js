import './style.css'

export default function DetailBooking() {
    return (
        <div>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="bookingID">BookingID</label>
                        <input type="text" className="form-control" id="bookingID" placeholder=""></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="roomNumber">Room Number</label>
                        <input type="text" className="form-control" id="roomNumber" placeholder=""></input>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="userID">User ID</label>
                        <input type="text" className="form-control" id="userID" placeholder=""></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="userName">User Name</label>
                        <input type="text" className="form-control" id="userName" placeholder=""></input>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="startDate">Start Date</label>
                        <input type="date" className="form-control" id="startDate" placeholder="Start Date"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="endDate">End Date</label>
                        <input type="date" className="form-control" id="endDate" placeholder="End Date"></input>
                    </div>
                </div>
                <div className="form-group">
                    <label for="service">Service</label>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                ...
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="form-group">
                    <label for="numberPeople">Number of People</label>
                    <input type="number" className="form-control" id="numberPeople" placeholder=""></input>
                </div>
                <div className="form-group">
                    <label for="promoID">Promotion ID</label>
                    <input type="text" className="form-control" id="promoID" placeholder=""></input>
                </div>
                <div className="form-group">
                    <label for="status">Status</label>
                    <select id="status" className="form-control">
                        <option selected>Choose...</option>
                        <option>Inactive</option>
                        <option>Active</option>
                    </select>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="startDate">Start Date</label>
                        <input type="date" className="form-control" id="startDate" placeholder="Start Date"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="endDate">End Date</label>
                        <input type="date" className="form-control" id="endDate" placeholder="End Date"></input>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="roomCost">Room Cost</label>
                        <input type="number" className="form-control" id="roomCost" placeholder=""></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="serviceCost">Service Cost</label>
                        <input type="number" className="form-control" id="serviceCost" placeholder=""></input>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="bookingCost">Booking Cost</label>
                        <input type="number" className="form-control" id="bookingCost" placeholder=""></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="totalCost">Total Cost</label>
                        <input type="number" className="form-control" id="totalCost" placeholder=""></input>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    <i class="fas fa-file-invoice-dollar"></i>
                    Checkout
                </button>
                <button className="btn btn-danger">
                    <i class="fas fa-ban"></i>
                    Cancel
                </button>
            </form>
        </div >
    )
}