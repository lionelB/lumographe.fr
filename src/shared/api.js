
export default (page="index") => fetch(`/json/${page}.json`)
  .then((reponse) => reponse.json());
