// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Popup } from 'react-map-gl/maplibre'
import { Link } from 'react-router-dom'

// A popup containing locker details
export default ({
  locker: {
    latitude,
    longitude,
    wind,
    windDeg,
    temperature,
    humidity,
    sunset,
    sunrise,
    city
  },
  onClose
}) => {
  return (
    // See https://visgl.github.io/react-map-gl/docs/api-reference/popup
    <Popup
      latitude={latitude}
      longitude={longitude}
      // offset the popup so that it attaches to the top of the pushpin
      offset={[0, -36]}
      closeButton
      closeOnClick
      onClose={onClose}
      anchor='bottom'>
      <>
        <Link
          to={`/news?lat=${latitude}&long=${longitude}`}
          className='underline inline-block mb-2 text-base'>
          Read news around this location!
        </Link>
        <p className='text-gray-800 text-base'>
          {/* Longitude: {+longitude.toFixed(2)}, Latitude: {+latitude.toFixed(2)}{' '}
          <br /> */}
          City: {city} <br />
          Wind: {wind} miles/hour <br />
          Wind direction: {windDeg} degrees <br />
          Temperature: {temperature}°F <br />
          Humidity: {humidity}% <br />
          Sunrise at: {new Date(sunrise * 1000).toLocaleTimeString()} <br />
          Sunset at: {new Date(sunset * 1000).toLocaleTimeString()}
        </p>
      </>
    </Popup>
  )
}
