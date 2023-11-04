// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import Map, { NavigationControl } from 'react-map-gl/maplibre'
import { withIdentityPoolId } from '@aws/amazon-location-utilities-auth-helper'

import 'maplibre-gl/dist/maplibre-gl.css'

// Amazon Hub Lockers in Vancouver as a GeoJSON FeatureCollection
import lockerGeoJSON from './lockers.json'

// React Component that renders markers for all provided lockers
import LockerMarkers from './LockerMarkers'

import { useEffect, useState } from 'react'
import getLocation from './utils/get-location'
import { Marker } from 'react-map-gl'
import PinIcon from './PinIcon'

const identityPoolId = import.meta.env.VITE_IDENTITY_POOL_ID
const region = import.meta.env.VITE_REGION
const mapName = import.meta.env.VITE_MAP_NAME

const authHelper = await withIdentityPoolId(identityPoolId)

// transform GeoJSON features into simplified locker objects
const lockers = lockerGeoJSON.features.map(
  ({
    geometry: {
      coordinates: [longitude, latitude]
    },
    properties: { title, address: description }
  }) => ({
    latitude,
    longitude,
    title,
    description
  })
)

export default () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [error, setError] = useState(null)

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        () => {
          setError('Unable to retrieve your location')
        }
      )
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  console.log({ location })

  return location.latitude && location.longitude ? (
    <Map
      // See https://visgl.github.io/react-map-gl/docs/api-reference/map
      initialViewState={{
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 15
      }}
      style={{ height: '100vh', width: '100vw' }}
      mapStyle={`https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor`}
      {...authHelper.getMapAuthenticationOptions()}>
      {/* See https://visgl.github.io/react-map-gl/docs/api-reference/navigation-control */}
      <NavigationControl position='bottom-right' showZoom showCompass={true} />

      {/* Render markers for all lockers, with a popup for the selected locker */}
      <LockerMarkers lockers={lockers} />

      {/* Marker for current location */}
      <Marker latitude={location.latitude} longitude={location.longitude}>
        <div>
          {/* You can use an image or an icon here */}
          <PinIcon size='40' isSelected={true} />
        </div>
      </Marker>
    </Map>
  ) : (
    <div>loading...</div>
  )
}
