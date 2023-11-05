// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import Map, { NavigationControl } from 'react-map-gl/maplibre'
import { withIdentityPoolId } from '@aws/amazon-location-utilities-auth-helper'

import 'maplibre-gl/dist/maplibre-gl.css'

// React Component that renders markers for all provided lockers
import LockerMarkers from './LockerMarkers'

import { useEffect, useState } from 'react'
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

  const [isNavOpen, setIsNavOpen] = useState(false)

  const [lockersData, setLockers] = useState([])

  const [weatherData, setWeatherData] = useState({})

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setLocation({
            latitude: lat,
            longitude: lng
          })

          localStorage.setItem(
            'coordinates',
            JSON.stringify({
              latitude: lat,
              longitude: lng
            })
          )

          fetchWeatherData(lat, lng)
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
      properties: {
        wind,
        windDeg,
        temperature,
        humidity,
        sunset,
        city,
        sunrise
      }
    }) => ({
      latitude,
      longitude,
      wind,
      windDeg,
      temperature,
      humidity,
      sunset,
      city,
      sunrise
    })
  )

  function fetchWeatherData(lat, lng) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
        import.meta.env.VITE_OPENWEATHER
      }&units=imperial`
    )
      .then((res) => res.json())
      .then((data) => {
        const weatherData = {
          wind: data.wind.speed,
          windDeg: data.wind.deg,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          sunset: data.sys.sunset,
          sunrise: data.sys.sunrise,
          city: data.name
        }
        setWeatherData(weatherData)

        setLockers((p) => [
          ...p,
          {
            geometry: {
              type: 'Point',
              coordinates: [lng, lat]
            },
            properties: weatherData
          }
        ])
      })
  }

  function handleMapClick(event) {
    // console.log(event.lngLat)

    // open weather API
    fetchWeatherData(event.lngLat.lat, event.lngLat.lng)
  }

  return location.latitude && location.longitude ? (
    <>
      <div className='fixed left-4 top-4 bg-black/5 backdrop-blur-md p-4 m-4 flex gap-4 justify-center z-[999] rounded-full font-semibold lg:text-lg flex-wrap'>
        <span className='text-[#2377a4]'>WNews Location</span> |
        <span>Wind direction: {weatherData?.wind} miles/hour</span>
        <span>Temperature: {weatherData?.temperature}°F</span>
      </div>

      <div
        className={`h-full fixed right-0 w-[300px] z-[999] bg-black/5 p-4 backdrop-blur-md transition-transform ${
          isNavOpen ? 'translate-x-0' : 'translate-x-full'
        } h-full grid place-items-center lg:text-lg`}>
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
        <small className='text-gray-600'>&copy; WNews Location</small>
      </div>

      <div
        className='fixed top-4 right-4 z-[999] bg-black/50 backdrop-blur-md p-4 m-4 rounded-full text-white cursor-pointer hover:brightness-125 transition-all'
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
      </Map>
    </>
  ) : (
    <div className='w-full h-screen grid place-items-center text-2xl animate-pulse font-semibold'>
      Loading map...
    </div>
  )
}
