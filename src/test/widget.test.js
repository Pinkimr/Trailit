import React from 'react'
import {mount, configure} from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import NumberAbbreviation from '../components/Widgets/NumberAbbreviation'

configure({adapter: new Adapter()})
const props = {
  value: 1570,
  precision: 2,
}

describe('Number Abbreviation', () => {
  it('Should Render the Name of City', () => {
    const number = mount(<NumberAbbreviation {...props} />)
    expect(number.text('')).toEqual('1.57k')
  })

  // it("Should check number of stars icon in span tag is equal to 2", () => {
  //   let city = mount(<CityList {...props} />);
  //   const favIcons = city.find("span");
  //   expect(favIcons.length === 2);
  // });

  // it("Should accept empty favorite list city array", () => {
  //   let cityComponent = mount(<CityList {...props} />);
  //   cityComponent.setProps({ favCityList: [] });
  //   expect(cityComponent.find("span").containsMatchingElement(<FiStar />));
  // });

  // it("Should convert temprature from Kelvin to Celcius ", () => {
  //   let city = mount(<CityList {...props} />);
  //   expect(city.find("h1").contains(favCityList[0].main.temp - 273.15));
  // });
})
