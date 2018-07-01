import * as React from 'react';

import './search.css';

function FlightPrice(props) {
    const flight = props.flight;
    return (
        <div>
            {flight.price}
        </div>
    )
}
function FlightTime(props) {
    const flight = props.flight;
    let departure = Date(flight.dTime * 1000);
    let arrival = Date(flight.aTime * 1000);
    return (
        <div>
            {departure} 
            {arrival}
        </div>
    )
}

function FlightFrom(props) {
    const flight = props.flight;
    
    return (
        <div> 
            {flight.cityFrom} 
        </div>

    );
}

function FlightTo(props) {
    const flight = props.flight;
    return (
        <div> 
            {flight.cityTo} 
        </div>
    );
}


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {flyFrom: 'PRG', to: 'VLC'};     
        this.changeFlightFrom = this.changeFlightFrom.bind(this);
        this.changeFlightTo = this.changeFlightTo.bind(this);
        this.handleChange = this.handleChange.bind(this);
                

    }

    changeFlightFrom(event) {
        this.setState({flyFrom: event.target.value})
    }

    changeFlightTo(event) {
        this.setState({to: event.target.value})
    }

    handleChange(event) {
        event.preventDefault();
    }

    render() {
        function myFunction(data) {
            if (data === null) {
                return <div>Loading ...</div>;
            } else {
                return (
                <div>
                    <h1>Almost the most awesome flights!</h1>
                    
                    <div className="search">
                    <div className="selectdeparture">
                    <h4>Select Departure</h4>
                    <select value={this.state.flyFrom} onChange={this.changeFlightFrom}>
                        <option value='PRG'>Prague</option>
                        <option value='BER'>Berlin</option>
                        <option value='WAW'>Warsaw</option>
                        <option value='PED'>Pardubice</option>
                        <option value='EDI'>Edinburgh</option>
                    </select>                    
                    </div>
                    <div className="selecarrival">
                    <h4>Select Arrival</h4>
                    <select value={this.state.to} onChange={this.changeFlightTo}>
                        <option value='VLC' className="vlc">Valencia</option>
                        <option value='BCN'>Barcelona</option>
                        <option value='MAD'>Madrid</option>
                        <option value='MXP'>Milano</option>
                        <option value='ATH'>Athens</option>
                    </select>
                    </div>
                    </div>

                    <div className="displayflight">

                        <div className="row"><h4>From
                        
                        </h4>{data.map(flight => <FlightFrom key={flight.id} flight={flight} />)}</div>
                        <div className="row"><h4>To
                        
                        </h4>{data.map(flight => <FlightTo key={flight.id} flight={flight} />)}</div>
                        
                        <div className="price"><h4>Price</h4>{data.map(flight => <FlightPrice key={flight.id} flight={flight} />)}</div>
                        <div className="time"><h4>Time of Departure and Arrival</h4>{data.map(flight => <FlightTime key={flight.id} flight={flight} />)}</div>
                    </div>
                </div>
                );
            }
        }
        return <Fetcher 
        flyFrom={this.state.flyFrom}
        to={this.state.to}

        render={myFunction.bind(this)} />
         
        }
}

class Fetcher extends React.Component {
    state = {
        data: null,
    };

    async componentDidMount() {
console.warn('cdm')

        // waiting for the api reponse and then returns the response to json, then sets the state of data to json
        const response = await fetch (
        'https://api.skypicker.com/flights?flyFrom='+this.props.flyFrom+'&to='+this.props.to+'&dateFrom=08/08/2018&dateTo=08/12/2018&limit=5&dtimefrom=00:00&dtimeto=00:00&atimefrom=00:00&atimeto=00:00&price_from=1&price_to=10000'
        );
        const json = await response.json();
        
        this.setState({
            data: json.data,
        
        });
    }

    async componentDidUpdate(prevProps) {


        // waiting for the api reponse and then returns the response to json, then sets the state of data to json
        const response = await fetch (
        'https://api.skypicker.com/flights?flyFrom='+this.props.flyFrom+'&to='+this.props.to+'&dateFrom=08/08/2018&dateTo=08/12/2018&limit=5&dtimefrom=00:00&dtimeto=00:00&atimefrom=00:00&atimeto=00:00&price_from=1&price_to=10000'
        );
        const json = await response.json();
        
        this.setState({
            data: json.data,
        
        });
    }

    render() {
        return this.props.render(this.state.data)
    }
}