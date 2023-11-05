import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import LeftArrow from '../icons/LeftArrow'
import { Link, useSearchParams } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import { getMeters } from '../utils/get-meters'

export default function Other() {
  const [news, setNews] = useState([])
  const [radius, setRadius] = useState(37)

  const [queryParameters] = useSearchParams()

  // console.log({ queryParameters })

  async function fetchNews() {
    try {
      let coords = localStorage.getItem('coordinates')
      if (!coords) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        localStorage.setItem('coordinates', JSON.stringify(coords))
      } else {
        coords = JSON.parse(coords)
      }

      // see if there are any query parameters
      const latFromQuery = queryParameters.get('lat')
      const longFromQuery = queryParameters.get('long')

      const response = await fetch(
        `https://api.worldapi.com/reports?lat=${
          latFromQuery || coords.latitude
        }&lon=${longFromQuery || coords.longitude}&radius=${getMeters(
          radius
        )}&min_time=1698456425&api_key=${
          import.meta.env.VITE_WORLD_API_KEY
        }&limit=5`
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setNews(data.reports)
      // console.log(data)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  function handleRadiusSubmit(e) {
    fetchNews()
    e.preventDefault()
    // console.log('12')
  }

  return (
    <PageLayout>
      <Container>
        <h1 className='text-2xl font-bold my-4 text-white'>
          Latest News Near You!
        </h1>

        <section className='flex gap-8 mt-8'>
          <div>
            <input
              type='number'
              placeholder='Enter radius in miles'
              className='p-3 rounded-md'
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
            <br />
            <small className='text-gray-200'>in miles</small>
          </div>

          <button
            className='bg-[#9ae2eb] px-4 rounded-full hover:brightness-105 transition-all inline-block h-12'
            type='button'
            onClick={handleRadiusSubmit}>
            Search by radius
          </button>
        </section>

        <section className='flex gap-3 flex-wrap mt-8'>
          {news?.length > 0 ? (
            news.map(
              (
                { claim, summary, source_citation_url, source_image_url },
                idx
              ) => (
                <div
                  key={idx}
                  className='bg-black/40 text-white backdrop-blur-sm p-4 rounded-md'>
                  <div className='flex gap-3 flex-wrap lg:flex-nowrap'>
                    <img
                      width={150}
                      className='aspect-auto object-cover rounded-sm block mx-auto lg:mx-0'
                      src={source_image_url}
                      alt=''
                    />

                    <div className='max-w-[350px] lg:max-w-full'>
                      <h2 className='font-bold text-lg'>{claim}</h2>
                      <p className='mt-2 mb-4'>{summary}</p>
                      <p>
                        Source:{' '}
                        <a
                          href={source_citation_url}
                          target='_blank'
                          className='underline break-words'
                          rel='noreferrer'>
                          {source_citation_url}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <p className='text-white text-lg font-semibold'>No news found</p>
          )}
        </section>
      </Container>
    </PageLayout>
  )
}
