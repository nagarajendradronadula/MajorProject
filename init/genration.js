const mongoose = require("mongoose");
const path = require("path");
const Listing = require("../models/listing"); // Adjust path as needed

// Connect to MongoDB
const mongoUrl = "mongodb://127.0.0.1:27017/wonderlust";

main().then((res) => {
    console.log("Connected to DataBase");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongoUrl);
}
  const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 1500,
        location: "Malibu",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-118.7798, 34.0259] // Coordinates for Malibu, CA
        }
    },
    {
        title: "Modern Loft in Downtown",
        description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 1200,
        location: "New York City",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-74.0060, 40.7128] // Coordinates for New York City, NY
        }
    },
    {
        title: "Mountain Retreat",
        description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 1000,
        location: "Aspen",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-106.8175, 39.1911] // Coordinates for Aspen, CO
        }
    },
    {
        title: "Historic Villa in Tuscany",
        description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 2500,
        location: "Florence",
        country: "Italy",
        geometry: {
            type: "Point",
            coordinates: [11.2558, 43.7696] // Coordinates for Florence, Italy
        }
    },
    {
        title: "Secluded Treehouse Getaway",
        description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 800,
        location: "Portland",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-122.6765, 45.5231] // Coordinates for Portland, OR
        }
    },
    {
        title: "Beachfront Paradise",
        description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 2000,
        location: "Cancun",
        country: "Mexico",
        geometry: {
            type: "Point",
            coordinates: [-86.8515, 21.1619] // Coordinates for Cancun, Mexico
        }
    },
    {
        title: "Rustic Cabin by the Lake",
        description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 900,
        location: "Lake Tahoe",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-120.0433, 39.0968] // Coordinates for Lake Tahoe, NV/CA
        }
    },
    {
        title: "Luxury Penthouse with City Views",
        description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 3500,
        location: "Los Angeles",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-118.2437, 34.0522] // Coordinates for Los Angeles, CA
        }
    },
    {
        title: "Ski-In/Ski-Out Chalet",
        description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 3000,
        location: "Verbier",
        country: "Switzerland",
        geometry: {
            type: "Point",
            coordinates: [7.2245, 46.0956] // Coordinates for Verbier, Switzerland
        }
    },
    {
        title: "Safari Lodge in the Serengeti",
        description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 4000,
        location: "Serengeti National Park",
        country: "Tanzania",
        geometry: {
            type: "Point",
            coordinates: [34.8333, -2.3333] // Coordinates for Serengeti National Park, Tanzania
        }
    },
    {
        title: "Historic Apartment in Paris",
        description: "Live like a Parisian in this charming apartment in the heart of Paris. Steps away from the Eiffel Tower.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1592169195085-89da11ea13bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZyZW5jaCUyMHN0eWxlJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 2200,
        location: "Paris",
        country: "France",
        geometry: {
            type: "Point",
            coordinates: [2.3522, 48.8566] // Coordinates for Paris, France
        }
    },
    {
        title: "Desert Oasis Villa",
        description: "Relax and unwind in this luxurious villa surrounded by the serene beauty of the desert.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1519821172141-b19a6b1a774d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHJlc29ydCUyMGNhYmluJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 1800,
        location: "Dubai",
        country: "United Arab Emirates",
        geometry: {
            type: "Point",
            coordinates: [55.2708, 25.2048] // Coordinates for Dubai, UAE
        }
    }
];

        const initDB = async () => {
            await Listing.deleteMany({});
            initData.data = initData.data.map((obj) => ({...obj, owner: "66b46ab749407de43044e560"}));
            await Listing.insertMany(sampleData);
            console.log("Data inserted");
        }
        
        initDB();
