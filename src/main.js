/**
 * External dependencies.
 */
import { Component, Fragment } from '@wordpress/element';
import AsyncSelect from 'react-select/async';
import Select from 'react-select'

class CitySelectField extends Component {
    constructor() {
        super();
        this.state = {
            name: 'city_select',
            country: {},
            district: {},
            city: {},
            districtsList: {},
            citiesList: {}
        };
    }

    handleChange1 = (selectedOption) => {
        this.setState({
            country: selectedOption,
            district: {},
            city: {},
        }, () => {
            // console.log(this.state);
        })

        const url = `https://web-hh.com/wp-json/hh/v1/location/districts/${selectedOption.id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({districtsList: data}))
            .catch(err => {
                console.log('State error', err);
            });
    };

    handleChange2 = (selectedOption) => {
        this.setState({
            district: selectedOption,
            city: {}
        }, () => {
            // console.log(this.state);
        })
        const url = `https://web-hh.com/wp-json/hh/v1/location/cities/${this.state.country.id}/${selectedOption.id}`;
        console.log('ch2' + url);
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({citiesList: data}))
            .catch(err => {
                console.log('State error', err);
            });
    }

    handleChange3 = (selectedOption) => {
        this.setState({
            city: selectedOption
        }, () => {
            // console.log(this.state);
        })
    }

    /**
     * Render dependent select input fields.
     *
     * @return {Object}
     */
    render() {
        const { id, name, value, } = this.props;

//        const filteredCities = options3.filter((o) => o.link === this.state.district.value)

        const getCountries = inputValue => {

            const url = `https://web-hh.com/wp-json/hh/v1/location/countries`;
            return fetch(url)
                .then(response => response.json()) // my option list array?
                .catch(err => {
                    console.log('Country error', err);
                });
        };

        const getDistricts = inputValue => {
            const url = `https://web-hh.com/wp-json/hh/v1/location/districts/${this.state.country.id}`;
            console.log(url);
            return fetch(url)
                .then(response => response.json()) // my option list array?
                .then(data => console.log(data)) // my option list array?
                .catch(err => {
                    console.log('State error', err);
                });
        };

        const countriesLoader = inputValue =>
            new Promise(resolve => {
                resolve(getCountries(inputValue));
            });

        return (
            <Fragment>
                <div id={id}>
                    <AsyncSelect
                        name={`${name}[country]`}
//                        defaultValue={this.state.district.value}
                        cacheOptions
//                        defaultOptions={getCountries}
                        defaultOptions
                        loadOptions={getCountries}
                        getOptionLabel={option => option.text}
                        getOptionValue={option => option.id}
                        onChange={this.handleChange1}
                    />

                    <Select
                        name={`${name}[district]`}
                        isDisabled={Object.keys(this.state.country).length === 0}
                        onChange={this.handleChange2}
                        defaultValue={this.state.district.text}
                        options={this.state.districtsList}
                        getOptionLabel={option => option.text}
                        getOptionValue={option => option.id}
                    />

                    <Select
                        name={`${name}[city]`}
                        isDisabled={Object.keys(this.state.district).length === 0}
                        onChange={this.handleChange3}
                        defaultValue={this.state.city.text}
                        options={this.state.citiesList}
                        getOptionLabel={option => option.text}
                        getOptionValue={option => option.id}
                    />
                </div>
            </Fragment >
        );
    }
}

export default CitySelectField;