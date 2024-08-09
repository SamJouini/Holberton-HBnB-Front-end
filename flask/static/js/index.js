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

    document.getElementById('country-filter').addEventListener('change', (event) => {
        // Get the selected country value
        let country = event.target.value;
        // Iterate over the places and show/hide them based on the selected country
        let list = document.getElementById("places-list");

        if (country) {
            for (let card of list.children) {
                if (card.dataset.country == country)
                {
                    card.style.display = "block";
                }
                else
                {
                    card.style.display = "none";
                }
            }
        } else {
            for (let card of list.children) {
                card.style.display = "block";
            }
        }
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

    // <div class="place-card" data-country="Country">
    //     <img src="place1.jpg" alt="Place 1" class="place-image">
    //     <h2>Place Name</h2>
    //     <p>$100 per night</p>
    //     <p>Location: City, Country</p>
    //     <button class="details-button">View Details</button>
    // </div>
    let card = document.createElement("div");
    card.className = "place-card";
    card.dataset.country = place["country_code"];

    let img = document.createElement("img");
    img.src = `${place.id}.jpg`;
    img.alt = "";
    img.className = "place-image";
    card.appendChild(img);

    let title = document.createElement("h2");
    let link = document.createElement("a");
    link.href = `/place.html?id=${place.id}`;
    link.appendChild(document.createTextNode(place.description));
    title.appendChild(link);
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