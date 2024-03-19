import React, { useState } from 'react';
import { key } from './Key';

const GoogleMapsApiKey = key;

const Location = () => {
  const [countryName, setCountryName] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');

  const fetchCountryName = (lat: number, lng: number) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GoogleMapsApiKey}`)
      .then(response => response.json())
      .then(data => {
        const country = data.results[0]?.address_components.find((component: any) => component.types.includes('country'));
        if (country) {
          setCountryName(country.long_name);
        }
      })
      .catch(error => console.error('Error fetching country:', error));
  };

  const handleButtonClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setDateTime(new Date().toLocaleString());
      fetchCountryName(latitude, longitude);
    });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Get Location</button>
      <p>Country: {countryName}</p>
      <p>Date and Time: {dateTime}</p>
    </div>
  );
};

export default Location;
