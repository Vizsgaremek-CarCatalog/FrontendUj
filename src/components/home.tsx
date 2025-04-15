import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Footer from "./footer";
import RoutingService from "../services/RoutingService";
import { BASE_URL } from "../config";

export default function Home() {
  const [extendedImages, setExtendedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const preloadImages = (imageUrls: string[]) => {
    return Promise.all(
      imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = () => {
            console.warn(`Failed to preload image: ${url}`);
            resolve();
          };
        });
      })
    );
  };

  useEffect(() => {
    fetch(BASE_URL + "/carcatalog")
      .then((response) => response.json())
      .then((data) => {
        const imageUrls = data
          .map((car: { imageUrl: string }) =>
            car.imageUrl
              ? car.imageUrl.startsWith("http")
                ? car.imageUrl
                : `${BASE_URL}${car.imageUrl}`
              : "/placeholder.jpg"
          )
          .filter((url) => url !== "/placeholder.png");
        const duplicatedUrls = [...imageUrls, ...imageUrls];
        preloadImages(duplicatedUrls)
          .then(() => {
            setExtendedImages(duplicatedUrls.length > 0 ? duplicatedUrls : ["/placeholder.png"]);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error preloading images:", error);
            setExtendedImages(["/placeholder.png"]);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching car images:", error);
        setExtendedImages(["/placeholder.jpg"]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-gray-900 dark:bg-gray-950 text-white dark:text-gray-200 p-0 m-0">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-900 dark:bg-gray-950 p-0 m-0">
      <div className="flex-grow w-full">
        <div className="py-4 bg-gray-100 dark:bg-gray-800 overflow-hidden w-full">
          <div className="film-strip w-full">
            {extendedImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 h-20 mx-2 bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-600 shadow-lg"
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover object-scale-down"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + "/placeholder.jpg") {
                      console.warn(`Failed to load slideshow image: ${target.src}`);
                      target.src = "/placeholder.jpg";
                    }
                  }}
                />
              </div>
            ))}
            <div className="film-strip-duplicate w-full">
              {extendedImages.map((image, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 w-28 h-20 mx-2 bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-600 shadow-lg"
                >
                  <img
                    src={image}
                    alt={`Slide duplicate ${index}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== window.location.origin + "/placeholder.jpg") {
                        console.warn(`Failed to load slideshow image: ${target.src}`);
                        target.src = "/placeholder.jpg";
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center text-white dark:text-gray-200 py-16 w-full">
          <header className="mb-8">
            <h1 className="text-4xl font-bold">Welcome to our Car Catalog</h1>
            <p className="text-lg mt-2">Discover the best cars available worldwide!</p>
          </header>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => RoutingService.navigateToCars(navigate)}
              className="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-200 rounded-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition"
            >
              View Cars
            </button>
          </div>
        </div>

        <div className="py-16 bg-gray-100 dark:bg-gray-800 text-center w-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Why Choose Us?</h2>
          <div className="flex justify-center space-x-8 w-full px-6">
            <div className="w-1/3 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Wide Selection</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose from a wide variety of cars to suit your needs and preferences.</p>
            </div>
            <div className="w-1/3 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Affordable Prices</h3>
              <p className="text-gray-600 dark:text-gray-300">We offer competitive pricing to ensure you get the best deal.</p>
            </div>
            <div className="w-1/3 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Trusted by Thousands</h3>
              <p className="text-gray-600 dark:text-gray-300">Join our community of satisfied customers worldwide.</p>
            </div>
          </div>
        </div>

        <div className="py-16 bg-gray-900 dark:bg-gray-950 text-center text-white dark:text-gray-200 w-full">
          <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
          <div className="flex justify-center space-x-8 w-full px-6">
            <div className="w-1/3 bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <p className="text-gray-300 dark:text-gray-400">"I found my dream car here! The process was so easy and seamless."</p>
              <p className="mt-4 font-semibold text-gray-200 dark:text-gray-300">- John Doe</p>
            </div>
            <div className="w-1/3 bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <p className="text-gray-300 dark:text-gray-400">"Great selection and amazing prices. Highly recommend this site!"</p>
              <p className="mt-4 font-semibold text-gray-200 dark:text-gray-300">- Jane Smith</p>
            </div>
            <div className="w-1/3 bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <p className="text-gray-300 dark:text-gray-400">"The customer service was excellent. I’ll definitely come back."</p>
              <p className="mt-4 font-semibold text-gray-200 dark:text-gray-300">- Alex Johnson</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}