import { render } from '@testing-library/react'
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete'
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete
} from '.'

const mockGeocoderInstance = {
  on: jest.fn(),
  off: jest.fn(),
  destroy: jest.fn(),
  setType: jest.fn(),
  setLang: jest.fn(),
  setLimit: jest.fn(),
  setValue: jest.fn(),
  addFilterByCountry: jest.fn(),
  addFilterByCircle: jest.fn(),
  addFilterByRect: jest.fn(),
  addFilterByPlace: jest.fn(),
  addBiasByCountry: jest.fn(),
  addBiasByCircle: jest.fn(),
  addBiasByRect: jest.fn(),
  addBiasByProximity: jest.fn(),
  setPreprocessHook: jest.fn(),
  setPostprocessHook: jest.fn(),
  setSuggestionsFilter: jest.fn()
}

jest.mock('@geoapify/geocoder-autocomplete', () => ({
  GeocoderAutocomplete: jest.fn(() => mockGeocoderInstance)
}))

describe('GeoapifyGeocoderAutocomplete', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates and destroys the geocoder instance', () => {
    const { unmount } = render(
      <GeoapifyContext apiKey="test-key">
        <GeoapifyGeocoderAutocomplete type="locality" />
      </GeoapifyContext>
    )

    expect(GeocoderAutocomplete).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      'test-key',
      expect.objectContaining({})
    )
    expect(mockGeocoderInstance.setType).toHaveBeenCalledWith('locality')

    unmount()

    expect(mockGeocoderInstance.destroy).toHaveBeenCalledTimes(1)
  })

  it('preserves the React category selection callback shape', () => {
    const onPlaceByCategorySelect = jest.fn()
    const place = { properties: { name: 'Cafe' } }

    render(
      <GeoapifyContext apiKey="test-key">
        <GeoapifyGeocoderAutocomplete
          onPlaceByCategorySelect={onPlaceByCategorySelect}
        />
      </GeoapifyContext>
    )

    const placeSelectRegistration = mockGeocoderInstance.on.mock.calls.find(
      ([event]) => event === 'place_select'
    )

    expect(placeSelectRegistration).toBeDefined()
    placeSelectRegistration?.[1](place, 2)

    expect(onPlaceByCategorySelect).toHaveBeenCalledWith({ place, index: 2 })
  })
})
