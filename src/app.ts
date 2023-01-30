import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyBvre-UZo1m_pP9Ic3U_hRhEoylYyXEuV4";

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios.get();
}

form.addEventListener('submit', searchAddressHandler);