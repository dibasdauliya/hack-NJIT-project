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
import Ham from './icons/Ham'
import Cross from './icons/cross'
import { Link } from 'react-router-dom'

const identityPoolId = import.meta.env.VITE_IDENTITY_POOL_ID
const region = import.meta.env.VITE_REGION
const mapName = import.meta.env.VITE_MAP_NAME

const authHelper = await withIdentityPoolId(identityPoolId)

// transform GeoJSON features into simplified locker objects

export default () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [error, setError] = useState(null)

  const [isNavOpen, setIsNavOpen] = useState(true)

  const [lockersData, setLockers] = useState([])

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

          setLockers((p) => [
            ...p,
            {
              geometry: {
                type: 'Point',
                coordinates: [
                  position.coords.longitude,
                  position.coords.latitude
                ]
              },
              properties: {
                title: 'New Locker',
                address: 'New Locker'
              }
            }
          ])

          localStorage.setItem(
            'coordinates',
            JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          )
        },
        () => {
          alert('Unable to retrieve your location')
        }
      )
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  const lockers = lockersData.map(
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

  function handleMapClick(event) {
    console.log(event.lngLat)

    setLockers((p) => [
      ...p,
      {
        geometry: {
          type: 'Point',
          coordinates: [event.lngLat.lng, event.lngLat.lat]
        },
        properties: {
          title: 'New Locker',
          address: 'New Locker'
        }
      }
    ])
  }

  console.log({ location })

  return location.latitude && location.longitude ? (
    <>
      <div className='fixed left-4 top-4 bg-black/5 backdrop-blur-md p-4 m-4 flex gap-8 justify-center z-[999] rounded-full font-semibold text-lg'>
        <span>Wind: 123</span>

        <span>Temperature: 123</span>
      </div>

      <div
        className={`h-full fixed right-0 w-[300px] z-[999] bg-black/5 p-4 backdrop-blur-md transition-transform ${
          isNavOpen ? 'translate-x-0' : 'translate-x-full'
        } h-full grid place-items-center`}>
        <ul className='space-y-8 text-center'>
          <li>
            <Link to='/news' className='inline-block hover:underline'>
              Read Latest News
            </Link>
          </li>
          <li>
            <Link to='/about' className='inline-block hover:underline'>
              About
            </Link>
          </li>
          <li>
            <Link to='/contact' className='inline-block hover:underline'>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div
        className='fixed top-4 right-4 z-[999] bg-black/50 backdrop-blur-md p-4 m-4 rounded-full text-white cursor-pointer'
        onClick={() => setIsNavOpen(!isNavOpen)}>
        {isNavOpen ? <Cross /> : <Ham />}
      </div>
      <Map
        // See https://visgl.github.io/react-map-gl/docs/api-reference/map
        onClick={(e) => handleMapClick(e)}
        initialViewState={{
          latitude: location.latitude,
          longitude: location.longitude,
          zoom: 15
        }}
        style={{ height: '100vh', width: '100vw' }}
        mapStyle={`https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor`}
        {...authHelper.getMapAuthenticationOptions()}>
        {/* See https://visgl.github.io/react-map-gl/docs/api-reference/navigation-control */}
        <NavigationControl
          position='bottom-right'
          showZoom
          showCompass={true}
        />

        {/* Render markers for all lockers, with a popup for the selected locker */}
        <LockerMarkers lockers={lockers} />

        {/* Marker for current location */}
        {/* <Marker
          latitude={location.latitude}
          longitude={location.longitude}
          onClick={(e) => {
            e.originalEvent.stopPropagation()
            alert(12)
          }}>
          <div>
            <PinIcon size='40' isSelected={true} />
          </div>
        </Marker> */}
      </Map>
    </>
  ) : (
    <div className='w-full h-screen grid place-items-center text-2xl animate-pulse font-semibold'>
      Loading...
    </div>
  )
}
