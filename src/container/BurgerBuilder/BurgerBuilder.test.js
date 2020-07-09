import React from 'react'
import { BurgerBuilder } from './BurgerBuilder'
import { configfure, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'

configure({
  adapter: new Adapter()
})
describe('<burgerBuilder />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInit={() => {}} />)
  })
  it('should render <buildControls/> when receiving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } })
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
})
