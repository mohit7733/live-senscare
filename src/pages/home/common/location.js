import React, { useState } from "react";
import { useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useTranslation } from "react-i18next";

function Location(props) {
  const { t } = useTranslation("location");
  const [address2, setaddress2] = useState(
    props.typedefault && props.typedefault != "" ? props.typedefault : ""
  );
  const [latlong, setlatlong] = useState({});

  const handleChange = (address) => {
    setaddress2(address);
    console.log(address);
    address == ""
      ? props.let("res", "getLatLng", address)
      : setaddress2(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => results[0])
      .then((res) => {
        setaddress2(address);
        console.log(res);
        props.let(res, getLatLng(res), address);
        for (var i = 0; i < res.address_components.length; i++) {
          for (var j = 0; j < res.address_components[i].types.length; j++) {
            if (
              res.address_components[i].types[j] == "postal_code" ||
              res.address_components[i].types[j] == "street_number"
            ) {
              props.type
                ? setaddress2(res.address_components[i].long_name)
                : setaddress2(address);
              props.type
                ? props.let(
                    res,
                    getLatLng(res),
                    res.address_components[i].long_name
                  )
                : props.let(res, getLatLng(res), address);
            }
          }
        }
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    console.log(props.typedefault);
  }, [latlong]);

  return (
    <PlacesAutocomplete
      value={address2}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder:
                props.type && props.type == "my-fil-zip"
                  ? t("Zip code")
                  : t("Type here..."),
              className: "location-search-input",
              id: props.type ? props.type : "",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              console.log(suggestions);
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default Location;
