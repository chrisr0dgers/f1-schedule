import axios from "axios";

export async function getSeasonInfo() {
    try {
      const response = await axios.get(
        "https://api.jolpi.ca/ergast/f1/current"
      );
      return response.data.MRData.RaceTable.Races;
    } catch (error) {
      return error;
    }
}

export async function getLastRound() {
    try {
      const response = await axios.get(
        "https://api.jolpi.ca/ergast/f1/current/last/results/"
      );
      return +response.data.MRData.RaceTable.round + 1;
    } catch (error) {
      return error;
    }
}


  // useEffect(() => {
  //   getSeasonInfo().then((response) => {
  //     if (response.name !== "AxiosError") {
  //       setEvents(response);
  //     }
  //   });

  //   getLastRound()
  //     .then((response) => {
  //       if (response.name !== "AxiosError") {
  //         setLastRound(response);
  //       }
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);