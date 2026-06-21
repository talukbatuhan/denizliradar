export type WeatherData = {
  temperature: number;
  weatherCode: number;
  description: string;
  updatedAt: string;
};

const DENIZLI_COORDS = { latitude: 37.7765, longitude: 29.0864 };

export function getWeatherDescription(code: number): string {
  if (code === 0) return "Açık";
  if (code <= 3) return "Parçalı Bulutlu";
  if (code === 45 || code === 48) return "Sisli";
  if (code >= 51 && code <= 67) return "Yağmurlu";
  if (code >= 71 && code <= 77) return "Karlı";
  if (code >= 80 && code <= 82) return "Sağanak";
  if (code >= 95) return "Gök Gürültülü";
  return "Bulutlu";
}

export async function getDenizliWeather(): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(DENIZLI_COORDS.latitude),
    longitude: String(DENIZLI_COORDS.longitude),
    current: "temperature_2m,weather_code",
    timezone: "Europe/Istanbul",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
    { next: { revalidate: 300 } },
  );

  if (!response.ok) {
    throw new Error("Hava durumu alınamadı");
  }

  const data = await response.json();
  const current = data.current;

  return {
    temperature: Math.round(current.temperature_2m),
    weatherCode: current.weather_code,
    description: getWeatherDescription(current.weather_code),
    updatedAt: current.time,
  };
}
