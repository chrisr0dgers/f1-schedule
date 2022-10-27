import axios from "axios";

export async function getSeasonInfo() {
    try {
      const response = await axios.get(
        "https://ergast.com/api/f1/current.json"
      );
      return response.data.MRData.RaceTable.Races;
    } catch (error) {
      return error;
    }
}

export async function getLastRound() {
    try {
      const response = await axios.get(
        "https://ergast.com/api/f1/current/last/results.json"
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