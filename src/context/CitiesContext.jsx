import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext({
  cities: [],
  isLoading: false,
  currentCity: null,
  getCity: (id) => {},
  createCity: (city) => {},
  deleteCity: (id) => {},
});

const BASE_URL = "//localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown error detected");
  }
}

export const CitiesContextProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({
        type: "loading",
      });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const cities = await res.json();
        dispatch({
          type: "cities/loaded",
          payload: cities,
        });
      } catch (error) {
        dispatch({
          type: "error",
          payload: "There was an error fetching cities",
        });
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const city = await res.json();
      dispatch({
        type: "city/loaded",
        payload: city,
      });
    } catch (error) {
      dispatch({
        type: "error",
        payload: "Error in getting city",
      });
    }
  }

  async function createCity(city) {
    dispatch({
      type: "loading",
    });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cities = await res.json();
      dispatch({
        type: "city/created",
        payload: cities,
      });
    } catch (error) {
      console.error("Error fetching city");
    }
  }

  async function deleteCity(id) {
    dispatch({
      type: "loading",
    });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const newCities = cities.filter((city) => id !== city.id);
      dispatch({
        type: "city/deleted",
        payload: newCities,
      });
    } catch (err) {
      console.error("Error deleting citty");
    }
  }

  const ctxVal = {
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={ctxVal}>{children}</CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext is used outside of Context Provider");
  return context;
};

export default useCities;
