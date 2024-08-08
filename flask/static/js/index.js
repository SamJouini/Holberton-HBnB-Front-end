document.addEventListener('DOMContentLoaded', () => {
    let places = getPlaces()
    .then((places) => {
        let list = document.getElementById("places-list");
        list.innerHTML = "";
        places.forEach(place => {
            let card = createPlaceCardFromJSON(place);
            list.appendChild(card);
        });
    });
});

async function getPlaces() {
    let headers = {
        'Content-Type': 'application/json'
    };
    const token = getCookie('token');
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch('/places', {
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

function createPlaceCardFromJSON(place) {
    // {
    //     "city_id": "city-1",
    //     "city_name": "New York",
    //     "country_code": "US",
    //     "country_name": "United States",
    //     "description": "A lovely place to stay.",
    //     "host_id": "user-1",
    //     "host_name": "John Doe",
    //     "id": "place-1",
    //     "price_per_night": 100
    // }

    // <div class="place-card">
    //     <img src="place1.jpg" alt="Place 1" class="place-image">
    //     <h2>Place Name</h2>
    //     <p>$100 per night</p>
    //     <p>Location: City, Country</p>
    //     <button class="details-button">View Details</button>
    // </div>
    let card = document.createElement("div");
    card.className = "place-card";

    let img = document.createElement("img");
    img.src = `${place.id}.jpg`;
    img.alt = "";
    img.className = "place-image";
    card.appendChild(img);

    let title = document.createElement("h2");
    title.appendChild(document.createTextNode(place.description));
    card.appendChild(title);

    let price = document.createElement("p");
    price.appendChild(document.createTextNode(`${place["price_per_night"]} per night`));
    card.appendChild(price);

    let location = document.createElement("p");
    location.appendChild(document.createTextNode(`Location: ${place["city_name"]}, ${place["country_name"]}`));
    card.appendChild(location);

    let details = document.createElement("button");
    details.className = "details-button";
    details.appendChild(document.createTextNode("View details"));
    card.appendChild(details);

    return card;
}