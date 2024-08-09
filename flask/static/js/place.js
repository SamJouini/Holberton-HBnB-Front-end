document.addEventListener('DOMContentLoaded', () => {
    const token = getCookie('token');
    getPlaceInfos(token)
        .then(populatePlace);
    
    let addReviewSection = document.getElementById("add-review");
    if (token) {
        addReviewSection.style.display = "block";
    }
    else {
        addReviewSection.style.display = "none";
    }
});

async function getPlaceInfos(token) {
    let place_id = getPlaceIdFromURL();
    if (place_id) {
        let headers = {
            'Content-Type': 'application/json'
        };
    
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`/places/${place_id}`, {
            headers: headers,
        });
        if (response.ok) {
            let data = await response.json();
            return data
        
        } else {
            const message = await response.text();
            throw new Error(message);
        }
    }
}

function getPlaceIdFromURL() {
    // Extract the place ID from window.location.search
    let params = new URLSearchParams(document.location.search);
    return params.get("id");
}

function populatePlace(place) {
    let details = document.getElementById("place-details");
    
    let img = document.createElement("img");
    img.src = `static/img/${place.id}_large.jpg`;
    img.alt = "";
    img.className = "place-image-large";
    details.appendChild(img);

    let div = document.createElement("div");
    details.appendChild(div);
    let title = document.createElement("h1");
    title.appendChild(document.createTextNode(place.id));
    div.appendChild(title);
    
    let host = document.createElement("p");
    host.appendChild(document.createTextNode(`Host: ${place["host_name"]}`));
    div.appendChild(host);

    let price = document.createElement("p");
    price.appendChild(document.createTextNode(`Price: ${place["price_per_night"]} per night`));
    div.appendChild(price);

    let location = document.createElement("p");
    location.appendChild(document.createTextNode(`Location: ${place["city_name"]}, ${place["country_name"]}`));
    div.appendChild(location);

    let description = document.createElement("p");
    description.appendChild(document.createTextNode(place.description));
    div.appendChild(description);

    let amenities_title = document.createElement("h2");
    amenities_title.appendChild(document.createTextNode("Amenities"));
    div.appendChild(amenities_title);

    let amenities = document.createElement("ul");
    for (let amenity of place.amenities) {
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(amenity));
        amenities.appendChild(item);
    }
    div.appendChild(amenities);
}
