import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
//import "./styles.css";

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAkEmMjAYfctkEl7IdR-gofDFryxENzd8U" // Add your API key
  });

  return isLoaded ? <Map /> : null;
}
