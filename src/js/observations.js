//original data:
//
// {
//   id: 67868131,
//   uri: "https://www.inaturalist.org/observations/67868131",
//   geojson: {
//     coordinates: [ -79.3565522733, 43.798774894 ],
//     type: "Point"
//   },
//   created_at: "2021-01-10T09:51:48-10:00",
//   taxon: {
//     threatened: false,
//     introduced: false,
//     native: true,
//     name: "Ondatra zibethicus",
//     wikipedia_url: "http://en.wikipedia.org/wiki/Muskrat",
//     default_photo: {
//       square_url:
//         "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//       attribution: "(c) Stephen Garvey, all rights reserved",
//       flags: [],
//       medium_url:
//         "https://static.inaturalist.org/photos/109319291/medium.jpg?1609877680",
//       id: 109319291,
//       license_code: null,
//       original_dimensions: { width: 2048, height: 1365 },
//       url:
//         "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//     },
//     iconic_taxon_name: "Mammalia",
//     preferred_common_name: "Muskrat"
//   }
// },
//
//transformed data:
// {
//   id: 67868131,
//   uri: "https://www.inaturalist.org/observations/67868131",
//   coords: [ -79.3565522733, 43.798774894 ],
//   date: Date Sun Jan 10 2021 14:51:48 GMT-0500 (Eastern Standard Time),
//   name: "Muskrat",
//   photoUrl: "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//   wikipediaUrl: "http://en.wikipedia.org/wiki/Muskrat",
//   isNative: true,
//   isIntroduced: false,
//   isEndangered: false,
//   isThreatened: false
// }

// Convert the first letter of each word in the string to a capital letter. 
function titleCase(s) {
  return s
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// Transform the iNaturalist objects into the desired format:
//​
// [
//   {
//     id: 67868131,
//     uri: "https://www.inaturalist.org/observations/67868131",
//     coords: [ -79.3565522733, 43.798774894 ],
//     date: Date Sun Jan 10 2021 14:51:48 GMT-0500 (Eastern Standard Time),
//     name: "Muskrat",
//     photoUrl: "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//     wikipediaUrl: "http://en.wikipedia.org/wiki/Muskrat",
//     isNative: true,
//     isIntroduced: false,
//     isEndangered: false,
//     isThreatened: false
//   },
//   ...
// ]
//

// - coords: extract the array of [lng, lat] values from the geojson property
// - date: convert the created_at string property to a real JavaScript Date
// - name: use either the taxon's preferred_common_name or name property, converted to Title Case
// - photoUrl: use the taxon's default_photo square_url value
// - wikipediaUrl: use the taxon's wikipedia_url value
// - isNative: convert the taxon native value to a boolean
// - isIntroduced: convert the taxon introduced value to a boolean
// - isEndangered: convert the taxon endangered value to a boolean
// - isThreatened: convert the taxon threatened value to a boolean
function transformObservations(observations) {
  return observations.map((observation) => ({
    id: observation.id,
    uri: observation.uri,
    coords: observation.geojson.coordinates,
    date: new Date(observation.created_at),
    name: titleCase(
      observation.taxon.preferred_common_name || observation.taxon.name
    ),
    photoUrl: observation.taxon.default_photo.square_url,
    isNative: !!observation.taxon.native,
    isThreatened: !!observation.taxon.threatened,
    isEndangered: !!observation.taxon.endangered,
    isIntroduced: !!observation.taxon.introduced,
    wikipediaUrl: observation.taxon.wikipedia_url,
  }));
}

// Filter out any observations that haven't
// been identified yet (i.e., are missing the `taxon` property) and/or don't have
// a photo (i.e., are missing the `taxon.default_photo` property).
function filterObservations(observations) {
  return observations.filter(
    (observation) => observation.taxon && observation.taxon.default_photo
  );
}

// Process all observation data 
function getAllObservations() {
  const filtered = filterObservations(data.results);
  const transformed = transformObservations(filtered);
  return transformed;
}

// Filter out any that aren't native species
// and return the filtered array.
function filterOnlyNative(observations) {
  return observations.filter((observation) => observation.isNative);
}

// Filter out any that aren't introduced species
// and return the filtered array.
function filterOnlyIntroduced(observations) {
  return observations.filter((observation) => observation.isIntroduced);
}
