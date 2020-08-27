export const data = [
  {
    name: "Jake",
    email: "jake@gmail.com",
    phone: "9710644621",
    company: "infosys",
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    name: "Amy",
    email: "amy96@gmail.com",
    phone: "9710644621",
    company: "tcs",
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    name: "Peralta",
    email: "peralta@gmail.com",
    phone: "9710644621",
    company: "zen mode",
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    name: "Santiago",
    email: "santiago96@gmail.com",
    phone: "9710644621",
    company: "brooklyn99",
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    name: "Hitchcok",
    email: "hitchkok96@gmail.com",
    phone: "9710644621",
    company: "brooklyn93",
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
];

export const idGenerator = (parent) => {
  var randomNumber = Math.floor(Math.random() * 500);
  if (randomNumber in parent) {
    idGenerator(parent);
  } else {
    return randomNumber;
  }
};

export const dataFormatter = (data) => {
  let arrayData = data.map((data) => {
    return { [data.id]: data };
  });
  return Object.assign({}, ...arrayData);
};

export const mailValidator = (value) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true;
  }
  return false;
};

export const addressBuilder = (addr1, addr2, city, country) => {
  if (
    addr1.trim().length === 0 &&
    addr2.trim().length === 0 &&
    city.trim().length === 0 &&
    country.trim().length === 0
  ) {
    return "-";
  } else {
    let tempAddr1 = addr1.trim().length ? `${addr1}, ` : "";
    let tempAddr2 = addr2.trim().length ? `${addr2}, ` : "";
    let tempCity = city.trim().length ? `${city}, ` : "";
    let tempCountry = country.trim() ? `${country} ` : "";
    return tempAddr1 + tempAddr2 + tempCity + tempCountry +".";
  }
};
