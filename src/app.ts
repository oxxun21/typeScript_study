import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyBvre-UZo1m_pP9Ic3U_hRhEoylYyXEuV4";

declare var google: any;

type GoogleGeocoding = {
  results: {geometry: {lacation: {lat: number, lng: number}}}[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocoding>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
      .then(response => {
        if(response.data.status !== 'OK') {
          throw new Error ('Could not fetch location');
        }
        const coordinates = response.data.results[0].geometry.lacation;
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: coordinates,
          zoom: 16,
        });

        new google.maps.Marker({position: coordinates, map: map});
      })
      .catch(err => {
        alert(err.message);
        console.log(err)
      });
}

form.addEventListener('submit', searchAddressHandler);