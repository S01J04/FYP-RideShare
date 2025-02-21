const mockRides = [
  // Carpool Rides
  {
    id: 1,
    driver: {
      name: "Alice Smith",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 4.9,
      trips: 120,
    },
    from: "San Francisco",
    to: "Los Angeles",
    date: "2024-03-15",
    time: "08:00 AM",
    price: 45,
    seats: 3,
    type: "carpool",
    distance: "380 miles",
    duration: "6 hours",
    preferences: {
      smoking: false,
      pets: false,
      music: true,
    },
    car: {
      model: "Toyota Prius",
      color: "White",
      plate: "SF-12345",
    },
  },
  {
    id: 2,
    driver: {
      name: "Bob Johnson",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4.7,
      trips: 98,
    },
    from: "Chicago",
    to: "Milwaukee",
    date: "2024-03-16",
    time: "01:30 PM",
    price: 25,
    seats: 4,
    type: "carpool",
    distance: "92 miles",
    duration: "1.5 hours",
    preferences: {
      smoking: false,
      pets: true,
      music: false,
    },
    car: {
      model: "Ford Fusion",
      color: "Black",
      plate: "CHI-6789",
    },
  },

  // Cargo Rides
  {
    id: 3,
    driver: {
      name: "Charlie Davis",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 4.8,
      trips: 75,
    },
    from: "Austin",
    to: "Dallas",
    date: "2024-03-18",
    time: "05:00 PM",
    price: 90,
    seats: 0,
    type: "cargo",
    distance: "195 miles",
    duration: "3 hours",
    preferences: {
      smoking: false,
      pets: false,
      music: true,
    },
    vehicle: {
      model: "Ford Transit",
      capacity: "1500 lbs",
      plate: "AUS-CARGO1",
    },
  },
  {
    id: 4,
    driver: {
      name: "Diana Wilson",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 4.6,
      trips: 145,
    },
    from: "Seattle",
    to: "Portland",
    date: "2024-03-20",
    time: "10:00 AM",
    price: 70,
    seats: 0,
    type: "cargo",
    distance: "174 miles",
    duration: "2.5 hours",
    preferences: {
      smoking: true,
      pets: false,
      music: false,
    },
    vehicle: {
      model: "Chevrolet Silverado",
      capacity: "2000 lbs",
      plate: "SEA-CARGO2",
    },
  },

  // Bikes Rides
  {
    id: 5,
    driver: {
      name: "Edward Brown",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: 5.0,
      trips: 200,
    },
    from: "New York",
    to: "Philadelphia",
    date: "2024-03-22",
    time: "07:00 AM",
    price: 20,
    seats: 1,
    type: "bikes",
    distance: "95 miles",
    duration: "1.5 hours",
    preferences: {
      smoking: false,
      pets: false,
      music: true,
    },
    bike: {
      model: "Yamaha R3",
      plate: "NY-BIKE123",
    },
  },
  {
    id: 6,
    driver: {
      name: "Michael Green",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 4.9,
      trips: 90,
    },
    from: "Denver",
    to: "Boulder",
    date: "2024-03-25",
    time: "10:00 AM",
    price: 15,
    seats: 1,
    type: "bikes",
    distance: "30 miles",
    duration: "40 minutes",
    preferences: {
      smoking: false,
      pets: false,
      music: false,
    },
    bike: {
      model: "Honda CB500F",
      plate: "DEN-BIKE456",
    },
  },
];

export default mockRides;
