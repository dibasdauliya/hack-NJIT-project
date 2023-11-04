function getLocation() {
  let data = { error: '' }
  if (!navigator.geolocation) {
    data = { ...data, error: 'Geolocation is not supported by your browser' }
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(132)
        data = {
          ...data,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      },
      () => {
        data = { ...data, error: 'Unable to retrieve your location' }
      }
    )
    return data
    console.log(123)
  }
}

export default getLocation
