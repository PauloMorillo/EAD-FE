class Client {
  getEvaluation = async (url, id, initPoint, testType) => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch(
        `${url}?patient=${id}&age_range=${initPoint}&componente=${testType}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error en ", error);
    }
  };
}

export { Client };
