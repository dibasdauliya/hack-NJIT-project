// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Popup } from 'react-map-gl/maplibre'
import { Link } from 'react-router-dom'

// A popup containing locker details
export default ({
  locker: { latitude, longitude, title, description },
  onClose
}) => (
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
        className='underline'>
        Read news around this location!
      </Link>
      <p className='text-gray-400'>
        Longitude: {+longitude.toFixed(2)}, Latitude: {+latitude.toFixed(2)}
      </p>
    </>
  </Popup>
)
