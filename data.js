async function loadData(query, latLng, radius) {

    const response = await axios.get("https://api.foursquare.com/v3/places/search", {
        params: {
            query: query,
            ll: latLng,
            v: '20210903',
            radius: radius,
            limit: 50
        },
        headers:{
            Accept: 'application/json',
            Authorization:'fsq3wsVh3XbICcgWtobQCeG2CT41ct8V9NIVPvTLADIg70A='
        }
    });
    return response.data;
}